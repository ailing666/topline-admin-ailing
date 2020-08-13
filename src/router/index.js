// 设置路由
// 这个文件是由脚手架工具自动生成的

// 功能：设置路由。决定哪个地址显示哪个组件
import { getUser } from '../utils/storage'
import Vue from 'vue'
import VueRouter from 'vue-router'

// 把组件的引入改成函数的写法
// 以下异步引入路由，打开页面时才加载对应的组件，保证了首屏打开速度
const Login = () => import('../views/login/index.vue')

const Layout = () => import('../views/layout/index.vue')
// 首页
const Home = () => import('../views/home/index.vue')
// 粉丝
const Fans = () => import('../views/fans/index.vue')
// 评论
const Comment = () => import('../views/comment/index.vue')
// 设置
const Settings = () => import('../views/settings/index.vue')
// 素材
const Image = () => import('../views/image/index.vue')
// 文章管理
const Articles = () => import('../views/articles/index.vue')
// 文章发布
const AddArticle = () => import('../views/addArticle/index.vue')

// 404页面
const NotFound = () => import('../views/page404/index.vue')

Vue.use(VueRouter)

// 配置路由
const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: '/layout/home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: '/layout/articles',
        component: Articles,
        meta: {
          title: '内容管理',
          icon: 'el-icon-document'
        }
      },
      {
        path: '/layout/image',
        component: Image,
        meta: {
          title: '素材管理',
          icon: 'el-icon-picture'
        }
      },
      {
        path: '/layout/addArticle',
        component: AddArticle,
        meta: {
          title: '发布文章',
          icon: 'el-icon-s-promotion'
        }
      },
      {
        path: '/layout/comment',
        component: Comment,
        meta: {
          title: '评论管理',
          icon: 'el-icon-chat-dot-round'
        }
      },
      {
        path: '/layout/fans',
        component: Fans,
        meta: {
          title: '粉丝管理',
          icon: 'el-icon-setting'
        }
      },
      {
        path: '/layout/settings',
        component: Settings,
        meta: {
          title: '个人设置',
          icon: 'el-icon-setting'
        }
      }
    ]
  },
  // 无法匹配路由会显示404页面
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes
})

// 前置路由
// 所有的路由页面中跳转，都会先进入到这个函数中来。
// to: 要跳入的路由信息。你要去哪里
// from: 要跳出的路由信息。你从哪里来
// next: 放行方法
//   - next() : 正确跳转。允许进入到 to 路由
//   - next(路由地址) : 不允许去to，而转去指定的路由地址
router.beforeEach((to, from, next) => {
  // 如果想进入主页，就检查是否登录，没有的话跳转登录
  if (to.path !== '/login') {
    // 检查是否有登陆信息：看localStorage中是否有保存信息
    const userInfo = getUser()
    if (userInfo && userInfo.token) {
      // 有就放行，
      next()
    } else {
      console.log('路由导航守卫:你没有登陆，请回去！')
      // 没有就回去登陆
      next('/login')
    }
  } else {
    // 如果跳转登录，直接放行
    next()
  }
})

export default router
