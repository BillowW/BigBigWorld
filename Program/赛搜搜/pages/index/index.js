// pages/recommend/recommend.js
var app = getApp();
wx.cloud.init({
  traceUser: true
 });
 const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    popGames: [],
    like: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserDb();
    console.log(this.data.like)
   
  },

  // 获取用户数据
  getUserDb: function() {
    const that = this;
    db.collection('users').where({
      _openid: app.globalData.openid,
    }).get({
      success:  function(res) {
        console.log(res)
        that.setData({
          like: res.data[0].like,
        });
        that.init()
      }
    });
},

init:function () {
  console.log(this.data.like)
   // 调用云函数
   wx.cloud.callFunction({
    name: 'getBest',
    data: {
      type: this.data.like,
    },
    complete: res => {
      console.log(res)
    }
  });
},

  // 获取所有数据
  getData: function () {
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getContestsList',
      complete: res => {
        this.getPopData(res.result)
      }
    });
  },

  // 在所有数据中，选出最受欢迎的前五个
  getPopData: function (res) {
    let popDataList = res;
    let popGames = [];
    let temp = 0;

    // 冒泡排序
    for (let i = popDataList.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if(popDataList[j].关注人数 > popDataList[j+1].关注人数) {
          temp = popDataList[j];
          popDataList[j] = popDataList[j+1];
          popDataList[j+1] = temp;
        }
      }
    }
    
    // 选取前五个保存
    for (let index = 0; index < 5; index++) {
      popGames[index] = [popDataList[popDataList.length-1-index]._id, popDataList[popDataList.length-1-index].type[0], popDataList[popDataList.length-1-index].title];
      this.setData({
        popGames: popGames,
      })
    }
    console.log(this.data.popGames)

  }
})