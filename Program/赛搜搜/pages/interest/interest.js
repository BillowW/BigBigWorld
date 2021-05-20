// pages/interest/interest.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    interestList: ["文学", "医学", "艺术学", "理学", "工学", "文化教育学", "经济学"],
    dataLength: 0,
    maxLength: 3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 筛选列表的更改函数
  bindPickerAddIntere: function (e) {
    // 检查like数组中是否已存在当前点击内容
    if (app.globalData.userLike.indexOf(e.currentTarget.dataset.text) == -1) {
      // 不存在则添加or更新
      // 检查like数是否大于三，小于三则直接添加，否则更新
      if (this.data.dataLength < this.data.maxLength) {
        this.setData({
          dataLength: this.data.dataLength + 1,
        });
        app.globalData.userLike.push(e.currentTarget.dataset.text);
      } else {
        app.globalData.userLike.shift();
        app.globalData.userLike.push(e.currentTarget.dataset.text);
      }
    } else {
      // 存在则删除
      this.setData({
        dataLength: this.data.dataLength - 1,
      });
      let i = app.globalData.userLike.indexOf(e.currentTarget.dataset.text)
      app.globalData.userLike.splice(i,1);
    }
  },
})