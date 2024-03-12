
Component({
	properties: {
		safe: Boolean
	},
	ready() {
		wx.createSelectorQuery().in(this).select('.dialog').boundingClientRect(
			(res) => this.setData(res)
		).exec()
	}
})
