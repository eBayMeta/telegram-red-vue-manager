<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.userTelegramId"
        placeholder="用户id"
        style="width: 180px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

     <el-select
       v-model="listQuery.groupTelegramId"
       class="filter-item"
       style="width: 180px; margin-right: 10px"
       placeholder="群组ID"
       clearable
       @change="handleFilter"
     >
       <el-option
         v-for="item in optionList"
         :key="item.groupTelegramId"
         :label="item.groupName"
         :value="item.groupTelegramId"
       >
       </el-option>
     </el-select>

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>

      <el-button
        class="filter-item"
        type="primary"
        @click="handleAddShow()"
      >
        添加
      </el-button>


    </div>

    <el-table
      v-loading="listLoading"
      :data="pageList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" align="center" width="80" />
      <el-table-column label="用户ID"  prop="userTelegramId" align="center" width="200" />
      <el-table-column label="用户名称" prop="userTelegramName" align="center" />

      <el-table-column
        label="操作"
        align="center"
        width="240"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="primary"
            @click="autoUserDel(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :page-size="listQuery.pramsSize"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    />



<el-dialog title="添加自动抢包用户" :visible.sync="dialogAddVisible">
      <div>
        <el-form
          ref="rulesForm"
          :model="inforUpdateParams"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item
            :label=" '用户ID'  "
            prop="userTelegramId"
          >
            <el-input
              v-model="inforUpdateParams.userTelegramId"
              style="width: 200px"
              placeholder=""
            />
          </el-form-item>

<el-form-item
            :label=" '群组ID'  "
            prop="userTelegramId"
          >
          <el-select
            v-model="inforUpdateParams.groupTelegramId"
            class="filter-item"
            style="width: 180px; margin-right: 10px"
            placeholder="选择群组"
            clearable
            @change="handleFilter"
          >
            <el-option
              v-for="item in optionList"
              :key="item.groupTelegramId"
              :label="item.groupName"
              :value="item.groupTelegramId"
            >
            </el-option>
          </el-select>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateUserInforFun('rulesForm')">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  autoGetUserList,
  getGroup,
  autoGetUserAdd,
  autoGetUserDel,

} from "@/api/user.js";
import clip from "@/utils/clipboard";
const listQueryDefult = {
  userTelegramId: undefined,
  groupTelegramId: undefined,
  pramsPage: 0,
  pramsSize: 10,
};
const rulesFormDefult = {
  userTelegramId: "", //用户id
  groupTelegramId: "",
};

export default {
  name: "",
  components: { Pagination },
  filters: {},
  data() {
    return {
      list: null,
      pageList: null,
      total: 0,
      listLoading: true,
      listQuery: Object.assign({}, listQueryDefult),
      dialogKeyVisible: false,
      dialogAddVisible:false,
      dialogVisible: false,
      rulesForm: Object.assign({}, rulesFormDefult),
      rules: {
        adminName: [{ required: true, message: "请输入", trigger: "blur" }],
        adminPass: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      storeKey: "",
        totalFlow:"",
        optionList: [],
        inforUpdateParams: {
          groupTelegramId: "",
          userTelegramId: "",
        },

        delParams: {
          id: "",
        },

    };
  },

  created() {
    this.getList();
    this.getGroupList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      autoGetUserList(this.listQuery).then((res) => {
        this.listLoading = false;
        this.total = res.data.totalElements;
        this.pageList = res.data.content;
        this.totalFlow = res.data.totalFlow;
      });
    },

    getGroupList() {
      getGroup({}).then((res) => {
        this.optionList = res.data;
      });
    },
    handlePageChange(pageNumber) {
      this.listQuery.pramsPage = pageNumber - 1;
      this.$nextTick(() => {
        //调用请求数据
        this.getList();
      });
    },


    handleFilter() {
      this.listQuery.pramsPage = 0;
      this.getList();
    },

    handleAddShow() {
      this.dialogAddVisible = true;
    },

    //添加自动抢包用户
    updateUserInforFun(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          autoGetUserAdd(this.inforUpdateParams).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.storeKey = res.data;
            this.dialogAddVisible = false;
            this.dialogVisible = true;
            this.getList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除配置
    autoUserDel(row) {
      this.delParams.id = row.id;
      console.log(this.delParams.id);
      autoGetUserDel(this.delParams).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getList();
        this.addGroupVisible = false;
      });
    },
    handleCopy(text, event) {
      clip(text, event);
    },
  },
};
</script>
