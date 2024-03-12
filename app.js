App({
  onLaunch (options) {
	wx.cloud.init()
    wx.cloud.callContainer({
      "config": {
        "env": "prod-7g5cb9imf4f6d175"
      },
      "path": "/api/count",
      "header": {
        "X-WX-SERVICE": "express-e5kr"
      },
      "method": "POST",
      "data": {
        "action": "inc"
      }
    })
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
	// Do something when hide.
  },
  onError (msg) {
  },
  onPageNotFound(object) {
    wx.redirectTo({
        url: 'pages/errors/404'
      })
  },
  data: 'I am global data'
})