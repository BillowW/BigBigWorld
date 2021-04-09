// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getC();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getC: function () {
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getContestsList',
      complete: res => {
        console.log(res.result)
        for(var i = 0;i < 100; i++){
          wx,wx.showToast({
            title: res.result.data[i].title,
            duration: 0,
            mask: true,
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
          })
        }
      }
    });
    console.log("把yh杀了");
  }
})