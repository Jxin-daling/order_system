const fetch = require('../../utils/fetch')
Page({
  data:{
    listData:{}
  },

  // 获取数据
  onLoad(){
    wx.showLoading({
      title: '正在加载中...',
    })

    fetch('food/index').then((res)=>{
      wx.hideLoading()
      this.setData({
        listData:res.data
      })
    }).catch(()=>{
      wx.hideLoading()
    })
  }
})