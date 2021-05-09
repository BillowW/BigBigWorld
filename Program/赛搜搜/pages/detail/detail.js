// pages/detail/detail.js

var  app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 渲染数据的内容
    id: "",
    host: "",
    level: "",
    title: "",
    type: [],
    intereNum: 0,
    views: "",
    mes: "",
    time: "",

    // 浏览状态
    viewed: false,
    stared: false,

    // 用户数据库
    openid: app.globalData.openid,
    dataId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (id) {
    this.setData({
      // 接受传入的内容id
      id: id.id,
    });   

    // 调用云函数
    wx.cloud.init({
      traceUser: true
    });

    // 通过传入的ID获取比赛具体数据
    wx.cloud.callFunction({
      name: 'getContestById',
      data: {
        id: id.id,
      },
      complete: res => {
        this.setData({
          host: res.result.host,
          level: res.result.level,
          title: res.result.title,
          intereNum: res.result.关注人数,
          time: res.result.比赛开始时间,
          views: res.result.浏览量,
          mes: res.result.竞赛信息,
        })
      }
    });

    // 获取记录字段，供标星/浏览使用
    const users = wx.cloud.database().collection('users');
    const that = this;
    users.where({
      _openid: app.globalData.openid,
    }).get({
      success:  function(res) {
        // 要注意！这里是一个异步传输!!
        that.setData({
          dataId: res.data[0]._id,
        });
        // 异步改同步
        that.init()
      }
    });

    
    
  },
  

  // 同步函数写在里面
  init:function(){
    // 根据用户数据库更新页面
    this.checkViewed()
  },


  // 检查是否已标星,并执行操作
  checkStars: function () {
    wx.cloud.init({
      traceUser: true
     });
     const db = wx.cloud.database().collection('users');

    // 1.检查stared
    if (this.data.stared == 0) {
      this.setData({
        stared: true,
      });


      // 更新用户数据库
      db.doc(this.data.dataId).update({
        data: {
          stars: stars + 1,
          starsedList: _.push(this.data.id),
        }
      })
    } else {
      this.setData({
        stared: false,
      });

      db.doc(this.data.dataId).update({
        data: {
          stars: stars - 1,
          starsList: _.pop(),
        }
      })
    }
  },


  // 检查是否已浏览
  checkViewed: function () {
    var that = this;
    // 初始化数据库
    wx.cloud.init({
      traceUser: true
     });
     const db = wx.cloud.database();
     
     //  检查浏览记录是否存在
    db.collection('users').where({
      viewedList: this.data.id,
    }).get({
      success: function(res) {
        that.setData({
          viewed: true,
        });
        console.log(that.data.viewed)
        that.updateViewed();
      }
    })
  },


  // 更新浏览信息
  updateViewed: function () {
    // 初始化数据库
    wx.cloud.init({
      traceUser: true
     });
     const db = wx.cloud.database();
     const _ = db.command;

     console.log(this.data.viewed)
    //  未浏览过
    if(!this.data.viewed) {
      this.setData({
        viewed: true,
      });

      db.collection('users').doc(this.data.dataId).update({
        data: {
          viewed: _.inc(1),
          viewedList: _.push(this.data.id),
        }
      });
    }
  },
})