<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.toAddress"
        placeholder="到账地址"
        style="width: 180px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.hash"
        placeholder="交易哈希"
        style="width: 180px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.userTelegramId"
        placeholder="用户id"
        style="width: 180px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.groupTelegramId"
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
        type="success"
        icon="el-icon-plus"
        @click="addRecharge"
      >
        添加
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" align="center" />
      <el-table-column label="用户ID" prop="userTelegramId" align="center" />
      <el-table-column label="支付地址" prop="fromAddress" align="center" />
      <el-table-column label="收款地址" prop="toAddress" align="center" />
      <el-table-column label="交易凭证" prop="txHash" align="center" />
      <el-table-column label="交易数量" prop="amount" align="center" />
      <el-table-column label="获得筹码" prop="chipBalance" align="center" />
      <el-table-column
        label="交易时间"
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
    <el-dialog title="添加充值" :visible.sync="dialogVisible">
      <div>
        <el-form
          ref="rulesForm"
          :rules="rules"
          :model="rulesForm"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="用户id" prop="userTelegramId">
            <el-input
              v-model="rulesForm.userTelegramId"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="交易哈希" prop="txHash">
            <el-input
              v-model="rulesForm.txHash"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="发送地址" prop="fromAddress">
            <el-input
              v-model="rulesForm.fromAddress"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="接收地址" prop="toAddress">
            <el-input
              v-model="rulesForm.toAddress"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="数量" prop="amount">
            <el-input
              v-model="rulesForm.amount"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>

          <el-form-item label="兑换筹码" prop="chipBalance">
            <el-input
              v-model="rulesForm.chipBalance"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addFun('rulesForm')">
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
import { getAiOrderList, getGroup, addRecharge } from "@/api/user.js";

const listQueryDefult = {
  pramsPage: 0,
  pramsSize: 10,
  userTelegramId: "",
  groupTelegramId: "",
  hash: "",
  toAddress: "",
};
const rulesFormDefult = {
  userTelegramId: "", //用户id
  txHash: "", //交易哈希
  fromAddress: "", //发送地址
  toAddress: "",
  confirm: "success", //状态
  amount: "", //数量
  chipBalance: "", //兑换的多少筹码
};

export default {
  name: "",
  components: { Pagination },
  data() {
    return {
      list: null,
      pageList: null,
      total: 0,
      listLoading: true,
      listQuery: Object.assign({}, listQueryDefult),
      optionList: [],
      groupTelegramId: null,
      dialogVisible: false,
      rulesForm: Object.assign({}, rulesFormDefult),
      rules: {
        userTelegramId: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        txHash: [{ required: true, message: "请输入", trigger: "blur" }],
        fromAddress: [{ required: true, message: "请输入", trigger: "blur" }],
        toAddress: [{ required: true, message: "请输入", trigger: "blur" }],
        amount: [{ required: true, message: "请输入", trigger: "blur" }],
        chipBalance: [{ required: true, message: "请输入", trigger: "blur" }],
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
      getAiOrderList(this.listQuery).then((res) => {
        console.log(res);
        this.listLoading = false;
        this.list = res.data.content;
        this.total = res.data.totalElements;
        // this.handlePage();
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
    getGroupList() {
      getGroup({}).then((res) => {
        this.optionList = res.data;
      });
    },

    handlePage() {
      this.pageList = this.list.filter(
        (item, index) =>
          index < this.listQuery.pramsPage + 1 * this.listQuery.pramsSize &&
          index >= this.listQuery.pramsSize * this.listQuery.pramsPage
      );
    },
    addRecharge() {
      this.rulesForm = Object.assign({}, rulesFormDefult);
      this.dialogVisible = true;
    },
    addFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addRecharge(this.rulesForm).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getList();
            this.dialogVisible = false;
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
