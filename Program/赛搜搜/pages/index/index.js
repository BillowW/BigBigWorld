// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popGames: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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