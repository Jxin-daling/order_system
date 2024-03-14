const fetch = require('../../utils/fetch')
Page({
  data:{
    listData:'',
    activeIndex:0,
    toView:'toView0',
    sumMoney:0,  // 总价格
    cartlist:0,  //已选商品数量
    cartitem:[], //已选商品列表
    showlist:false  //控制购物车商品列表展开
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

  // 添加商品
  addToCart(e){
    let type = e.target.dataset.type
    // console.log([...this.data]);
    this.setData({
      cartitem:[...this.data.cartitem,{...type}],
      cartlist:this.data.cartitem.length + 1,
      sumMoney:this.data.sumMoney+type.specfoods[0].price
    })
  },

  // 打开购物车商品列表
  showcart(){
    if(this.data.cartitem.length != 0){
      this.setData({
          showlist:!this.data.showlist,
      })
    }
  },  

  // 清空购物车
  clearcart(){
    this.setData({
      cartitem:[],
      showlist:!this.data.showlist,
      cartlist:0,
      sumMoney:0
    })
  },

  // 删除某条商品
  delitem(e){
    let index = e.currentTarget.dataset.index
    this.data.cartitem.splice(index,1)
    this.setData({
      cartitem:this.data.cartitem
    })
  },

  // 跳转订单确认页面
  goBalance(){
    if(this.data.cartlist > 0){
      fetch('food/order',{id:1,num:1},'post').then((res)=>{
        if(res.data.error !==0){
          wx.showModal({
            title: '下单失败',
            content: '操作失败请稍后重试',
          })
          return
        }
        wx.navigateTo({
          url: '/pages/order/balance/balance',
        })
      })
     
    }
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