const {
  api
} = require('./request.js')
const {
  dateFormat
} = require('../lib/util.js')

function parseComment(data) {
  const {
    time
  } = data
  data.time = dateFormat(time, 'yyyy.mm.dd HH:MM:ss')
  return data
}

// 新增评论
const add = data => api('addComment', data).then(parseComment)

// 获取所有评论
const getAllList = () =>
  api('listComment').then(res => {
    return res.map(parseComment)
  })

// 获取分页评论
const getList = data =>
  api('listComment', data).then(res => {
    return res.map(parseComment)
  })

const updateList = params => api('comment/updateList', params)
module.exports = {
  add,
  getAllList,
  getList,
  updateList
}