const {api} = require('./request.js')

/**
 * 获取照片墙列表
 */
const listPhotoWall = () => api("/listPictureWall")
module.exports = {
  listPhotoWall
}