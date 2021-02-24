
var app = getApp();

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    subArray: app.globalData.subArray
  },

  search: function(e){
    this.setData({
      searchValue: e.detail.value
    })
  }
})