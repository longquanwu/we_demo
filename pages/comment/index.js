const page = require('../../framework/page.js')
const comment = require('../../services/comment.js')
const User = require('../../services/user.js')
const Event = require('../../lib/event.js')
const app = getApp()

function createGetUserInfo(msg, showLayer) {
  return ({ detail: { userInfo } }) => { }
}

page({
  data: {
    $pageReady: true,
    $ready: true,
    height: 0,
    videoUrl: {
      'wedding': 'https://wulongquan.oss-cn-hangzhou.aliyuncs.com/we/images/01.mp4'
    },
    // 评论的列表
    list: [],
    // 用户信息
    userInfo: null,
    // 是否显示评论弹窗
    isLayerShow: false,
    showEditMessage: false,
    // 评论
    value: '',
    // 当前评论页数
    pageNum: 1,
  },
  onLoad() {
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        if (wx.getStorageSync('show_edit_message') == 1) {
          this.setData({
            height: windowHeight - 225
          })
        } else {
          this.setData({
            height: windowHeight
          })
        }
      }
    })
    // 获取评论
    this.getComment(1).then(() => {
      // 如果直接进入评论页 评论加载完成 但是信息还未加载完成
      this.setData({
        $pageReady: true
      })
    })

    if (wx.getStorageSync('show_edit_message') == 1) {
      this.setData({
        showEditMessage: true
      })
    }
  },
  onShow() {
    Event.emit('stateChange', {
      isMusicPlay: false
    })

    this.$showLoading('获取评论中...')
    this.getComment(1).then(() => {
      this.$hideLoading()
    })
  },
  // 获取评论信息
  getComment(pageNum) {
    let { list } = this.data
    if (pageNum === 1) {
      list = []
    }
    return comment.getList({ pageNum }).then(res => {
      this.$hideLoading()

      if (res.length) {
        this.setData({
          list: list.concat(res),
          pageNum
        })
      }
    })
  },
  // 滚动到底时
  scrollToLower() {
    wx.showLoading({
      title: '评论加载中...'
    })
    const { pageNum } = this.data

    this.getComment(pageNum + 1)
  },
  // 提交评论
  submit() {
    const { userInfo, value, list } = this.data
    if (!this.validate()) return
    wx.showLoading({
      title: '评论提交中...'
    })
    comment.add(Object.assign({}, userInfo, { comment: value })).then(data => {
      wx.hideLoading({
        success: (res) => {this.getComment(1)},
      })
      this.setData({
        isLayerShow: false
      })
    })
  },
  // 校验评论内容
  validate() {
    const { value } = this.data
    if (!value.replace(/\s/g, '')) {
      this.$hint('Ծ‸Ծ')
      return false
    }
    return true
  },

  // 获取用户信息
  getUserInfo({
    // detail: { userInfo },
    target: {
      dataset: { type }
    }
  }) {
    let msg = '', fn
    const self = this
    msg = 'Ծ‸Ծ'
    fn = this.showLayer

    if (wx.getStorageSync('user_avatar_url') != null && wx.getStorageSync('user_avatar_url') != "") {
      let userInfo = {
        nickName: wx.getStorageSync('user_nickname'),
        avatarUrl: wx.getStorageSync('user_avatar_url')
      }
      self.setData({
        userInfo
      })
      app.globalData.userInfo = userInfo
      fn()
      return
    }

    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '获取头像昵称',
      success({ userInfo }) {
        // 信息保存到服务器
        User.updateUserInfo(userInfo.nickName, userInfo.avatarUrl);
        self.setData({
          userInfo
        })
        app.globalData.userInfo = userInfo
        fn()
      },
      fail() {
        // 没有授权
        self.$hint(msg)
      }
    })
  },

  // layer的开关
  showLayer() {
    this.setData({
      isLayerShow: true
    })
  },
  hideLayer() {
    this.setData({
      isLayerShow: false
    })
  },
  onShareAppMessage() {
    return {
      title: `我们结婚啦💖`,
      path: '/' + this.route
    }
  }
})
