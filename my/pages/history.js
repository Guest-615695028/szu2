// pages/my/history.js
Page({
  data: {
    goods: [0]
  },
  onLoad(options) {

  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  },
  delete(e) {
	this.data.goods.splice(e.detail, 1), this.setData({ goods: this.data.goods })
  }
})