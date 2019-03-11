<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain>添加角色</el-button>
  </div>
</template>
<script>
export default {
   
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
.users .users-input {
  width: 30%;
}
</style>
