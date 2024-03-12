// pages/register.js
let fsm = wx.getFileSystemManager()
Page({
  data: {
    birthday: '1983-09-27',
    genders: ['保密/X', '男/M', '女/F'],
    avatar: 'http://localhost:1102/image?type=avatar.png',
    form: [
      ['昵称 Nickname', 'nickname', '格式同微信昵称 Formatted as WeChat',
        'name', 'next', 20
      ],
      ['学号 Student ID', 'number', '用于校园网认证 For in-university authentication',
        'sid', 'next', 10
      ],
      ['手机号 Phone Number', 'number', '仅支持国内手机号 Only +86 supported',
        'phone', 'next', 11
      ],
      ['邮箱 Mail', 'text', '默认校园网邮箱 Use school mailbox as default',
        'mail', 'next', 80
      ],
      ['个性签名 Signature', 'text', '用分号隔开 Break with semicolon(s)',
        'sign', 'next', 80
      ]
    ],
    recv: [],
    campuses: ['粤海校区', '丽湖校区'],
  },
  onLoad(options) {
    let page = this
    wx.getUserInfo({
      success(res) {
        page.setData(res.userInfo)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onShow() { },
  avatar(e) {
    this.setData({
      avatar: e.detail.avatarUrl
    })
    this.onShow()
  },
  setBirthday(e) {
    console.log('Birthday: ', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  exit(e) {
    console.log(e)
    this.setData({ addingRecv: Number(e.currentTarget.dataset.add), })
  },
  addAddress(e) {
    let recv = this.data.recv,
      n = e.currentTarget.dataset.index
    if (n >= 0) {
      recv.splice(n, 1)
    } else {
      let r = e.detail.value.region,
        a = this.data.value ? this.data.campuses[r] :
          r[0] + (r[0] === r[1] ? '' : r[1]) + r[2],
        b = e.detail.value.addr.trim()
      if (b) recv.push(a + b), recv.sort()
      else return wx.showToast({
        title: '请完善地址',
        icon: 'error',
      })
    }
    this.setData({
      addingRecv: 0,
      recv,
      value: null
    })
  },
  switching(e) {
    this.setData({
      value: e.detail.value,
      region: null
    })
  },
  changeRegion(e) {
    this.setData({
      region: e.detail.value
    })
  },
  submit(e) {
    let v = e.detail.value,
      that = this;
    if (!(v.name = v.name.trim())) {
      return wx.showToast({
        title: '昵称不能为空',
        icon: 'error',
      })
    } else if (v.sid.length !== 10 || !/[0-9]{10}/.test(v.sid)) {
      //Student ID
      return wx.showToast({
        title: '学号不正确',
        icon: 'error',
      })
    } else if (v.phone.length !== 11 || !/1[3-9][0-9]{9}/.test(v.phone)) {
      //Phone Number 1XX-XXXX-XXXX
      return wx.showToast({
        title: '手机号不正确',
        icon: 'error',
      })
    } else if (v.pwd.length < 8 || v.pwd.length >= 32
      || v.pwd !== v.cfrm || !/[!-~]+/.test(v.pwd)
      || v.pwd.toLowerCase() === v.name.toLowerCase()
    ) {
      return wx.showToast({
        title: '密码不正确',
        icon: 'error',
      })
    }
    let m = v.mail.trim()
    if (m) {
      v.mail = m.toLowerCase()
      let l = v.mail.split('@')
      if (l.length != 2 ||
        !/[\w-.]+/.test(l[0]) ||
        !/([a-z0-9]+[-.])*[a-z0-9]+\.[a-z]+/.test(l[1])
      ) return wx.showToast({
        title: '邮箱不正确',
        icon: 'error',
      })
    } else v.mail = v.sid + '@email.szu.edu.cn'
    let filePath = this.data.avatar,
      recv = JSON.stringify(this.data.recv)
    wx.uploadFile({
      url: 'http://localhost:1102/register',
      filePath,
      name: 'avatar',
      formData: { recv, ...v },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(e) {
        return e.statusCode < 400 ? wx.reLaunch({
          url: `tabbar/home?uid=${v.sid}&token=${e.data}`
        }) : wx.showToast({
          title: e.data,
          icon: 'error',
        })
      },
      fail() {
        return wx.showToast({
          title: '连接失败',
          icon: 'error',
        })
      },
      complete: (e) => console.log(e)
    })
  },
  reset() {
    this.setData({
      recv: []
    })
  },
  cancel() {
    wx.navigateBack()
  }
})