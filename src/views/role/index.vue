<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="success"
        icon="el-icon-plus"
        @click="addFun"
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

      <el-table-column label="角色名称" prop="roleName" align="center" />
      <el-table-column label="账号" prop="userName" align="center" />
      <el-table-column label="权限菜单" prop="menuNameList" align="center" />
      <el-table-column label="创建时间" prop="createTime" align="center" />

      <el-table-column
        label="操作"
        align="center"
        width="240"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="updateFun(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加" :visible.sync="addGroupVisible">
      <div>
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="ruleForm"
          label-position="left"
          label-width="140px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="ruleForm.roleName"
              style="width: 500px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="账号" prop="userName">
            <el-input
              v-model="ruleForm.userName"
              style="width: 500px"
              placeholder=""
            />
          </el-form-item>
          <el-form-item label="密码" prop="userPass">
            <el-input
              v-model="ruleForm.userPass"
              style="width: 500px"
              placeholder=""
            />
          </el-form-item>

          <el-form-item label="权限菜单" prop="menuCodes">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in menuList"
                :label="item.menuName"
                :key="item.menuCode"
                >{{ item.menuName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addFuntion('ruleForm')">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getRoleList, getMenuList, addOrUpdateAdmin } from "@/api/user.js";

const listQueryDefult = {
  page: 1,
  strip: 20,
  groupTelegramId: "",
};
const formQueryDefult = {
  roleName: "",
  userName: "",
  userPass: "",
  menuCodes: "",
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
      ruleForm: Object.assign({}, formQueryDefult),
      rules: {
        roleName: [{ required: true, message: "请输入", trigger: "blur" }],
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        userPass: [{ required: true, message: "请输入", trigger: "blur" }],
        menuCodes: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addGroupVisible: false,

      checkAll: false,
      checkedCities: [],
      menuList: [],
      isIndeterminate: true,
    };
  },

  created() {
    this.getList();
    this.getMenuListFun();
  },

  methods: {
    handleCheckAllChange(val) {
      let arr = [];
      this.menuList.forEach((item) => {
        arr.push(item.menuName);
      });
      this.checkedCities = val ? arr : [];
      this.isIndeterminate = false;
      this.setMenuCodes(val ? arr : []);
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.menuList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.menuList.length;
      this.setMenuCodes(value);
    },
    setMenuCodes(val) {
      let arr = [];
      if (val.length) {
        val.forEach((item) => {
          this.menuList.some((i) => {
            if (item == i.menuName) {
              arr.push(i);
              return true;
            }
          });
        });
      }
      this.ruleForm.menuCodes = arr.length ? arr : "";
    },
    getList() {
      this.listLoading = true;
      getRoleList(this.listQuery).then((res) => {
        this.listLoading = false;
        let list = res.data;
        list.forEach((item) => {
          let arr = [];
          item.menuCodes.forEach((i) => {
            arr.push(i.menuName);
          });
          item["menuNameList"] = arr;
        });
        this.pageList = list;
      });
    },
    getMenuListFun() {
      getMenuList({}).then((res) => {
        this.menuList = res.data;
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    //显示
    addFun() {
      this.ruleForm = Object.assign({}, formQueryDefult);
      this.addGroupVisible = true;
    },
    handleCanceledit() {
      this.addGroupVisible = false;
      this.active = 0;
    },

    //修改配置
    addFuntion(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          addOrUpdateAdmin(this.ruleForm).then((res) => {
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

    //编辑配置
    updateFun(row) {
      Object.keys(this.ruleForm).forEach((key) => {
        this.ruleForm[key] = row[key];
      });
      let arr = [];
      row.menuCodes.forEach((item) => {
        arr.push(item.menuName);
      });
      this.checkedCities = arr;
      this.ruleForm["id"] = row.id;
      this.addGroupVisible = true;
    },
  },
};
</script>
