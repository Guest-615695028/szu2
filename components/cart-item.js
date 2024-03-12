// components/cart-item.js
Component({
	properties: {
		gid: { type: BigInt, value: 0 },
		mode: { type: String, value: "" },
		noflex: { type: Boolean, value: false },
		imgstyle: { type: String, value: "width: 180rpx; height: 120rpx;" },
		safe: { type: Boolean, value: false },
		desc: { type: String, value: "description" },
		number: { type: BigInt, value: 1 }
	},
	data: {
		item: {},
		showModal: false
	},
	observers: {},
	methods: {
		adjust(e) {
			this.triggerEvent("adjust", [e.detail.value, this.data.gid])
		},
		delete() {
			this.setData({ showModal: false })
			this.triggerEvent("delete", this.data.gid)
		},
		showModal() {
			this.setData({ showModal: true })
		},
		hideModal() {
			this.setData({ showModal: false })
		},
		tap() {
			wx.navigateTo({ url: "/commodity/pages/commodity?id=" + this.data.gid })
		},
		edit() {
			wx.navigateTo({ url: "/commodity/pages/edit?id=" + this.data.gid })
		}
	},
	attached() {
		let gid = this.data.gid;
		if (gid > 0 && Number.isSafeInteger(gid)) return wx.request({
			url: "http://localhost:1102/goods?id=" + gid,
			enableHttp2: true,
			success: (res) => this.setData(res.statusCode == 200 ? {
				item: { description: res.data.Info },
				seller: res.data.SID,
				name: res.data.Name,
				max: res.data.Num,
				price: Number(res.data.Price).toFixed(2),
				image: "http://localhost:1102/image?type=goods&id=" + gid,
				buyer: "买家"
			} : {})
		})
	}
})