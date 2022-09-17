const {
  api
} = require('./request.js')
const {
  dateFormat
} = require('../lib/util.js')

// 新增评论
const add = data => api('addComment', data)

// 获取所有评论
const getAllList = () =>
  api('listComment').then(res => {
    return res
  })

// 获取分页评论
const getList = data =>
  api('listComment', data).then(res => {
    return res
  })

const updateList = params => api('comment/updateList', params)
module.exports = {
  add,
  getAllList,
  getList,
  updateList
}