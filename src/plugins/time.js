import moment from 'moment'

export default function (Vue) {
  Vue.prototype.$moment = function (value) {
    moment.locale('zh-cn')
    return moment(value).format('YYYY-MM-DD')
  }
}
