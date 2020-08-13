import MyBreadcrumb from '@/components/MyBreadcrumb.vue'
import MyPagination from '@/components/MyPagination.vue'
// export function GlobalCom (Vue) {
//   Vue.component(MyBreadcrumb.name, MyBreadcrumb)
// }
const myPlugin = {
  install (Vue) {
    Vue.component(MyBreadcrumb.name, MyBreadcrumb)
    Vue.component(MyPagination.name, MyPagination)
  }
}

export default myPlugin
