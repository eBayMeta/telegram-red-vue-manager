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
      <el-select
        v-model="listQuery.bizCode"
        class="filter-item"
        style="width: 180px; margin-right: 10px"
        placeholder="业务类型"
        clearable
        @change="handleFilter"
      >
        <el-option
          v-for="item in optionList"
          :key="item.bizCode"
          :label="item.bizName"
          :value="item.bizCode"
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

 总计：
 <el-input
        v-model="totalFlow"
        placeholder=" 总计 "
        style="width: 180px; margin-right: 10px"
        class="filter-item"
      />

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

      <el-table-column label="业务类型" prop="bizCode" align="center" />

      <el-table-column label="操作数量" prop="chipAmount" align="center" />
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
  getUserFlowList,
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
        totalFlow:"",

      optionList: [
        { bizCode: "biz_recharge_byAdmin", bizName: "管理员手动上分"  },
        { bizCode: "biz_withdraw_byAdmin", bizName: "管理员手动下分"  },
        { bizCode: "biz_recharge", bizName: "自动上分"  },
        { bizCode: "biz_withdraw", bizName: "自动下分"  },
        { bizCode: "biz_push_recharge_reward", bizName: "推广充值奖励"  },
        { bizCode: "biz_push_flow_reward", bizName: "推广的人流水的奖励"  },
        { bizCode: "biz_send_win", bizName: "庄家赢"  },
        { bizCode: "biz_send_shu", bizName: "玩家输"  },
        { bizCode: "biz_get_win", bizName: "玩家赢"  },
        { bizCode: "biz_get_shu", bizName: "玩家输"  },

         { bizCode: "biz_flow_reward_xiaoshunzi", bizName: "小顺子奖励"  },
          { bizCode: "biz_flow_reward_dashunzi", bizName: "大顺子奖励"  },
           { bizCode: "biz_flow_reward_xiaobaozi", bizName: "小豹子奖励"  },
            { bizCode: "biz_flow_reward_dabaozi", bizName: "大豹子奖励"  },
            { bizCode: "biz_order_time_out_return", bizName: "订单过期退回"  },
        ],
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getUserFlowList(this.listQuery).then((res) => {
        this.listLoading = false;
        this.total = res.data.pagesContent.totalElements;
        this.pageList = res.data.pagesContent.content;
        this.totalFlow = res.data.totalFlow;
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
