// pages/commodity/commodity.js

function addzero(x, n) {
	let y = String(x)
	while (y.length < n) y = '0' + y
	return y
}
Page({
	data: {
		comments: [],
		commenting: 0,
	},
	onLoad(options) {
		let id = options.id, that = this
		this.setData(Object.assign(options,wx.getStorageSync("login")))
		wx.request({
			url: "http://localhost:1102/goods?id=" + id,
			enableHttp2: true,
			success(res) {
				that.setData({
					seller: res.data.SID,
					name: res.data.Name,
					description: res.data.Info,
					max: res.data.Num,
					price: res.data.Price.toFixed(2),
					image: "http://localhost:1102/image?type=goods&id=" + id,
				})
				wx.request({
					enableHttp2: true,
					url: "http://localhost:1102/comments?gid=" + id,
					success(res) {
						console.log(res.data)
					}
				})
			}
		})
	},
	onReady() { },
	onShow() { },
	onHide() { },
	onUnload() {
		let data = this.data
		wx.setStorageSync("history", data.id)
	},
	onPullDownRefresh() { },
	onReachBottom() { },
	onShareAppMessage() { },
	addToFavorites(e) {
		console.log(e)
	},
	addToCart(e) {
		this.setData({ commenting: 0 })
		if (e.type != "submit" || !e.detail.value.num) return
		let data = this.data
		wx.request({
			url: `http://localhost:1102/cart?gid=${data.id}&uid=${data.uid}
			&num=${e.detail.value.num}`,
			enableHttp2: true,
			method: "PUT",
			header: { "Content-Type": "application/x-www-form-urlencoded" },
			data: {
				gid: data.id,
				uid: data.uid,
				num: "num+"+e.detail.value.num,
				token: data.token,
			},
			success(e) {
				console.log(e.data)
			}
		})
	},
	buyNow(e) {
		this.setData({ commenting: 0 })
		//console.log(e)
	},
	comment(e) {
		this.setData({ commenting: e.currentTarget.dataset.type })
	},
	uncomment(e) {
		this.setData({ commenting: 0 })
		if (e.type != "submit" || !e.detail.value.question) return
		let data = this.data
		wx.request({
			url: "http://localhost:1102/comments",
			data: {
				gid: data.id,
				oid: 0,
				uid: data.uid,
				content: e.detail.value.question,
				token: data.token,
			},
			enableHttp2: true,
			method: "POST",
			success(res) {
				console.log(res)
			}
		})
	}
})