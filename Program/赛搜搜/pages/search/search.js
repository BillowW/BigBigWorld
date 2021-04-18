
var app = getApp();

Page({
  data: {
    // 筛选列表的数据
    subjectArray: ['全部', '文学', '化学', '数学', '物理', '医学', '语言', '摄影', '文化教育', '艺术设计', '创新设计', '金融经济', '软件技术' ],
    subjectIndex: 0,

    dateArray: ['全部', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dateIndex: 0,

    levelArray: ['全部', '校级', '省级', '全国性', '全球性'],
    levelIndex: 0,

    subArray: app.globalData.subArray
  },

  onLoad: function() {
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getContestsList',
      complete: res => {
        console.log(res.result)
        res.result.forEach(element => {
          console.log(element)
        });
      }
    });
  },

  // 筛选列表的更改函数
  bindPickerChangeSub: function (e) {
    console.log('启动成功')
    
    //修改选择的数据 
    this.setData({
      subjectIndex: e.detail.value
    })
  },

  bindPickerChangeDate: function (e) {
    console.log('启动成功')
    
    //修改选择的数据 
    this.setData({
      dateIndex: e.detail.value
    })
  }
})
