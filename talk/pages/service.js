// talk/pages/service.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		messages: [],
		memoji: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},
	back() {
		wx.navigateBack()
	},
	input(e) {
		this.setData(e.detail)
	},
	memoji() {
		let memoji = !this.data.memoji
		this.setData({ memoji })
	},
	send() {
		let messages = this.data.messages, value = this.data.value
		messages.push({ value, sender: 0})
		this.setData({ messages, value: "" })
		/*wx.request({
			url: "http://localhost:1102:3306",
			enableHttp2: true,
			data,
			method: "POST"
		})/** */
	}
})