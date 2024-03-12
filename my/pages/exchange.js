// pages/my/exchange.js
Page({
	data: {
		mode: false,
		recordSold: [1],
		recordBought: [0]
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
	sold() {
		this.setData({ mode: false })
	},
	bought() {
		this.setData({ mode: true })
	},
	delete(e) {
		let x = this.data.mode, a = x ? this.data.recordBought : this.data.recordSold
		a.splice(e.detail, 1), this.setData({ [x ? "recordBought" : "recordSold"]: a })
	}
})