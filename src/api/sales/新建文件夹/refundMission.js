import request from '@/utils/request'

export default {
    /*获取右边栏数据*/
    getRefundsTaskInfo(id) {
      return request({
        url: '/exchangeProduct/getRefundsTaskInfo',
        method: 'post',
        data: {id:id}
      })
    },
    /*获取高级搜索下拉数据*/
    getDataEPTask(obj) {
      return request({
        url: '/exchangeProduct/getDataEPTask',
        method: 'post',
        data: obj
      })
    },
    /*确认退款*/
    confirmRefunds(obj) {
      return request({
        url: '/exchangeProduct/confirmRefunds',
        method: 'post',
        data: obj
      })
    },
    /*列印和导出表格*/
    indexTable(obj) {
      return request({
        url: '/exchangeProduct/printTask',
        method: 'post',
        data: obj
      })
    },
}
