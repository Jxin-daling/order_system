const fetch = require('../../../utils/fetch.js')

Page({
  data:{

  },

  onLoad: function (options) {
    // 取出缓存的note值
    let note = wx.getStorageSync('note')
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    fetch('food/order', { order_id: options.order_id }).then((res) => {
      let foods = res.data.foods
      //算总价
      let sum = 0;
      for (let i in foods) {
        sum += foods[i].price * foods[i].num
      }
      if (res.data.promotion.length > 0 && sum > res.data.promotion.discount) {
        sum -= res.data.promotion.discount
      }
      this.setData({
        order: res.data,
        sumMonney: sum,
        note: note
      })
    })
  }
})