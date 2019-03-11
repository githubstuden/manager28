<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="users-input">
      <el-col :span="16">
        <!-- <el-input placeholder="请输入内容" v-model="input5" class="input-with-select users-input"> -->
        <el-input
          v-model="forData.query"
          @keyup.native.enter="search"
          placeholder="请输入内容"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border>
      <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="visiChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delOne(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-sizes="[5, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        
      ></el-pagination>
    </div>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="addForm"  label-width="80px" class="my-form" :rules="rules" ref="addFrom" status-icon>
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="addForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" >
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="submitForm('addFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
     var checkemail = (rule, value, callback) => {
       let req = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        setTimeout(() => {
          if (req.test(value)) {
            callback();
          } else {
              callback(new Error('请填写正确的邮箱'));
          }
        }, 1000);
      };
     var checkmobile = (rule, value, callback) => {
       let req = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        setTimeout(() => {
          if (req.test(value)) {
            callback();
          } else {
              callback(new Error('请填写正确的手机号码'));
          }
        }, 1000);
      };
    return {
      tableData: [],
      forData: {
        query: "",
        pagenum: "1",
        pagesize: "10"
      },
      dialogFormVisible: false,
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:'',
      },
       rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
           email: [
            { validator: checkemail, trigger: 'blur' }
          ],
           mobile: [
            { validator: checkmobile, trigger: 'blur' }
          ],
     }
    };
    
  },
  methods: {
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    async search() {
      let res = await this.$http.get("users", {
        params: this.forData,
        // headers: { Authorization: window.sessionStorage.getItem("token") }
      });
      this.tableData = res.data.data.users;
      console.log(res);
    },
    submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            // alert('submit!');
            let res = await this.$http.post('users',this.addForm,{
              //  headers: { Authorization: window.sessionStorage.getItem("token") },
            })
            console.log(res);
             if (res.data.meta.status == "201") {
            this.search();
            this.dialogFormVisible = false;
          }
            // if()
          } else {
            this.$message.warning('提交失败')
            return false;
          }
        });
      },
      delOne(item){
         this.$confirm('你确定要删除吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // console.log(item);
          let res = await this.$http.delete(`users/${item.id}`)
          if(res.data.meta.status == 200){
            this.search()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    async visiChange(item){
      let res = await this.$http.put(`users/${item.id}/state/${item.mg_state}`)
    }
  },
  created() {
    this.search();
  }
};
</script>
<style>
.content-main .bread {
  height: 45px;
  background-color: #d3dce6;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 45px;
  padding-left: 10px;
}
.users-input {
  clear: both;
}
.my-form{
  height: auto;
  padding: 0;
  margin: 0;
}
</style>
