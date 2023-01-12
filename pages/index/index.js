const page = require('../../framework/page.js')
const app = getApp()

page({
  data: {
    $ready: true,
    tabType: "invite",
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
    }],
    meeting: [{ // 婚礼流程
      time: '10:00-12:00',
      text: '抢亲'
    }, {
      time: '12:00-14:00',
      text: '午宴'
    }, {
      time: '14:30-15:30',
      text: 'First look'
    }, {
      time: '16:00-16:30',
      text: '宾客签到'
    }, {
      time: '16:30-17:30',
      text: '婚礼仪式'
    }, {
      time: '18:00-19:30',
      text: '晚宴'
    }, {
      time: '19:00-',
      text: 'After party'
    }],
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
    let meeting = wx.getStorageSync('meeting');
    if (meeting != null && meeting != "") {
      this.setData({
        meeting: meeting
      })
    }
  },
  // 切换 封面是否显示
  toggleCover({
    currentTarget: {
      dataset: { type }
    }
  }) {
    const { tabType } = this.data
    if (type === tabType) {
      return
    }

    let meeting = wx.getStorageSync('meeting');
    if (meeting != null && meeting != "") {
      console.log(meeting)

      this.setData({
        meeting: meeting
      })
    }

    this.setData({
      isFirst: false,
      tabType: type
    })
  },
  move({ changedTouches }) {
    this.setData({
      isShowCover: !this.data.isShowCover
    })
  },
  onShareAppMessage() {
    return {
      title: `我们结婚啦💖`,
      path: '/' + this.route
    }
  }
})
