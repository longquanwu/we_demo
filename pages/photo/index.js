const app = getApp()
const page = require('../../framework/page.js')
const Event = require('../../lib/event.js')
import { listPhotoWall } from '../../services/photo';

page({
  data: {
    // 展现模式
    $ready: true,
    mode: 'swiper',
    number: null,
    height: 0,
    startX: 0,
    startY: 0,
    left: 0,
    top: 0,
    photos: [],
    cols: 2,
    userInfo: null
  },
  async onReady() {
    let photoList = await listPhotoWall();

      this.setData({
        photos: photoList.data,
        userInfo: app.globalData.userInfo
      })
    // 获取屏幕高度
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({
          height: windowHeight
        })
      }
    })
  },
})
