const fetch = require('../../utils/fetch')

Page({
  data:{
    listData:''
  },

  onLoad(){
    wx.showLoading({
      title: '正在加载中'
    })

    fetch('food/record').then((res)=>{
      this.setData({
        listData:res.data
      })
      wx.hideLoading()
    })
  }
})