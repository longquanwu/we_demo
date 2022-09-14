/**
 * 
 * @param {*} code 
*/

const { api } = require('./request.js')

export async function initUserInfo() {
  let res = await new Promise((resolve, reject) => {
    // 登录
    wx.login({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
  if (res.code) {
    let resData = await login(res.code);
    // 保存登录用户信息
    wx.setStorageSync('user_open_id', resData['open_id'])
    wx.setStorageSync('user_nickname', resData['nickname'])
    wx.setStorageSync('user_avatar_url', resData['avatar_url'])
  } else {
    console.log('登录失败！' + res.errMsg)
  }
}

/**
 * 登录并返回用户信息
 * @param {} code 
 */
export function login(code) {
  return api("/login", {
    'code': code
  });
}

/**
 * 更新用户昵称与头像
 * @param {昵称} nickname 
 * @param {*} avatarUrl 
 */
export function updateUserInfo(nickname, avatarUrl) {
  return api("/updateUserInfo", {
    'nickname': nickname,
    'avatarUrl': avatarUrl
  });
}

/**
 * 获取宾客列表
 */
export function listGuests() {
  return api("/listGuests");
}