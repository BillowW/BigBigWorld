// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    isTrue: false,
    subArray: [
      {
        name: 'Aa',
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

  search: function(e){
    this.setData({
      searchValue: e.detail.value
    })
  }
})