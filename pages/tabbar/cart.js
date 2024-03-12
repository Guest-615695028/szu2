// pages/tabbar/cart.js
Page({
	data: {
		goods: [],
		totalPrice: 0,
	},
	onLoad(options) {
		let that = this
		wx.getStorage({
			key: "login",
			success(res) {
				let { uid, token } = res.data
				if (uid && token) {
					that.setData({ uid, token })
					wx.request({
						url: "http://localhost:1102/cart",
						enableHttp2: true,
						data: res.data,
						success(ret) {
							if (ret.statusCode>=400) return
							that.setData({ goods: ret.data })
							let x = 0
							for (let a in ret.data) {
								let { Num, Price } = ret.data[a]
								x += Num * Price
							}
							that.setData({ totalPrice: x.toFixed(2) })
						}
					})
				}// else wx.reLaunch({ url: '/pages/welcome' })
			},
			fail() {
				wx.reLaunch({ url: '/pages/welcome' })
			}
		})
	},
	onReady() { },
	onShow() { console.log(this.data.goods.length)},
	onHide() { },
	onUnload() { },
	onPullDownRefresh() { this.onLoad({}) },
	onReachBottom() { },
	onShareAppMessage() { },
	adjust(e) {
		let goods = this.data.goods, p = 0, i = -1, [num, gid] = e.detail
		for (let a in goods) {
			let { GID, Num, Price } = goods[a]
			if (GID == gid) i = a, Num = num
			p += Num * Price
		}
		if (i < 0) return
		this.setData({
			["goods[" + i + "].Num"]: num,
			totalPrice: p.toFixed(2)
		})
		let { uid, token } = wx.getStorageSync("login")
		wx.request({
			url: "http://localhost:1102/cart",
			enableHttp2: true,
			method: "PUT",
			data: {
				uid, token, gid, num,
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success(res) {
				console.log(res.data)
			}
		})
	}
})