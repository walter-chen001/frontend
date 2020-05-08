import request from '@/utils/request'

export default {
  /*获取下拉数据*/
    saleItemIndex(obj) {
      return request({
        url: '/isorder/getData',
        method: 'post',
        data:obj
      })
    },
    /*列印和导出表格*/
    indexTable(obj) {
      return request({
        url: '/isorder/indexTable',
        method: 'post',
        data: obj
      })
    },

    // getData() {
    //     return request({
    //         url: '/inStock/index',
    //         method: 'post'
    //     })
    // },
    // chartData(obj) {
    //     return request({
    //         url: '/inStock/chartData',
    //         method: 'post',
    //         data:obj
    //     })
    // },
    // confirmWarehousing(obj) {
    //     return request({
    //         url: '/inStock/confirmWarehousing',
    //         method: 'post',
    //         data:obj
    //     })
    // },


}
