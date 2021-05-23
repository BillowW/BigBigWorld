// pages/interest/interest.js
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
    interestList: ['数学建模', '程序设计', '机器人', '工程机械', '土木建筑',
      '大数据', '交通车辆', '航空航天', '船舶海洋', '环境能源', '计算机&信息技术',
      '材料高分子', '电子&自动化', '工业&创意设计', '外语', '演讲主持&辩论', '模特',
      '歌舞书画&摄影', '体育', '科技文化艺术节', 'UI设计', '服装设计', '电子竞技',
      '数学', '物理', '化学化工', '健康生命&医学', '力学', '职业技能', '挑战杯',
      '环保公益', '社会综合', '创业', '商业', '创青春'],
    dataLength: 0,
    maxLength: 3,
    userId: "",
    like: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户数据库字段
    this.getUserDb();
  },

  // 获取用户数据库
  getUserDb: function() {
        const that = this;
        db.collection('users').where({
          _openid: app.globalData.openid,
        }).get({
          success:  function(res) {
            that.setData({
              userId: res.data[0]._id,
              like: res.data[0].like,
              dataLength: that.data.like.length,
            });
          }
        });
  },

  // 筛选列表的更改函数
  bindPickerAddIntere: function (e) {
    if (this.data.like == null) {

    }

    // 检查like数组中是否已存在当前点击内容
    else if (this.data.like.indexOf(e.currentTarget.dataset.text) == -1) {
      // 不存在则添加or更新
      // 检查like数是否大于三，小于三则直接添加，否则更新
      if (this.data.dataLength < this.data.maxLength) {
        this.setData({
          dataLength: this.data.dataLength + 1,
        });
        this.data.like.push(e.currentTarget.dataset.text);
      } else {
        this.data.like.shift();
        this.data.like.push(e.currentTarget.dataset.text);
      }
    } else {
      // 存在则删除
      this.setData({
        dataLength: this.data.dataLength - 1,
      });
      let i = this.data.like.indexOf(e.currentTarget.dataset.text)
      this.data.like.splice(i,1);
    };

    // 更新用户数据库
    this.updateUserDb();
  },

  // 更新数据库
  updateUserDb: function () {
    db.collection('users').doc(this.data.userId).update({
      data: {
        like: this.data.like,
      }
    });
  }
})