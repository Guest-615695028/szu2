// pages/tabbar/my.js
Page({
	data: {
		a: [{
			text: "收藏 Favorites",
			bindtap: "favorites"
		},
		{
			text: "历史浏览 Browsing History",
			bindtap: "history"
		},
		{
			text: "交易记录 Exchange History",
			bindtap: "exchange"
		},
		{
			text: "我的商品 My Goods",
			bindtap: "mygoods"
		},
		{
			text: "举报 Report",
			bindtap: "report"
		}
		],
		nickname: "账户 Account",
		uid: wx.getStorageSync('uid')
	},
	onLoad(options) {
		let { uid, token } = wx.getStorageSync("login")
		this.setData({
			avatar: "http://localhost:1102/image?type=user&id=" + uid + "&token=" + token
		})
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
	tap(e) {
		wx.navigateTo({
			url: "/my/pages/" + e.currentTarget.dataset.page
		})
	}
})