<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyBreadcrumb',
  created () {
    window.console.log(this.$route)
  }
}
</script>

<style></style>
