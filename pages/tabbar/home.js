// pages/home.js
function range(n) {
	let res = []
	for (let i = 1; i <= n; ++i) res.push(i)
	return res
}
Page({
	data: {
		gid: range(10),
		reachedBottom: false,
		search: false,
	},
	onLoad(options) {
		this.setData(options)
		wx.setStorage({key: "login", data: options})
		for (let i=0; i<10; ++i) this.data.gid.push(Math.random())
		this.setData({gid: this.data.gid})
	},
	onReady() {
	},
	onShow() {
		wx.getStorage({
			key: "login",
			success(e) {
				if (!e.data.uid || !e.data.token) wx.reLaunch({ url: '/pages/welcome'})
			},
			fail() {
				wx.reLaunch({ url: '/pages/welcome'})
			}
		})
	},
	onHide() { },
	onUnload() { },
	onPullDownRefresh() { },
	onReachBottom() {
		for (let i=0; i<10; ++i) this.data.gid.push(Math.random())
		this.setData({gid: this.data.gid})
	},
	onShareAppMessage() { },
	add() {
		wx.navigateTo({ url: '/home/pages/add?uid=' + this.data.uid })
	},
	camera() {
		wx.navigateTo({ url: '/home/pages/camera' })
	},
	search() {
		wx.navigateTo({ url: '/home/pages/search' })
	}
})