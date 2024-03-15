const fetch = require('../../../utils/fetch')

Page({
  data:{
    orderlist:[],
    is_last:false  //判断下拉是否完成
  },

  last_id:0,  //加载文件的标识

  // 定义封装请求方法
  loadData(data,success,fail){
    data.row = 10  //一次获取十条数据
    fetch('food/orderlist',data).then((res)=>{
      this.last_id = res.data.last_id
      this.setData({
        is_last:this.data.is_last
      },()=>{
        success(res.data)
      })
    },fail)
  },

  // 查看详情跳转
  orderdetail(e){
    console.log(e);
    wx.navigateTo({
      url: '../detail/detail?order_id='+e.currentTarget.dataset.postid,
    })
  },

  // 初始化
  onLoad(){
    wx.showLoading({
      title: '加载中',
    })
    this.loadData({last_id:0},(data)=>{
      this.setData({
        orderlist:data.list
      },()=>{
        wx.hideLoading()
      })
    })
  },

  // 下拉刷新
  PullDownRefresh(){
    wx.showNavigationBarLoading()
    this.loadData({last_id:0},(data)=>{
      this.setData({
        orderlist:data.list
      },()=>{
        wx.hideNavigationBarLoading()
      })
    })
  },

  // 上拉触底
  onReachBottom(){
    // 判断是否还有数据，无则不执行请求
    if(this.data.is_last){
      return
    }
    
    wx.showLoading({
      title: '正在加载中'
    })

    let orderlist = this.data.orderlist
    this.loadData({last_id:this.last_id},(data)=>{
      for(let i = 0; i < data.list.length; i++){
        orderlist.push(data.list[i])
      }

      this.setData({
        orderlist:this.data.orderlist
      },()=>{
        wx.hideLoading()
      })
    })
  }
})