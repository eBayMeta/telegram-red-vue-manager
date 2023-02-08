<!-- vue-quill-editor -->
<template>
  <div>
    <el-upload
      v-show="false"
      id="quill-upload"
      :action="ossUploadUrl"
      :headers="headers"
      :multiple="false"
      :limit="3"
      list-type="picture-card"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-error="uploadError"
      :on-success="handleExceed"
      :on-progress="handleProgress"
    >
      <el-button size="small" type="primary"></el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-row v-loading="uillUpdateImg">
      <quillEditor
        ref="myQuillEditor"
        style="width: 800px; height: 600px"
        @change="onEditorChange($event)"
        v-model="content"
        :options="editorOption"
      />
    </el-row>
    <!-- <quill-editor
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      style="height: 600px"
      @change="onEditorChange($event)"
    ></quill-editor> -->
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import baseURL from "@/utils/baseUrl";
import { getToken } from "@/utils/auth"; // 验权

export default {
  props: {
    value: String,
  },
  data() {
    return {
      ossUploadUrl: `${baseURL}/upload/upload_file`,
      headers: "",
      fileList: [],
      uillUpdateImg: false, //根据图片上传状态来确定是否显示loading动画
      serverUrl: "", //上传的图片服务器地址
      content: "", //富文本内容
      editorOption: {
        //符文本编辑器的配置
        placeholder: "",
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              // 工具栏配置, 默认是全部
              ["bold"],
              ["italic"],
              ["underline"],
              ["strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote"],
              ["code-block"],
              ["link"],
              ["image"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  // 给个点击触发Element-ui，input框选择图片文件
                  document.querySelector("#quill-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
    };
  },
  components: {
    quillEditor,
  },
  created() {
    this.headers = { token: getToken() };
  },
  watch: {
    value(news) {
      this.initValue();
    },
  },
  mounted() {
    this.initValue();
  },
  methods: {
    initValue() {
      this.content = this.value;
    },
    onEditorChange({ quill, html, text }) {
      //富文本编辑器内容发生改变的时候
      this.content = html;
      this.$emit("input", html); //将富文本编辑器输入的文本发送给父组件，父组件涉及提交添加或者更改
    },
    beforeUpload() {
      //上传图片之前开启loading
      this.uillUpdateImg = true;
    },
    uploadError() {
      //图片上传失败,关闭loading
      this.uillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    handleProgress(event, file, fileList) {
      console.log(file, fileList, "图片上传");
    },
    handleExceed(response, file, fileList) {
      //图片添加成功`${baseURL}/upload/upload_file`
      let quill = this.$refs.myQuillEditor.quill;
      console.log(response);
      if (response.code == "1") {
        let length = quill.getSelection().index;
        // 插入图片 response.data.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", response.data.filePath);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      this.fileList = fileList;
      this.uillUpdateImg = false;
    },
  },
};
</script>
<style lang="scss" scope>
.ql-container {
  height: 90%;
}
</style>