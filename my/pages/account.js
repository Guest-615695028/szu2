// pages/my/account.js
function countAge(a) {
	let date = new Date(a),
		now = new Date(),
		n = now.getFullYear() - date.getFullYear()
	date.setFullYear(now.getFullYear())
	return n - (date > now)
}
Page({
	data: {
		birthday: "YYYYMMDD",
		genders: ["保密/X", "男/M", "女/F"],
		campuses: ["粤海校区", "丽湖校区"],
		avatar: "",
		recv: [],
		p: {
			Name: {
				name: "昵称 Nickname",
				type: "text",
				max: 20,
				ver: 0
			},
			SID: {
				name: "学号 Student ID",
				type: "number",
				max: 10,
				ver: 1
			},
			Phone: {
				name: "手机号 Phone Number",
				type: "text",
				max: 11,
				ver: 1
			},
			Mail: {
				name: "邮件 E-mail",
				type: "text",
				max: 140,
				ver: 1
			},
			Sign: {
				name: "个性签名 Signature",
				type: "text",
				max: 85,
				ver: 0
			}
		},
		values: {},
		password: [
			{ zh: "旧密码", en: "Old", type: "next" },
			{ zh: "新密码", en: "New", type: "next" },
			{ zh: "确认密码", en: "Confirm", type: "next" },
		],
	},
	onLoad(options) {
		let that = this, { uid, token } = wx.getStorageSync("login")
		this.setData({ uid, token, avatar: "http://localhost:1102/image?type=user&id=" + uid })
		wx.request({
			url: "http://localhost:1102/account",
			enableHttp2: true,
			data: { uid, token },
			success(res) {
				if (res.statusCode < 400) {
					let d = res.data
					for (const key in d) {
						if (typeof (d[key]) === "string") d[key] = d[key].trim()
					}
					that.setData({
						values: d,
						recv: d.Addresses,
						birthday: String(d.Birth).split('T')[0],
						age: countAge(d.Birth)
					})
				} else console.log(res.data)
			}
		})
	},
	onReady() { },
	onShow() { },
	onHide() { },
	onUnload() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	onShareAppMessage() { },
	avatar(e) {
		this.setData({
			avatar: e.detail.avatarUrl
		})
		wx.uploadFile({
			url: "http://localhost:1102/image",
			data: {
				uid: this.data.uid,
				token: this.data.token
			}, filePath: e.detail.avatarUrl,
			name: "avatar"
		})
	},
	tap(e) {
		return this.setData({
			m: e.currentTarget.dataset.n
		})
	},
	exit() {
		return this.setData({
			m: 0
		})
	},
	enter(e) {
		let that = this,
			n = this.data.m + "",
			val = e.detail.value.name + ""
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			mask: true
		})
		return wx.request({
			url: "http://localhost:1102/account",
			enableHttp2: true,
			method: "PUT",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				uid: this.data.uid,
				token: this.data.token,
				req: n.toLowerCase(),
				val
			},
			timeout: 1500,
			complete() {
				that.setData({
					m: 0
				})
			},
			success() {
				wx.showToast({
					title: "修改完毕",
					icon: "success"
				})
				that.setData({
					["values." + n]: val,
				})
			},
			fail() {
				wx.showToast({
					title: "连接失败",
					icon: "error"
				})
			}
		})
	},
	changeBirthday(e) {
		let that = this,
			uid = this.data.uid
		return wx.request({
			url: "http://localhost:1102/account",
			enableHttp2: true,
			method: "PUT",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				uid: this.data.uid,
				token: this.data.token,
				req: "birth",
				val: e.detail.value
			},
			success() {
				that.setData({
					birthday: e.detail.value,
					age: countAge(e.detail.value)
				})
			}
		})
	},
	changeGender(e) {
		let uid = this.data.uid
		return wx.request({
			url: "http://localhost:1102/account",
			method: "PUT",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				uid: this.data.uid,
				token: this.data.token,
				req: "gender",
				val: e.detail.value
			},
		})
	},
	changePassword(e) {
		let v = e.detail.value,
			data = this.data
		if (v[1] !== v[2]) return wx.showToast({
			title: '密码不一致',
			icon: 'error'
		})
		else if (v[1].length < 8) return wx.showToast({
			title: '密码太短',
			icon: 'error'
		})
		else return wx.request({
			url: "http://localhost:1102/account",
			enableHttp2: true,
			method: "POST",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				uid: this.data.uid,
				token: this.data.token,
				req: "password",
				old: v[0],
				new: v[1]
			}
		})
	},
	changeRegion(e) {
		this.setData({
			region: e.detail.value
		})
	},
	switching(e) {
		this.setData(e.detail)
	},
	addAddress(e) {
		let recv = this.data.recv,
			uid = this.data.uid,
			n = e.currentTarget.dataset.index,
			that = this
		if (n >= 0) {
			recv.splice(n, 1)
			that.setData({
				addingRecv: 0,
				recv,
				m: 0,
				value: null
			})
			wx.request({
				url: "http://localhost:1102/account",
				enableHttp2: true,
				method: "PUT",
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: {
					uid: this.data.uid,
					token: this.data.token,
					req: "addrs",
					val: JSON.stringify(recv)
				}
			})
		} else {
			let r = e.detail.value.region,
				a = this.data.value ? this.data.campuses[r] : r[0] + (r[0] === r[1] ? '' : r[1]) + r[2],
				b = e.detail.value.addr.trim()
			if (b) {
				recv.push(a + b), recv.sort()
				wx.request({
					url: "http://localhost:1102/account",
					enableHttp2: true,
					method: "PUT",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						uid: this.data.uid,
						token: this.data.token,
						req: "addrs",
						val: JSON.stringify(recv)
					},
					success(res) {
						console.log(res.data)
					}
				})
			} else return wx.showToast({
				title: '请完善地址',
				icon: 'error',
			})
		}
	},
	deleteAccount() {
		let data = this.data
		wx.showModal({
			title: "提示 Notice",
			content: "操作不可逆 Irreversible",
			success(res) {
				if (res.confirm) {
					wx.request({
						enableHttp2: true,
						uid: this.data.uid,
						token: this.data.token,
						url: "http://localhost:1102/account",
						method: "DELETE",
						success() {
							return wx.reLaunch({
								url: '/pages/welcome',
							})
						}
					})
				}
			},
		})
	}
})