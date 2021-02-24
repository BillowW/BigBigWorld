
var app = getApp();

Page({
    data: {
        subArray: app.globalData.subArray
    },

    onLoad: function() {
        
    },

    onShow: function() {
        this.setData({
            subArray: app.globalData.subArray
        })
    }
})