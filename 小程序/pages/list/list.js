const fetch = require('../../utils/fetch')
Page({
  data:{
    listData:'',
    activeIndex:0,
    toView:'toView0'
  },

  // 切换选中样式
  onselect(e){
    let index = e.target.dataset.index
    console.log(e);
    this.setData({
      activeIndex:index,
      toView:'toView'+index
    })
  },

  onLoad(){
    wx.showLoading({
      title: '正在努力加载中',
    })
    fetch('food/list').then((res)=>{
      wx.hideLoading()
      this.setData({
        listData:res
      })
    }).catch(()=>{
      wx.hideLoading()
    })
  }
})