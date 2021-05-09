Page({
  data: {
    // 筛选列表的数据
    subjectArray: ['全部','数学建模', '程序设计', '机器人', '工程机械', '土木建筑', '大数据', '交通车辆', '航空航天', '船舶海洋', '环境能源', '计算机&信息技术', '材料高分子', '电子&自动化', '工业&创意设计', '外语', '演讲主持&辩论', '模特', '歌舞书画&摄影', '体育', '科技文化艺术节', 'UI设计', '服装设计', '电子竞技', '数学', '物理', '化学化工', '健康生命&医学', '力学', '职业技能', '挑战杯', '环保公益', '社会综合', '创业', '商业', '创青春'],
    subjectIndex: 0,
    sub: undefined,

    dateArray: ['全部', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dateIndex: 0,
    date: undefined,

    levelArray: ['全部', '校级', '省级', '全国性', '全球性'],
    levelIndex: 0,
    level: undefined,

    id: "",
    dataArray: []
  },

  onLoad: function() {
    this.getData()
  },
  

  // 筛选列表的更改函数
  bindPickerChangeSub: function (e) {
    
    //修改选择的数据 
    this.setData({
      subjectIndex: e.detail.value
    });
    this.getData()
  },

  bindPickerChangeDate: function (e) {
    
    //修改选择的数据 
    this.setData({
      dateIndex: e.detail.value
    });
    this.getData()
  },

  bindPickerChangeLevel: function (e) {
    this.setData({
      levelIndex: e.detail.value
    });
    this.getData()
  },

  // 分析筛选条件
  getData: function () {
    this.setData({
      sub: undefined,
      date: undefined,
      level: undefined
    });
    if (this.data.subjectIndex != 0) {
      this.setData({
        sub: this.data.subjectArray[this.data.subjectIndex]
      })
    };

    if (this.data.dateIndex != 0) {
      this.setData({
        date: this.data.dateArray[this.data.dateIndex]
      })
    };

    if (this.data.levelIndex != 0) {
      this.setData({
        level: this.data.levelArray[this.data.levelIndex]
      })
    }

    // 调用云函数
    wx.cloud.init({
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'getContests',
      data: {
        mon: this.data.date,
        type: this.data.sub,
        level:this.data.level
      },
      complete: res => {
        this.setData({
          dataArray: res.result
        });
      }
    })
  },
})
