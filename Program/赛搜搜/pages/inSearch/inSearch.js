
var app = getApp();

// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    subArray: app.globalData.subArray,
    interestList: ['数学建模', '程序设计', '机器人', '工程机械', '土木建筑',
      '大数据', '交通车辆', '航空航天', '船舶海洋', '环境能源', '计算机&信息技术',
      '材料高分子', '电子&自动化', '工业&创意设计', '外语', '演讲主持&辩论', '模特',
      '歌舞书画&摄影', '体育', '科技文化艺术节', 'UI设计', '服装设计', '电子竞技',
      '数学', '物理', '化学化工', '健康生命&医学', '力学', '职业技能', '挑战杯',
      '环保公益', '社会综合', '创业', '商业', '创青春'],
  },

  search: function(e){
    this.setData({
      searchValue: e.detail.value
    })
  }
})