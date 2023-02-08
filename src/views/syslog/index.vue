<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-select
        v-model="listQuery.groupTelegramId"
        style="width: 180px; margin-right: 10px"
        class="filter-item"
        clearable
        placeholder="群组ID"
        @change="handleFilter"
      > -->
        <el-option
          v-for="item in pageList"
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
      <el-table-column label="群组ID" prop="groupTelegramId" align="center" />
      <el-table-column label="群组名称" prop="groupName" align="center" />
      <el-table-column label="是否开启" prop="groupEnable" align="center" />

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

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.strip"
      @pagination="getList"
    />

    <el-dialog title="授权群组" :visible.sync="addGroupVisible">
      <div>
        <el-form
          ref="ruleForm"
          :model="infoUpdateParams"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="群组ID" prop="groupTelegramId">
            <el-input
              v-model="infoUpdateParams.groupTelegramId"
              style="width: 500px"
              placeholder=""
            />
          </el-form-item>

          <el-form-item label="群组名称" prop="groupName">
            <el-input
              v-model="infoUpdateParams.groupName"
              style="width: 500px"
              placeholder=""
            />
          </el-form-item>

          <el-form-item label="是否开启" prop="groupEnable">
            <el-select
              v-model="infoUpdateParams.groupEnable"
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
import { getGroup, addGroup, deleteGroup } from "@/api/user.js";

const listQueryDefult = {
  page: 1,
  strip: 20,
  groupTelegramId: "",
};

export default {
  name: "",
  components: { Pagination },
  data() {
    return {
      pageList: null,
      total: 0,
      listLoading: true,
      listQuery: Object.assign({}, listQueryDefult),
      infoUpdateParams: {
        groupTelegramId: "",
        groupName: "",
        groupEnable: "",
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
      getGroup(this.listQuery).then((res) => {
        this.listLoading = false;
        this.pageList = res.data;
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    //显示
    showAddGroupVisible(row) {
      this.addGroupVisible = true;
      this.infoUpdateParams.groupTelegramId = row.groupTelegramId;
      this.infoUpdateParams.groupName = row.groupName;
      this.infoUpdateParams.groupEnable = row.groupEnable;
    },
    handleCanceledit() {
      this.addGroupVisible = false;
      this.active = 0;
    },

    //修改配置
    addGroupFuntion(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.infoUpdateParams);
          addGroup(this.infoUpdateParams).then((res) => {
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
      this.infoUpdateParams.groupTelegramId = row.groupTelegramId;
      deleteGroup(this.infoUpdateParams).then((res) => {
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
