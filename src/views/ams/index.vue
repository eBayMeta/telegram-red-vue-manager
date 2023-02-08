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
        @click="addWithdrawFun"
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
      <el-table-column type="index" align="center" width="80" />
      <el-table-column label="用户ID" prop="userTelegramId" align="center" />
      <el-table-column label="用户地址" prop="toAddress" align="center" />
      <el-table-column label="发送地址" prop="fromAddress" align="center" />
      <el-table-column label="总数量" prop="totalAmount" align="center" />
      <el-table-column label="手续费" prop="fee" align="center" />
      <el-table-column label="实际到账" prop="amount" align="center" />
      <el-table-column label="交易哈希" prop="txHash" align="center" />
      <el-table-column label="状态" prop="sendStatus" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.confirm == "wait"
              ? "等待链上确认"
              : row.confirm == "success"
              ? "成功"
              : "失败"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="createTime" align="center" />
      <el-table-column
        label="操作"
        align="center"
        width="240"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            :disabled="row.sendStatus == 'no' ? false : true"
            size="mini"
            type="primary"
            @click="handleChange('yes', row.id)"
          >
            审核通过
          </el-button>
          <el-button
            :disabled="row.sendStatus == 'no' ? false : true"
            size="mini"
            type="primary"
            @click="handleChange('not', row.id)"
          >
            审核驳回
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
    <el-dialog title="添加提币" :visible.sync="dialogVisible">
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
          <el-form-item label="发送地址" prop="fromAddress">
            <el-input
              v-model="rulesForm.fromAddress"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="用户地址" prop="toAddress">
            <el-input
              v-model="rulesForm.toAddress"
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
          <el-form-item label="总数量" prop="totalAmount">
            <el-input
              type="number"
              v-model="rulesForm.totalAmount"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="平台手续费" prop="fee">
            <el-input
              type="number"
              v-model="rulesForm.fee"
              style="width: 300px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="实际到账数量" prop="amount">
            <el-input
              type="number"
              v-model="rulesForm.amount"
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
import {
  getShowList,
  shenheWithdraw,
  addWithdraw,
  getGroup,
} from "@/api/user.js";

const listQueryDefult = {
  pramsPage: 0,
  pramsSize: 10,
  userTelegramId: "",
  groupTelegramId: "",
  hash: "",
  toAddress: "",
};
const rulesFormDefult = {
  amount: "",
  fee: "",
  fromAddress: "",
  toAddress: "",
  totalAmount: "",
  txHash: "",
  userTelegramId: "",
};

export default {
  name: "",
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      pageList: null,
      listLoading: true,
      listQuery: Object.assign({}, listQueryDefult),
      optionList: [],
      dialogVisible: false,
      rulesForm: Object.assign({}, rulesFormDefult),
      rules: {
        amount: [{ required: true, message: "请输入", trigger: "blur" }],
        fee: [{ required: true, message: "请输入", trigger: "blur" }],
        fromAddress: [{ required: true, message: "请输入", trigger: "blur" }],
        toAddress: [{ required: true, message: "请输入", trigger: "blur" }],
        totalAmount: [{ required: true, message: "请输入", trigger: "blur" }],
        txHash: [{ required: true, message: "请输入", trigger: "blur" }],
        userTelegramId: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getGroupList();
  },

  methods: {
    getGroupList() {
      getGroup({}).then((res) => {
        this.optionList = res.data;
      });
    },
    getList() {
      this.listLoading = true;
      getShowList(this.listQuery).then((res) => {
        console.log(res);
        this.listLoading = false;
        this.list = res.data.content;
        this.total = res.data.totalElements;
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
    addWithdrawFun() {
      this.rulesForm = Object.assign({}, rulesFormDefult);
      this.dialogVisible = true;
    },
    addFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addWithdraw(this.rulesForm).then((res) => {
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
    handleChange(sendStatus, id) {
      this.$confirm("确定要进行该操作吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          shenheWithdraw({ id, sendStatus }).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getList();
            this.dialogVisible = false;
          });
        })
        .catch(() => {});
    },
  },
};
</script>
