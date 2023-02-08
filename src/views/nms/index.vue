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
        style="width: 180px; margin-right: 10px"
        class="filter-item"
        clearable
        placeholder="群组ID"
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
        label="发包编号"
        prop="orderCode"
        align="center"
        width="160"
      />
      <el-table-column
        label="发包用户"
        prop="userName"
        align="center"
        width="160"
      />
      <el-table-column
        label="用户ID"
        prop="userTelegramId"
        align="center"
        width="160"
      />
      <el-table-column label="发包数量" prop="chipTotal" align="center" />
      <el-table-column label="发包雷号" prop="bombNumber" align="center" />
      <el-table-column
        label="盈利状态"
        prop="status"
        align="center"
        width="200"
      />

      <el-table-column
        label="创建时间"
        width="150px"
        align="center"
        prop="createTime"
      />
      <el-table-column
        label="操作"
        align="center"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-popover placement="right" width="600" trigger="click">
            <el-table :data="gridData">
              <el-table-column
                property="toUserGetAmount"
                label="抢包金额"
              ></el-table-column>
              <el-table-column
                property="toUserName"
                label="抢包人"
              ></el-table-column>
              <el-table-column
                property="toUserProfit"
                label="实际抢包到账"
              ></el-table-column>
              <el-table-column
                property="toUserStatus"
                label="抢包状态"
              ></el-table-column>
            </el-table>
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              @click="handleChangeInfor(row.id)"
            >
              详情
            </el-button>
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
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getNodeOrderList, getGroup, getOrderDetails } from "@/api/user.js";

const listQueryDefult = {
  userTelegramId: undefined,
  userName: undefined,
  groupTelegramId: undefined,
  pramsPage: 0,
  pramsSize: 10,
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
      gridData: [],
    };
  },

  created() {
    this.getList();
    this.getGroupList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getNodeOrderList(this.listQuery).then((res) => {
        this.listLoading = false;
        this.total = res.data.totalElements;
        this.pageList = res.data.content;
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
    handleChangeInfor(id) {
      getOrderDetails({ sendOrderId: id }).then((res) => {
        this.gridData = res.data;
      });
    },
    handlePageChange(pageNumber) {
      this.listQuery.pramsPage = pageNumber - 1;
      this.$nextTick(() => {
        //调用请求数据
        this.getList();
      });
    },
    handlePage() {
      this.pageList = this.list.filter(
        (item, index) =>
          index < this.listQuery.page * this.listQuery.strip &&
          index >= this.listQuery.strip * (this.listQuery.page - 1)
      );
    },
  },
};
</script>
