var app = getApp()

wx.cloud.init({
  traceUser: true
});
const db = wx.cloud.database();

Page({
    data: {
        openid: null,
        viewed: 0,
        stars: 0,
    },

    onLoad: function() {
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
    },

    onShow: function() {
      // 获取viewed & stars
      this.getView_star();
    },

    // 获取浏览量和标星量
    getView_star: function () {
      const that = this;

     db.collection('users').where({
       _openid: app.globalData.openid,
     }).get({
       success:  function(res) {
         // 要注意！这里是一个异步传输!!
         that.setData({
           viewed: res.data[0].viewed,
           stars: res.data[0].stars,
         });
       }
     });
     this.setData({
       stars: this.data.stars,
       viewed: this.data.viewed,
     })
    }

})