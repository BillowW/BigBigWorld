// pages/browRec/browRec.js

var app = getApp();

// 初始化数据库
wx.cloud.init({
  traceUser: true
});
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray: [],
    userId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    // 调用云函数
    wx.cloud.init({
      traceUser: true
    });

     // 获取记录字段，供标星/浏览使用
     const that = this;
     db.collection('users').where({
       _openid: app.globalData.openid,
     }).get({
       success:  function(res) {
         // 要注意！这里是一个异步传输!!
         that.setData({
           userId: res.data[0]._id,
         });
         // 强行同步执行...
         that.getData()
       }
     });
  },

  getData: function() {
    const that = this;
     //  从数据库把记录获取下来
     db.collection('users').where({
      _id: this.data.userId,
    }).get({
      success: function(res) {
        that.setData({
          dataArray: res.data[0].viewedList
        });
      }
    });
  },
  
})