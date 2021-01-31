Page({
  data: {
    // 筛选列表的数据
    subjectArray: ['计算机', '英语', '中文', '管理'],
    objectSubjectArray: [
      {
        id: 0,
        name: '计算机'
      },
      {
        id: 1,
        name: '英语'
      },
      {
        id: 2,
        name: '中文'
      },
      {
        id: 3,
        name: '管理'
      }
    ],
    subjectIndex: 0,
    positionArray: ['广东', '北京', '江苏', '浙江'],
    objectPositionArray: [
        {
          id: 0,
          name: '广东'
        },
        {
          id: 1,
          name: '北京'
        },
        {
          id: 2,
          name: '江苏'
        },
        {
          id: 3,
          name: '浙江'
        }
    ],
    positionIndex: 0,
    dateArray: ['一月', '二月', '三月'],
    objectDateArray: [
      {
        id: 0,
        name: '一月'
      },
      {
        id: 1,
        name: '二月'
      },
      {
        id: 2,
        name: '三月'
      }
    ],
    dateIndex: 0
  },

  // 筛选列表的更改函数
  bindPickerChange: function (e) {
    console.log('启动成功')
    
    //修改选择的数据 
    this.setData({
      subjectIndex: e.detail.value
    })
  }
})
