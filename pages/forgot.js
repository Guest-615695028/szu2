// pages/forgot.js
Page({

	/**
	 * Page initial data
	 */
	data: {

	},

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad(options) {

	},

	/**
	 * Lifecycle function--Called when page is initially rendered
	 */
	onReady() {

	},

	/**
	 * Lifecycle function--Called when page show
	 */
	onShow() {

	},

	/**
	 * Lifecycle function--Called when page hide
	 */
	onHide() {

	},

	/**
	 * Lifecycle function--Called when page unload
	 */
	onUnload() {

	},

	/**
	 * Page event handler function--Called when user drop down
	 */
	onPullDownRefresh() {

	},

	/**
	 * Called when page reach bottom
	 */
	onReachBottom() {

	},

	/**
	 * Called when user click on the top right corner to share
	 */
	onShareAppMessage() {
		wx.showModal({
			title: '忘记密码 Forget your password?',
			editable: true,
			placeholderText: '请输入学号 Please enter your SID',
			success(res) {
				if (res.confirm) return wx.request({
					url: "http://www1.szu.edu.cn",
					enableHttp2: true,
					data: {
						username: res.content,
						password: res.content
					},
					success(res) {
						console.log(res)
					}
				})
			}
		})
	},
	cancel() {
		return wx.navigateBack()
	}
})