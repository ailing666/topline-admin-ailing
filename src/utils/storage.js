/**
 * 专门用来处理用户信息本地持久化---保存在localStorage
 */

// 定义一些工具方法，实现数据保存，获取，删除，修改

const KEY = 'hm-tt-pc-userinfo'

/**
* 保存用户信息到localStorage
* @param {*} user
*/
const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

/**
 * 取出用户信息
 */
const getUser = () => {
  // 如果本地获取不到这个key的值，先填入 {}
  // 避免后绪的代码出错。
  // userInfo.token
  //    当userInfo为null,代码就挂了
  //    当userInfo为{}，代码是Ok
  const result = JSON.parse(localStorage.getItem(KEY)) || {}
  // console.log('getuser', result)
  return result
}

/**
 * 删除功能
 */
const delUser = () => {
  localStorage.removeItem(KEY)
}

export { setUser, getUser, delUser }
