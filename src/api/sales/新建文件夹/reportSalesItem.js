import request from '@/utils/request'

export default {
    /*列印和导出表格*/
    indexTable(obj) {
      return request({
        url: '/isorder/indexProductTable',
        method: 'post',
        data: obj
      })
    },
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
