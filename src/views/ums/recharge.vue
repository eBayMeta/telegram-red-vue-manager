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
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="handleChangeInfor(row)">
            查看私钥
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
    <el-dialog title="查看私钥" :visible.sync="dialogKeyVisible">
      <div>
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="rulesForm"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="管理员账号" prop="adminName">
            <el-input
              v-model="rulesForm.adminName"
              style="width: 200px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="账号密码" prop="adminPass">
            <el-input
              v-model="rulesForm.adminPass"
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
    <el-dialog title="私钥" :visible.sync="dialogVisible">
      <div>
        <span>{{ storeKey }}</span>
        <el-button type="primary" @click="handleCopy(storeKey, $event)">
          复制
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  getUserRechargeAddressList,
  getUserRechargeAddressKeyInfo,
  getGroup,
} from "@/api/user.js";
import clip from "@/utils/clipboard";
const listQueryDefult = {
  userTelegramId: undefined,
  userName: undefined,
  coinAddress: undefined,
  pramsPage: 0,
  pramsSize: 10,
};
const rulesFormDefult = {
  coinAddress: "", //用户id
  adminName: "",
  adminPass: "",
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
      dialogVisible: false,
      rulesForm: Object.assign({}, rulesFormDefult),
      rules: {
        adminName: [{ required: true, message: "请输入", trigger: "blur" }],
        adminPass: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      storeKey: "",
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getUserRechargeAddressList(this.listQuery).then((res) => {
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
    handleChangeInfor(row) {
      this.rulesForm.coinAddress = row.coinAddress;
      this.dialogKeyVisible = true;
    },
    updateUserInforFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserRechargeAddressKeyInfo(this.rulesForm).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.storeKey = res.data;
            this.dialogKeyVisible = false;
            this.dialogVisible = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCopy(text, event) {
      clip(text, event);
    },
  },
};
</script>
