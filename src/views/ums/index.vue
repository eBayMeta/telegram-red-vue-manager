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
      <el-table-column label="余额" prop="chipBalance" align="center" />
      <el-table-column
        label="累计充值"
        prop="usdtRechargeTotal"
        align="center"
      />
      <el-table-column
        label="累计提现"
        prop="usdtWithdrawTotal"
        align="center"
      />
      <el-table-column
        label="注册时间"
        width="150px"
        align="center"
        prop="createTime"
      />
      <el-table-column
        label="操作"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="primary"
            @click="handleChangeInfor(row, 1)"
          >
            增加
          </el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleChangeInfor(row, 2)"
          >
            减少
          </el-button>

          <el-button
            size="mini"
            type="primary"
            @click="deleteUserRow(row)"
          >
            删除
          </el-button>

          <el-popover placement="left" width="500" trigger="click">
            <div style="font-size: 12px;display:flex;flex-wrap:wrap">
              <div style="width:200px">
                历史推广总人数： {{ myPushTotalUsersCount }}
              </div>
              <div style="width:200px">
                今日推广总人数：{{ myPushTotalUsersCountByToday }}
              </div>
              <div style="width:200px">
                推广流水总收益： {{ myTotalPushFlowReward }}
              </div>
              <div style="width:200px">
                推广充值总收益： {{ myTotalPushRechargeReward }}
              </div>
            </div>

            <el-table :data="gridData">
              <el-table-column
                property="userTelegramId"
                label="用户id"
              ></el-table-column>
              <el-table-column
                property="userName"
                label="用户名称"
              ></el-table-column>
              <el-table-column
                property="chipBalance"
                label="余额"
              ></el-table-column>
            </el-table>
            <el-pagination
              :page-size="shareQuery.pramsSize"
              background
              layout="prev, pager, next"
              :total="gridDataTotal"
              @current-change="handleSharePageChange"
              @prev-click="handleSharePageChange"
              @next-click="handleSharePageChange"
            />
            <el-button
              slot="reference"
              size="mini"
              style="margin-left: 10px"
              @click="getShareDetails(row.userTelegramId)"
              >推广详情</el-button
            >
          </el-popover>
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

    <!-- 删除 -->
    <el-dialog title="确定删除该用户" :visible.sync="deleteforVisible">
      <div>
        <el-form
          ref="ruleForm"
          :model="inforUpdateParams"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item>
            <el-button type="primary" @click="deleteFun()">
              确认
            </el-button>

            <el-button type="primary" @click="deleteforVisible=false" >
              取消
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
  getUserList,
  changeUserInfor,
  deleteUser,
  getGroup,
  userPushList,
} from "@/api/user.js";

const listQueryDefult = {
  userTelegramId: undefined,
  userName: undefined,
  groupTelegramId: undefined,
  pramsPage: 0,
  pramsSize: 10,
};
const shareQueryDefult = {
  userTelegramId: undefined,
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
      shareQuery: Object.assign({}, shareQueryDefult),
      dialogAssetsVisible: false,
      deleteforVisible:false,
      dialogInforVisible: false,
      accountUpdateParams: {
        address: "",
        tokenTotalBalance: "",
        lineTotalTime: "",
      },
      inforUpdateParams: {
        chipBalance: "",
        userTelegramId: "",
      },
      editType: "",
      optionList: [],
      gridData: [],
      gridDataTotal: 0,
      myPushTotalUsersCount: 0,
      myPushTotalUsersCountByToday: 0,
      myTotalPushFlowReward: 0,
      myTotalPushRechargeReward: 0,
    };
  },

  created() {
    this.getList();
    this.getGroupList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getUserList(this.listQuery).then((res) => {
        this.listLoading = false;
        this.total = res.data.totalElements;
        this.pageList = res.data.content;
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
    handleSharePageChange(pageNumber) {
      this.shareQuery.pramsPage = pageNumber - 1;
      this.$nextTick(() => {
        //调用请求数据
        this.getShareDetails();
      });
    },
    handleFilter() {
      this.listQuery.pramsPage = 0;
      this.getList();
    },
    getShareDetails(id) {
      if (id) this.shareQuery.userTelegramId = id;
      userPushList(this.shareQuery).then((res) => {
        this.myPushTotalUsersCount = res.data.myPushTotalUsersCount;
        this.myPushTotalUsersCountByToday =
          res.data.myPushTotalUsersCountByToday;
        this.myTotalPushFlowReward = res.data.myTotalPushFlowReward;
        this.myTotalPushRechargeReward = res.data.myTotalPushRechargeReward;
        this.gridData = res.data.pushList.content;
        this.gridDataTotal = res.data.pushList.totalElements;
      });
    },

    // 修改用户
    handleChangeInfor(row, type) {
      this.dialogInforVisible = true;
      this.inforUpdateParams.userTelegramId = row.userTelegramId;
      this.editType = type;
    },

    deleteUserRow(row){
       this.deleteforVisible = true;
       this.inforUpdateParams.userTelegramId = row.userTelegramId;
    }
,
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

    deleteFun() {
      deleteUser(this.inforUpdateParams).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getList();
       this.deleteforVisible = false;
      });
    },


  },
};
</script>
