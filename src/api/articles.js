import ajax from '../utils/request.js'

/**
 * 获取文章列表
 */
export const getArticlesList = params => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

/**
 * 获取频道
 */
export const getChannels = params => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/channels',
    params
  })
}
/**
 * 删除文章
 */
export const delArticles = target => {
  return ajax({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${target}`,
    target
  })
}
