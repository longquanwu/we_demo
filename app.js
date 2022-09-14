import { initUserInfo } from './services/user';
const Event = require('./lib/event.js')

//app.js
App({
  onLaunch: function () {
    // 拉取用户信息并保存本地
    initUserInfo();
    // global数据
    this.globalData = {
      // 全局的状态
      state: {
        // 音乐播放
        isMusicPlay: true
      },
      // 用户授权的信息（昵称、头像）
      userInfo: null,
      // 全局的信息（婚礼信息等）
      info: {},
      audio: null,

      isUserAction: false
    }
    // 创建背景音乐
    const audio = wx.createInnerAudioContext()
    audio.autoplay = true
    audio.loop = true
    audio.src = "https://wulongquan.oss-cn-hangzhou.aliyuncs.com/we/music/canon.mp3"
    audio.play()
    this.globalData.audio = audio

    // 全局状态改变
    Event.on('stateChange', data => {
      Object.assign(this.globalData.state, data)
      if (data.isMusicPlay) {
        audio.play()
      } else {
        audio.pause()
      }
    })
  },
  onHide() {
    const {
      isUserAction,
      audio
    } = this.globalData
    if (!isUserAction) {
      audio.pause()
    }
  },
  onShow() {
    const {
      isUserAction,
      audio
    } = this.globalData
    if (!isUserAction) {
      audio.play()
    }
    this.globalData.isUserAction = false
  }
})