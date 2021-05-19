// pages/detail/detail.js

var  app = getApp();

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
    imgId: "",

    // 浏览状态
    viewed: false,
    stared: false,

    // 用户数据库
    openid: app.globalData.openid,
    dataId: "",
    viewedList: [],
    starsList: [],
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
          imgId: res.result.imageId,
        })
      }
    });

    // 获取记录字段，供标星/浏览使用
    const that = this;
    db.collection('users').where({
      _openid: app.globalData.openid,
    }).get({
      success:  function(res) {
        // 要注意！这里是一个异步传输!!
        that.setData({
          dataId: res.data[0]._id,
        });
        // 强行同步执行...
        that.checkViewed()
      }
    });
    
  },


  // 检查是否已标星并更新数据
  checkStars: function () {
    var that = this;

    //  检查浏览记录是否存在
   //  从数据库把记录获取下来
   db.collection('users').where({
     _id: this.data.dataId,
   }).get({
     success: function(res) {
       that.setData({
         starsList: res.data[0].starsList
       });

       // 更新数据
       that.updateStars()
     }
   });
  },

  // 更新标星数据
  updateStars: function() {
    const _ = db.command;

     // 查看是否存在记录，存在即修改为true
     if(this.data.starsList.indexOf(this.data.id) != -1) {
      this.setData({
        stared:true
      })
    };

    //  未标星过则添加标星
    // !!无法删除
    if(!this.data.stared) {
      this.setData({
        stared: true,
      });

      // 更新用户数据库信息
      db.collection('users').doc(this.data.dataId).update({
        data: {
          stars: _.inc(1),
          starsList: _.push(this.data.id),
        }
      });
    }
    // 数据型数据不便于增删改查！

  },

  // 检查是否已浏览
  checkViewed: function () {
    var that = this;

     //  检查浏览记录是否存在
    //  从数据库把记录获取下来
    db.collection('users').where({
      _id: this.data.dataId,
    }).get({
      success: function(res) {
        that.setData({
          viewedList: res.data[0].viewedList
        });

        // 更新数据
        that.updateViewed()
      }
    });
  },

  // 更新浏览信息
  updateViewed: function () {
     const _ = db.command;

     // 查看是否存在记录，存在即修改为true
     if(this.data.viewedList.indexOf(this.data.id) != -1) {
      this.setData({
        viewed:true
      })
    };

    //  未浏览过
    if(!this.data.viewed) {
      this.setData({
        viewed: true,
      });

      // 更新用户数据库信息
      db.collection('users').doc(this.data.dataId).update({
        data: {
          viewed: _.inc(1),
          viewedList: _.push(this.data.id),
        }
      });
    }
  },
})