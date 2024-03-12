// pages/welcome.js
//import zh from "/src/language/modules/zh";
//import en from "/src/language/modules/en";
Page({
	data: {

	},
	onLoad(options) { },
	onReady() { },
	onShow() { },
	onHide() { },
	onUnload() { },
	onPullDownRefresh() { },
	onReachBottom() { },
	onShareAppMessage() { },
	login() {
		wx.navigateTo({
			url: "login",
			events: {
				acceptDataFromOpenedPage(data) {
					console.log(data)
				}
			}
		})
	},
	register() {
		wx.navigateTo({
			url: "register",
			events: {
				acceptDataFromOpenedPage(data) {
					console.log(data)
				}
			}
		})
	}
})