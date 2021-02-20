// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subArray: [
      {
        name: 'A1',
        sub: 'A2',
        date: 'A3',
        host: 'A4',
        mes: 'aa',
        img: ['/images/bg.jpg','1']
      },
      {
        name: 'B1',
        sub: 'B2',
        date: 'B3',
        mes: 'bb'
      },
      {
        name: 'C1',
        sub: 'C2',
        date: 'C3',
        mes: 'cc'
      },
      {
        name: 'D1',
        sub: 'D2',
        date: 'D3',
        mes: 'dd'
      },
      {
        name: 'E1',
        sub: 'E2',
        date: 'E3',
        mes: 'ee'
      },
      {
        name: 'F1',
        sub: 'F2',
        date: 'F3',
        mes: 'ff'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: options.index
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