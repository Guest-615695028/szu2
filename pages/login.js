// pages/login.js
Page({
	data: {

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
	forgot(e) {
		wx.navigateTo({
			url: '/pages/forgot',
		})
	},
	submit(e) {
		let v = e.detail.value
		wx.getSetting({
			success(res) {
				if (!res.authSetting['scope.userInfo']) {
					wx.authorize({
						scope: 'scope.userInfo',
						success() {
						}
					})
				}
			}
		})
		if (v.user.length != 10) {
			wx.showToast({
				title: '学号格式错误',
				icon: 'error',
			})
		} else if (v.pwd.length < 8) {
			wx.showToast({
				title: '密码格式错误',
				icon: 'error',
			})
		} else {
			wx.request({
				url: "http://localhost:1102/login",
				enableHttp2: true,
				data: v,
				success(e) {
					if (e.statusCode < 400) {
								wx.reLaunch({ url: `tabbar/home?uid=${v.user}&token=${e.data}` })
					} else {
						wx.showToast({
							title: e.data,
							icon: 'error'
						})
					}
				},
				fail(e) {
					e = this
					wx.showToast({
						title: "连接失败",
						icon: 'error',
					})
				}
			})
		}
	},
	reset() {
		console.log('Reset')
	},
	cancel() {
		wx.navigateBack()
	}
})