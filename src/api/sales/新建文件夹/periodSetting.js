import request from '@/utils/request'

export default {
    /*获取期数设置数据*/
    getPeriodsSettings(obj) {
      return request({
        url: '/periodsSettings/getPeriodsSettings',
        method: 'post',
        data:obj
      })
    },
    /*更新期数设置*/
    savePeriodsSettings(obj) {
      return request({
        url: '/periodsSettings/savePeriodsSettings',
        method: 'post',
        data:obj
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
