const page = require('../../framework/page.js')
const app = getApp()

page({
  data: {
    $ready: true,
    isShowCover: true,
    isFirst: true,
    current: 0,
    isMoving: false,
    y: 0,
    $phone1: 13340019082,
    $phone2: 13910291734,
    $photos: [{
      url: "https://wulongquan.oss-cn-hangzhou.aliyuncs.com/we/images/03.jpg?x-oss-process=image/resize,l_800"
    }],
    "latitude": 30.599615,
    "longitude": 119.882985,
    markers: [{
      "height": 50,
      "width": 50,
      "iconPath": "/images/nav.png",
      "id": 1,
      "label": {
        "anchorX": -20,
        "bgColor": "#666",
        "borderColor": "#eccb90",
        "borderRadius": 10,
        "borderWidth": 1,
        "color": "#fff",
        "content": " 去这里 ",
        "fontSize": 10,
        "padding": 2,
        "textAlign": "center"
      },
      "latitude": 30.599615,
      "longitude": 119.882985,
    }]
  },
  markertap() {
    const { latitude, longitude, $hotel, $address } = this.data
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: "裸心堡",
      address: "浙江省·湖州市·德清县·莫干山"
    })
  },
  onReady() {
  },
  // 切换 封面是否显示
  toggleCover({
    currentTarget: {
      dataset: { type }
    }
  }) {
    const { isShowCover } = this.data
    if (type === 'swiper' && !isShowCover) {
      return
    }
    this.setData({
      isFirst: false,
      isShowCover: !isShowCover
    })
  },
  // 补充滑动切换背景图事件
  start({ changedTouches }) {
    if (!changedTouches[0]) return
    const { clientY } = changedTouches[0]
    this.setData({
      isMoving: true,
      y: clientY
    })
  },
  move({ changedTouches }) {
    if (!changedTouches[0]) return
    const { clientY } = changedTouches[0]
    const { y, isMoving, current, $indexBanners } = this.data
    const len = $indexBanners.length

    if (!isMoving) {
      return
    }
    if (y - clientY >= 30) {
      this.setData({
        current: current + 1 >= len ? 0 : current + 1,
        isMoving: false
      })
    }
    if (y - clientY <= -30) {
      this.setData({
        current: current - 1 <= -1 ? len - 1 : current - 1,
        isMoving: false
      })
    }
  },
  onShareAppMessage() {
    return {
      title: `婚礼邀请函`,
      path: '/' + this.route
    }
  }
})
