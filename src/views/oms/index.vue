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

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>
    <!-- <div class="filter-container">
      <el-button class="filter-item" type="success" @click="handleChange(0)">
        一键审核
      </el-button>
    </div> -->
    <el-table
      v-loading="listLoading"
      :data="pageList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" align="center" />

      <el-table-column label="用户id" prop="userName" align="center" />
      <el-table-column label="用户" prop="userName" align="center" />
      <el-table-column label="总流水" prop="totalFlow" align="center" />
      <el-table-column label="发包数" prop="sendCount" align="center" />
      <el-table-column label="抢包数" prop="getCount" align="center" />
      <el-table-column label="中雷数" prop="bombCount" align="center" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="page"
      :limit.sync="size"
      @pagination="handlePage"
    />
  </div>
</template>

<script>
import { getOutList, changeOutApply } from "@/api/user.js";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const listQueryDefult = {
  userTelegramId: "",
};

export default {
  components: { Pagination },
  name: "",
  data() {
    return {
      list: null,
      pageList: null,
      page: 1,
      size: 10,
      total: 0,
      listLoading: true,
      listQuery: Object.assign({}, listQueryDefult),
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getOutList(this.listQuery).then((res) => {
        console.log(res);
        this.listLoading = false;
        this.list = res.data;
        this.total = res.data.length;
        this.handlePage();
      });
    },
    handleFilter() {
      this.page = 1;
      this.getList();
    },
    handlePage() {
      this.pageList = this.list.filter(
        (item, index) =>
          index < this.page * this.size && index >= this.size * (this.page - 1)
      );
    },

    handleChange(type, id) {
      let obj = {};
      if (type == 1) obj["id"] = id.toString();
      this.$alert("确定要进行该操作吗？", "提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          if (action == "confirm") {
            console.log(obj);
            changeOutApply(obj).then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getList();
            });
          }
        },
      });
    },
  },
};
</script>
