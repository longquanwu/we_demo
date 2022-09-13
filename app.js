//app.js
App({
  onLaunch: function () {
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
      /**
       *  是否为用户的动作 
       *  wx.xx 等一些API会触发小程序的APP onShow onHide 回调
       *  比如wx.previewImage, wx.chooseImage，实际业务屏蔽这种回调
       *  玛德  真机对createInnerAudioContext无效
       */
      isUserAction: false
    }
    // 创建背景音乐
    const audio = wx.createInnerAudioContext()
    audio.autoplay = true
    audio.loop = true
    audio.src = "https://wulongquan.oss-cn-hangzhou.aliyuncs.com/we/music/canon.mp3"
    audio.play()
    this.globalData.audio = audio
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