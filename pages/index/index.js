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
    $photos: [{
      url: "https://wulongquan.oss-cn-hangzhou.aliyuncs.com/we/images/01.jpeg?x-oss-process=image/resize,l_800"
    }, {
      url: "https://wulongquan.oss-cn-hangzhou.aliyuncs.com/we/images/02.jpeg?x-oss-process=image/resize,l_800"
    }]
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
    const { info } = app.globalData
    return {
      title: `邀请您于${info.$date1} ${info.$date2}参加${info.$groom}与${info.$bride}的结婚典礼。`,
      path: '/' + this.route
    }
  }
})
