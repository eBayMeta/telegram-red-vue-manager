<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.userTelegramId"
        placeholder="用户ID"
        style="width: 180px"
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

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-add"
        @click="showAddGroupVisible"
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
      <el-table-column type="index" align="center" />
      <el-table-column label="用户ID" prop="userTelegramId" align="center" />
      <el-table-column label="用户名称" prop="userName" align="center" />
      <el-table-column label="类型" prop="bobmType" align="center" />

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
            @click="deleteGroupFuntion(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    />

    <el-dialog title="单控用户" :visible.sync="addGroupVisible">
      <div>
        <el-form
          ref="ruleForm"
          :model="infoUpdateParams"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="用户ID" prop="userTelegramId">
            <el-input
              v-model="infoUpdateParams.userTelegramId"
              style="width: 500px"
              placeholder=""
            />
          </el-form-item>
          
          <el-form-item label="是否兔死" prop="bobmType">
            <el-select
              v-model="infoUpdateParams.bobmType"
              placeholder="请选择"
              style="width: 500px"
            >
              <el-option label="yes" value="yes"> </el-option>
              <el-option label="no" value="no"> </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="addGroupFuntion('ruleForm')">
              确认
            </el-button>
            <el-button type="primary" @click="handleCanceledit()">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getBobmUserList, addBobmUser, deleteBobmUser } from "@/api/user.js";

const listQueryDefult = {
  pramsPage: 0,
  pramsSize: 10,
  userTelegramId: "",
};

export default {
  name: "",
  components: { Pagination },
  data() {
    return {
      pageList: null,
      total: 0,
      listLoading: true,
      pageSize: 10,
      listQuery: Object.assign({}, listQueryDefult),
      infoUpdateParams: {
        userTelegramId: "",
        bobmType:""
      },
      addGroupVisible: false,
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      getBobmUserList(this.listQuery).then((res) => {
        this.listLoading = false;
        this.total = res.data.totalElements;
        this.pageList = res.data.content;
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    handlePageChange(pageNumber) {
      this.listQuery.pramsPage = pageNumber - 1;
      this.$nextTick(() => {
        //调用请求数据
        this.getList();
      });
    },

    //显示
    showAddGroupVisible(row) {
      this.addGroupVisible = true;
      this.infoUpdateParams.userTelegramId = row.userTelegramId;
    },

    handleCanceledit() {
      this.addGroupVisible = false;
      this.active = 0;
    },

    //修改配置
    addGroupFuntion(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addBobmUser(this.infoUpdateParams).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getList();
            this.addGroupVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //删除配置
    deleteGroupFuntion(row) {
      this.infoUpdateParams.userTelegramId = row.userTelegramId;
      deleteBobmUser(this.infoUpdateParams).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getList();
        this.addGroupVisible = false;
      });
    },
  },
};
</script>
