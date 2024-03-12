// pages/my/favorites.js
Page({
  data: {
	//按照这个格式扩展
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