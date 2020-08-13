/**
 * 封装用户相关操作
 *
 * es6按需导入导出
 */
// ajax名字是可以改的。它的格式与 axios()的格式是一样的
import ajax from '../utils/request.js'
//  定义一个函数，并导出

//  传入手机号验证码进行登陆操作
export const userLogin = (mobile, code) => {
  // 这个函数的返回结果是一个promise类型的数据

  // ajax是request.js中导出的axios的实例
  // 它的执行结果就是一个promise对象
  const result = ajax({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile: mobile,
      code: code
    }
  })

  return result
}

/**
 * 获取用户的身份信息。
 * 这个接口是需要token信息才能访问的
 */
export const userGetProfile = () => {
  // 请求接口
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 设置改到了request.js中的请求拦截器
    // 参数写在headers中是由于 接口的要求
    // // 参数名，个数，类型，在哪里传过去......都是由后端写接口的人决定！
    // headers: {
    //   // Authorization: 'Bearer 从localstorge中取出token字符串'
    //   // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjE2NDgwMTMsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.9nDEYT2H0QE5wXzrzx9lvw_svtqgfbv_JscOBtyXUfo'
    //   Authorization: `Bearer ${userInfo.token}`
    // }
  })
}

/**
 * 修改用户信息
 * @param {*} name 姓名
 * @param {*} email 邮箱
 * @param {*} intro 介绍
 */
// export const modUserProfile = (name, email, intro) => {

/**
 * 修改用户信息
 * @param {*} data
 * 直接传入一个对象：data: {name, email, info}
 */
export const modUserProfile = data => {
  return ajax({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    // data: dataObj
    data
  })
}

/**
 * 修改头像
 * @param {*} formData  是一个FormData格式的对象
 */
export const moduserImage = (formData) => {
  return ajax({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data: formData
  })
}
