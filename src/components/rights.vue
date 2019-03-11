<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="date" label="姓名" width="180"></el-table-column>
      <el-table-column prop="name" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="address" label="电话"></el-table-column>
      <el-table-column prop="address" label="电话"></el-table-column>
      
    </el-table>
    
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
