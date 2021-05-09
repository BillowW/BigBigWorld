// app.js
App({

  globalData: {
    openid: null,
    userDataId: "",
  },

  onLaunch() {
    wx.cloud.init({
      traceUser: true
    });

    // 调用云函数获取openid
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        this.globalData.openid = res.result.openid
      }
    });

    // 查找数据库是否存在用户id
    // 不存在则插入新用户数据列表
    const users = wx.cloud.database().collection('users');
    users.where({
      "_openid": this.globalData.openid,
    }).get({
      success: function(res) {
        console.log(res)
        if (res.data.length == 0) {
          users.add({
            data: {
              viewed: 0,
              stars: 0,
              like: [],
              viewedList: [],
              starsList: [],
            }
          });
        }
      }
    });

    this.getUserDataId();
  },

  // 获取用户数据库id
  getUserDataId: function() {
    wx.cloud.init({
      traceUser: true
    });

    const db = wx.cloud.database().collection('users');
    const that = this;

    db.where({
      _openid: that.globalData.openid,
    }).get({
      success:  function(res) {
        // 要注意！这里是一个异步传输!!
        that.globalData.userDataId = res.data[0]._id
      }
    });
  }

})
