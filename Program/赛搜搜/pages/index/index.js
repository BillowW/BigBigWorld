Page({
  data: {
    // 筛选列表的数据
    subjectArray: ['a', 'b', 'c'],
    subjectIndex: 0,

    dateArray: ['1', '2', '3'],
    dateIndex: 0,

    subArray: [
      {
        name: 'Aa1',
        sub: 'a',
        date: '1',
        mes: 'aa'
      },
      {
        name: 'Bb2',
        sub: 'b',
        date: '2',
        mes: 'bb'
      },
      {
        name: 'Cc3',
        sub: 'c',
        date: '3',
        mes: 'cc'
      },
      {
        name: 'Da1',
        sub: 'a',
        date: '1',
        mes: 'dd'
      },
      {
        name: 'Eb2',
        sub: 'b',
        date: '2',
        mes: 'ee'
      },
      {
        name: 'Fc3',
        sub: 'c',
        date: '3',
        mes: 'ff'
      }
    ]
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
