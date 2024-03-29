// home/pages/camera.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		console.log(wx.canIUse("wx.createVKSession"))
		let session = wx.createInferenceSession({
			model: `${wx.env.USER_DATA_PATH}/MNIST.onnx`,
			precisionLevel: 4,
			typicalShape: { input1: [1, 3, 224, 224], input2: [1, 1, 224, 224] },  //除非使用动态轴，一般不用显式指定
			allowNPU: false,
			allowQuantize: false
		})
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
	cameraError() {
		//wx.navigateBack()
	},
	takePhoto() {
		const ctx = wx.createCameraContext()
		ctx.takePhoto({
			quality: 'original',
			success: (res) => {
				console.log(res)
				this.setData({ src: res.tempImagePath })
			}
		})
	}
})