<template>
  <el-container class="layout-container">
    <!-- 如果折叠，宽是64 -->
    <el-aside class="aside" :width="isCollapse ? '64px' : '200px'">
      <!-- 上面是一个logo
        如果是折叠，要更换logo的背景图。添加一个类.minLogo
      -->
      <div class="logo" :class="{ minLogo: isCollapse }"></div>
      <el-menu
        router
        :default-active="$route.path"
        class="nav-menu"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item
          v-for="(item, index) in layoutPath"
          :key="index"
          :index="item.path"
        >
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <!-- 内容有两部分：公司名 + 右侧的下拉菜单 -->
        <div>
          <i
            @click="isCollapse = !isCollapse"
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          ></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>

        <el-dropdown>
          <!-- 默认插槽：直接显示出来 -->
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- 具名插槽：设置下拉菜单的内容 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!--
              并不是所有的组件都支持@click
              el-button组件支持@click是因为它内部自己做了处理。
              如果某个组件加@click不能用，则补充一个.native 修饰符。
              native：原生的。
              .native 修饰符的作用是把事件添加到原生的dom上。
            -->
            <el-dropdown-item @click.native="hQuit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 二级路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { userGetProfile } from '../../api/user.js'
import { delUser } from '../../utils/storage.js'
export default {
  name: 'Layout',
  data () {
    return {
      user: {}, // 当前用户信息
      isCollapse: false // 默认侧边栏不折叠（展开）
    }
  },
  created () {
    // 组件创建完成就去调用
    this.setUserProfile()
  },
  computed: {
    layoutPath () {
      return this.$router.options.routes[1].children
    }
  },
  methods: {
    // 方法：设置用户信息
    setUserProfile () {
      userGetProfile()
        .then(res => {
          console.log(res)
          // 注意： res.data.data 这里有两层.data才能取回真正的数据
          this.user = res.data.data
        })
        .catch(err => {
          console.dir(err)
          // 401表示没有权限
          if (err.response.status === 401) {
            //
            alert('无权访问')
            this.$router.push('/login')
          }
        })
    },
    // 退出功能
    hQuit () {
      this.$confirm('就走啦?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 2. 清除本地localStorge中的信息
          delUser()
          // 3. 回去登陆页
          this.$router.push('/login')
        })
        .catch(() => {
          // 用户取消了
        })
    }
  }
}
</script>

<style lang="less" scoped>
/* 外层的容器
    占满整个页面
  */
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #002033;
  .el-menu {
    border-right: none;
  }
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/logo_admin.png) no-repeat center /
      140px auto;
  }
  // 覆盖background 的图片和大小，类书写在logo的下方。
  .minLogo {
    background-image: url(../../assets/logo_admin_01.png);
    background-size: 36px auto;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.main {
  background-color: #e9eef3;
}
</style>
