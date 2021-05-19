// pages/interest/interest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interestList: ["文学", "医学", "艺术学", "理学", "工学", "文化教育学", "经济学"],
    interestIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 筛选列表的更改函数
  bindPickerChangeIntere: function (e) {
  
    //修改选择的数据 
    this.setData({
      interestIndex: e.detail.value
    });
  },
})