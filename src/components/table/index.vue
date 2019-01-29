<template>
  <div>
    <router-view v-if="$route.path!='/table'"></router-view>
    <div v-if="$route.path=='/table'">
      <el-card shadow="hover" class="admin-table-search">
        <el-form
          :model="tableQuery"
          label-width="80px"
          label-position="left"
          class="table-search"
          size="small"
          @submit.native.prevent
        >
          <el-row :gutter="30">
            <el-col :span="6">
              <el-form-item label="用户名">
                <el-input v-model="tableQuery.userName" placeholder="用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="searchTable"
                  :loading="tableLoading"
                  native-type="submit"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <div class="admin-methdos-btns">
        <el-button @click="openAdd()" size="medium" type="primary" icon="el-icon-plus">新增</el-button>
        <el-button @click="delAll()" size="medium" type="danger" icon="el-icon-plus">删除选中</el-button>
      </div>
      <el-table
        border
        stripe
        size="small"
        :data="tableData.data"
        v-loading="tableLoading"
        style="width: 100%;"
        class="admin-table-list"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column label="激活">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="userActivation(scope.row)"
              :active-value="0"
              :inactive-value="1"
              active-text="启用"
              inactive-text="停用"
              active-color="#13ce66"
              inactive-color="#cbcbcb"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEdit(scope)" icon="el-icon-edit" type="success">编辑</el-button>
            <router-link :to="'/table/info?id=' + scope.row.id">
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="warning"
              >查看详情</el-button>
            </router-link>
            <el-button size="mini" @click="delRow(scope)" icon="el-icon-edit" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableQuery.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="tableQuery.size"
          :total="tableData.total"
          layout="total, sizes, prev, pager, next, jumper"
          background
        ></el-pagination>
      </div>
      <el-dialog title="添加" :visible.sync="addDialog" width="40%" center>
        <add
          :key="addKey"
          @success="()=>{this.getTable();this.addDialog=false}"
          @end="()=>{this.addDialog=false}"
        ></add>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="editDialog" width="40%" center>
        <edit
          :key="addKey"
          :id="editId"
          @success="()=>{this.getTable();this.editDialog=false;this.editId='';}"
          @end="()=>{this.editDialog=false;this.editId='';}"
        ></edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser, deleteAllUser, statusUser } from "@/api/user";
import add from "./add";
import edit from "./edit";
export default {
  components: { add, edit },
  created() {
    //this.tableQuery.communityId = this.$route.query.communityId
    //this.tableQuery.communityId = Number(this.$route.query.communityId);
    this.getTable();
  },
  data() {
    return {
      addKey: 0, //通过key来让组件重新渲染，以便清除上次数据
      addDialog: false,
      editDialog: false,
      editId: "",
      tableLoading: false,
      tableQuery: {
        page: this.$dict.BASE_TABLE_PAGE,
        size: this.$dict.BASE_TABLE_SIZE
      },
      tableData: {
        data: [],
        total: 0
      },
      multipleSelection: [],
      postData: {}
    };
  },
  methods: {
    //用户激活
    userActivation(row) {
      this.tableLoading = true;
      this.postData.id = row.id;
      this.postData.status = row.status;
      statusUser(this.postData)
        .then(res => {
          this.tableLoading = false;
        })
        .catch(err => {
          this.tableLoading = false;
          console.warn(err);
        });
    },
    //添加
    openAdd() {
      this.addKey++;
      this.addDialog = true;
    },

    //编辑
    openEdit(scope) {
      this.addKey++;
      this.editId = scope.row.id;
      this.editDialog = true;
    },
    //修改密码
    openRepassword(scope) {
      this.addKey++;
      this.editId = scope.row.id;
      this.repasswordDialog = true;
    },
    // 查询信息
    getTable() {
      this.tableLoading = true;
      getUserList(this.tableQuery)
        .then(res => {
          this.tableLoading = false;
          var result = [];
          if (res.data.code == 0) {
            result = res.data.data;
            this.tableData.total = res.data.total;
          } else {
            this.$message.error(res.data.msg);
          }
          this.$set(this.tableData, "data", result);
        })
        .catch(err => {
          this.tableLoading = false;
          console.warn(err);
        });
    },
    searchTable() {
      this.tableQuery.page = 1;
      this.getTable();
    },
    //删除行
    delRow(scope) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(scope.row.id)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: err.msg
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delAll() {
      if (this.multipleSelection.length > 0) {
        var ids = [];
        this.multipleSelection.forEach(element => {
          ids.push(element.id);
        });
        this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteAllUser(ids)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              })
              .catch(err => {
                this.$message({
                  type: "info",
                  message: err.msg
                });
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "没有选中项"
        });
      }
    },
    // 每页数量切换
    handleSizeChange(val) {
      this.tableQuery.page = 1;
      this.tableQuery.size = val;
      this.getTable();
    },
    // 页数切换
    handleCurrentChange(val) {
      this.tableQuery.page = val;
      this.getTable();
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style>
.admin-methdos-btns {
  margin: 20px;
}
</style>
