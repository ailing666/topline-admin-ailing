<template>
  <div class="articles">
    <el-card class="top">
      <MyBreadcrumb></MyBreadcrumb>
      <el-form :model="form" class="form" label-width="80px">
        <!-- 状态单选 -->
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="(item, index) in statusObj"
              :label="Object.keys(item)[0]"
              :key="index"
              >{{ Object.values(item)[0] }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道">
          <el-select v-model="form.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelsList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="日期">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到 {{ total }} 条结果,当前是第{{
          pagination.currentPage
        }}页：
      </div>
      <el-table v-if="articlesList" :data="articlesList" style="width:100%">
        <el-table-column label="封面">
          <template v-slot="scope">
            <el-image
              style="width: 150px; height: 100px"
              :src="scope.row.cover.images[0]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <div>
              <el-tag :type="statusObj[scope.row.status + 1]['type']">
                {{ statusObj[scope.row.status + 1][scope.row.status] }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="date" label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editArticle(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <MyPagination
        :pagination="pagination"
        @getData="getData"
        @search="search"
        :total="total"
      ></MyPagination>
    </el-card>
  </div>
</template>

<script>
import { getArticlesList, getChannels, delArticles } from '@/api/articles'
export default {
  name: 'articles',
  data () {
    return {
      dataArr: [],
      // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
      statusObj: [
        { null: '全部', type: '' },
        { 0: '草稿', type: '' },
        { 1: '待审核', type: 'warning' },
        { 2: '审核通过', type: 'success' },
        { 3: '审核失败', type: 'danger' },
        { 4: '已删除', type: 'info' }
      ],
      form: {
        status: 'null',
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        // 每一页多少条
        per_page: 20
      },
      articlesList: '',
      channelsList: '',
      pagination: {
        pageSize: 10,
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50]
      },
      total: 10
    }
  },
  created () {
    this.getData()
    getChannels().then(res => {
      this.channelsList = res.channels
    })
  },
  methods: {
    getData () {
      const _query = {
        ...this.form,
        page: this.pagination.currentPage,
        per_page: this.pagination.pageSize
      }
      if (_query.status === '4') {
        this.$message.error('没有权限查看已删除的分支')
        return
      } else if (_query.status === 'null') {
        _query.status = null
      }
      getArticlesList(_query).then(res => {
        this.articlesList = res.results
        this.total = res.total_count
      })
    },
    search () {
      // 处理时间
      this.dataArr = this.dataArr.map(item => this.$moment(item))
      ;[this.form.begin_pubdate, this.form.end_pubdate] = this.dataArr
      this.pagination.currentPage = 1
      this.getData()
    },
    del (id) {
      id = id.toString()
      this.$confirm('您确定要删除这条数据吗', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delArticles(id).then(() => {
            this.$message.success('删除成功')
            this.search()
          })
        })
        .catch(() => {})
    },
    editArticle (id) {
      id = id.toString()
      this.$router.push(`/layout/addArticle/${id}`)
    }
  }
}
</script>

<style lang="less">
.articles {
  .top {
    margin-bottom: 20px;
  }
  .form {
    padding: 0 20px;
  }
  .operation {
    display: flex;
    p {
      &::first-child {
        background-color: #f34;
      }
    }
  }
}
</style>
