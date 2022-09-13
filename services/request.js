const host = 'https://rq.longquangege.cn/we/';
const map = {}
const {
  hint
} = require('../framework/message.js')

const api = async (uri, params) => {
  return await new Promise((resolve, reject) => {
    wx.request({
      url: host + uri,
      method: 'POST',
      data: params,
      header: {
        'open-id': wx.getStorageSync('user_open_id'),
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: res => {
        console.log(res)
        resolve(res.data.data);
      },
      fail: err => {
        hint((err && err.errorMessage) || '网络错误啦 QoQ!')
      }
    })
  })
}

module.exports = {
  api
}