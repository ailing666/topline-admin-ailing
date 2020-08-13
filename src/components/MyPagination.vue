<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagination.currentPage"
    :page-sizes="pagination.pageSizes"
    :page-size="pagination.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    pagination: {
      type: Object
    },
    total: {
      type: Number
    },
    list: {
      type: Array
    }
  },
  created () {},
  methods: {
    // 页容量改变 范围10-50
    handleSizeChange (size) {
      this.pagination.pageSize = size
      this.$emit('search')
    },
    handleCurrentChange (page) {
      this.pagination.currentPage = page
      this.$emit('getData')
    }
  }
}
</script>

<style></style>
