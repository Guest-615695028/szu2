// home/pages/search.js
Page({
	data: {},
	onLoad(options) { },
	onReady() { },
	onShow() { },
	onHide() { },
	onUnload() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	onShareAppMessage() { },
	confirm(e) {
		let that = this
		wx.request({
			url: "http://localhost:1102/search",
			enableHttp2: true,
			data: { q: e.detail.value, ...wx.getStorageSync("login") },
			method: "GET",
			success(res) {
				console.log(res)
				that.setData({ gid: res.data })
			}
		})
	}
})