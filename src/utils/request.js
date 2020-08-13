/**
 * 基于 axios 封装 请求模块
 */
import { getUser } from './storage.js'
import JSONbig from 'json-bigint'
import axios from 'axios'

// 创建axios的实例
// 可以写自己的配置项  http://www.axios-js.com/docs/#axios-create-config
const instance = axios.create({
  // 基地址：当前项目所有的接口都是以这个地址开头的
  baseURL: 'http://ttapi.research.itcast.cn/',

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  // 允许修改响应数据，也就是请求接口后端返回数据
  transformResponse: [
    function (data) {
      // data:就是本次请求获取的数据
      // 在这里可以对它进行进一步的处理 -- JSONbig
      // 尝试把JSON字符串转成对象
      try {
        // 如果没有遇到错误，就返回 JSONbig处理之后的数据
        return JSONbig.parse(data)
      } catch (err) {
        // 后端返回数据可能不是 JSON 字符串，而JSONbig.parse()只能处理JSON字符串
        // 所以，为了保证代码可以正常执行，这里引入try-catch来捕获异常
        console.log('JSONbig转换出错', err)
        return data
      }
    }
  ]
})

// 请求拦截器
// 所有请求发出去之前会执行的函数，都会处理的逻辑。
instance.interceptors.request.use(
  function (config) {
    const userInfo = getUser()
    // 在请求发出去之前做一些事
    // 本次请求采用的配置
    // 每个请求headers传递token
    if (userInfo && userInfo.token) {
      // 在这里给请求加上header，设置token
      config.headers.Authorization = `Bearer ${userInfo.token}`
    }
    return config
  },
  function (error) {
    //  对请求错误做些什么
    return Promise.reject(error)
  }
)

// 默认导出
export default instance
