// pages/detail/detail.js

var  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    host: "",
    level: "",
    title: "",
    type: [],
    stars: 0,
    views: "",
    mes: "",
    time: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getContestById',
      data: {
        id: "5b00f9706075241507769e774b32911e",
      },
      complete: res => {
        this.setData({
          host: res.result.host,
          level: res.result.level,
          title: res.result.title,
          starts: res.result.关注人数,
          time: res.result.比赛开始时间,
          views: res.result.浏览量,
          mes: res.result.竞赛信息,
        })
      }
    })
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

  }
})