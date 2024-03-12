// home/pages/add.js
Page({
	data: {
		headers: [
			'名称 Name',
			'描述 Description',
			'地址 Address',
			'商品单价 Unit price',
			'商品数量 Number of goods'
		],
		type: ['text', 'text', 'text', 'digit', 'number'],
		contents: ['', '', ''],
		price: '0.00',
		modify: -1,
		num: 0,
		tempFilePath: ""
	},
	onLoad(options) {
		console.log(wx.getStorageSync('uid'))
	},
	onReady() { },
	onShow() { },
	onHide() { },
	onUnload() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	onShareAppMessage() { },
	setPrice() {
		let that = this
		wx.showModal({
			title: '商品单价 Unit price',
			editable: true,
			placeholderText: '不超过¥9999.99',
			success(res) {
				if (!res.confirm) return
				let p = Number.parseFloat(res.content)
				if (p <= 0 || p != p) return wx.showToast({
					title: '售价无效',
					icon: 'error'
				})
				else if (p >= 10000) return wx.showToast({
					title: '售价过高',
					icon: 'error'
				})
				else that.setData({
					price: p.toFixed(2)
				})
			}
		})
	},
	setNumber() {
		let that = this
		wx.showModal({
			title: '商品数量 Number of goods',
			editable: true,
			placeholderText: '不超过5万件',
			success(res) {
				if (res.confirm) {
					let p = Number.parseInt(res.content)
					if (p <= 0 || p != p || res.content == '.') wx.showToast({
						title: '售价无效',
						icon: 'error'
					});
					else if (p > 50000) wx.showToast({
						title: '售价过高',
						icon: 'error'
					});
					else that.setData({
						num: p
					})
				}
			}
		})
	},
	camera() {
		let that = this
		wx.chooseMedia({
			count: 1,
			mediaType: 'image',
			sourceType: ['album', 'camera'],
			camera: 'back',
			success(res) {
				that.setData(res.tempFiles[0])
			}
		})
	},
	publish(e) {
		let v = e.detail.value,
			that = this,
			price = Number(v[3]),
			num = Number(v[4]),
			{ uid, token } = wx.getStorageSync("login")
		if (!v[0]) {
			wx.showToast({
				title: '请填写名称',
				icon: 'error'
			})
		} else if (!v[2]) {
			wx.showToast({
				title: '请填写地址',
				icon: 'error'
			})
		} else if (!(price > 0 && price < 10000)) {
			wx.showToast({
				title: '请填写价格',
				icon: 'error'
			})
		} else if (num == 0) {
			wx.showToast({
				title: '请填写数量',
				icon: 'error'
			})
		} else {
			console.log(v)
			wx.uploadFile({
				filePath: this.data.tempFilePath,
				name: "picture",
				url: "http://localhost:1102/goods",
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				formData: {
					name: v[0],
					info: v[1] ? v[1] : v[0],
					addr: v[2],
					sid: uid,
					token, num, price
				},
				success(res) {
					switch (res.statusCode) {
						case 200: wx.navigateBack()
						case 401: wx.reLaunch({ url: '/pages/welcome.js' })
						default: that.setData({ errMsg: res.data })
					}
				},
				fail(res) {
					console.log(res)
				}
			})
		}
	}
})