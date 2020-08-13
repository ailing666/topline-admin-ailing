import MyBreadcrumb from '@/components/MyBreadcrumb.vue'
// export function GlobalCom (Vue) {
//   Vue.component(MyBreadcrumb.name, MyBreadcrumb)
// }
const myPlugin = {
  install (Vue) {
    Vue.component(MyBreadcrumb.name, MyBreadcrumb)
  }
}

export default myPlugin
