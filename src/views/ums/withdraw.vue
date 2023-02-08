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
      <el-input
        v-model="listQuery.userName"
        placeholder="用户名称"
        style="width: 180px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.coinAddress"
        placeholder="地址"
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

    <el-table
      v-loading="listLoading"
      :data="pageList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" align="center" width="80" />
      <el-table-column
        label="用户ID"
        prop="userTelegramId"
        align="center"
        width="200"
      />
      <el-table-column label="用户名称" prop="userName" align="center" />
      <el-table-column label="地址" prop="coinAddress" align="center" />
      <el-table-column
        label="时间"
        width="150px"
        align="center"
        prop="createTime"
      />

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

    <el-dialog title="修改用户信息" :visible.sync="dialogInforVisible">
      <div>
        <el-form
          ref="ruleForm"
          :model="inforUpdateParams"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item
            :label="editType == 1 ? '增加' : '减少' + '余额'"
            prop="usdtGroupTokenBalance"
          >
            <el-input
              v-model="inforUpdateParams.chipBalance"
              type="number"
              style="width: 200px"
              placeholder=""
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateUserInforFun('ruleForm')">
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
  getUserWithdrawAddressList,
  changeUserInfor,
  getGroup,
} from "@/api/user.js";

const listQueryDefult = {
  userTelegramId: undefined,
  userName: undefined,
  coinAddress: undefined,
  pramsPage: 0,
  pramsSize: 10,
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
      dialogAssetsVisible: false,
      dialogInforVisible: false,
      inforUpdateParams: {
        chipBalance: "",
        userTelegramId: "",
      },
      editType: "",
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getUserWithdrawAddressList(this.listQuery).then((res) => {
        this.listLoading = false;
        this.total = res.data.totalElements;
        this.pageList = res.data.content;
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

    // 修改用户
    handleChangeInfor(row, type) {
      this.dialogInforVisible = true;
      this.inforUpdateParams.userTelegramId = row.userTelegramId;
      this.editType = type;
    },
    updateUserInforFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.inforUpdateParams);
          if (this.editType == 2) {
            this.inforUpdateParams.chipBalance =
              0 - Number(this.inforUpdateParams.chipBalance);
          }
          changeUserInfor(this.inforUpdateParams).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getList();
            this.dialogInforVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
