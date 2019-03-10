<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
              <img src="../assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="16" class="header-center">
          <div class="grid-content bg-purple-light">
              电商后台管理系统
          </div>
        </el-col>
        <el-col :span="4" class="header-right">
          <div class="grid-content bg-purple">
              <el-button type="success" @click="loginout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="content-aside" width="200px">Aside</el-aside>
      <el-main class="content-main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
    beforeCreate() {
        if(window.sessionStorage.getItem('token')){

        }else{
            this.$message.warning("请登录！！！")
            this.$router.push('/login')
        }
    },
    methods:{
        loginout(){
            this.$confirm('你真的要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
    }
};
</script>
<style>
.index-container{
    height: 100%;
}
.index-header{
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
}
.header-center{
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: white
}
.header-right{
    text-align: right;
}
.content-main{
    background-color: #e9eef3;
}
</style>
