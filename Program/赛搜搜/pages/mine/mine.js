var app = getApp()

Page({
    data: {
        openid: null,
        viewed: 0,
        stars: 0,
    },

    onLoad: function() {
        wx.cloud.init({
            traceUser: true
          });

          this.setData({
            openid: app.globalData.openid,
          })
          
          // 获取用户信息
          var that = this;
          wx.getSetting({
            withSubscriptions: true,
            success(res) {
              if(res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function(res) {
                    console.log(res.userInfo)
                    that.setData({
                      result: 'ok',
                      nickName: res.userInfo.nickName,
                      avatarUrl: res.userInfo.avatarUrl,
                    })
                  }
                })
              } else {
                that.setData({
                  result: 'null',
                })
              }
            }
          });

          // 获取viewed & stars
    },

    // 获取浏览量和标星量
    getView: function () {
      wx.cloud.init({
        traceUser: true
      });
      const db = wx.cloud.database().collection('users');
    }

})