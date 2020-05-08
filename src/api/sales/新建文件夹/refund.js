import request from '@/utils/request'

export default {
    /*获取退换单列表下拉数据*/
    getCharts(obj) {
      return request({
        url: '/sales/refund/getCharts',
        method: 'post',
        data:obj
      })
    },
    /*获取退换单列表下拉数据*/
    getChartsInit(obj) {
      return request({
        url: '/sales/refund/getChartsInit',
        method: 'post',
        data:obj
      })
    },
    /*获取退换单列表下拉数据*/
    refundItemIndex(obj) {
      return request({
        url: '/exchangeProduct/getDataExchange',
        method: 'post',
        data:obj
      })
    },
    /*获取退换产品选择下拉数据*/
    getData(obj) {
      return request({
        url: '/exchangeProduct/getData',
        method: 'post',
        data:obj
      })
    },
    /*获取右边栏数据*/
    detailsData(id) {
      return request({
        url: '/exchangeProduct/getRefundsInfo',
        method: 'post',
        data: {id:id}
      })
    },
    /*获取右边栏退换单选择下拉数据*/
    getRefundsType(obj) {
      return request({
        url: '/exchangeProduct/getRefundsType',
        method: 'post',
        data:obj
      })
    },
    /*修改退款单*/
    updateRefundsDetails(obj) {
      return request({
        url: '/exchangeProduct/updateRefundsDetails',
        method: 'post',
        data:obj
      })
    },
    /*修改客户资料*/
    updateRefundsClientInfo(obj) {
      return request({
        url: '/exchangeProduct/updateRefundsClientInfo',
        method: 'post',
        data:obj
      })
    },
    /*修改送货资料*/
    updateRefundsDelivery(obj) {
      return request({
        url: '/exchangeProduct/updateRefundsDelivery',
        method: 'post',
        data:obj
      })
    },
    /*新增退换单*/
    createExchangeOrder(obj) {
      return request({
        url: '/exchangeProduct/createExchangeOrder',
        method: 'post',
        data:obj
      })
    },
    /*退换产品选择*/
    createExchangeOrderDetails(obj) {
      return request({
        url: '/exchangeProduct/createExchangeOrderDetailsNew',
        method: 'post',
        data:obj
      })
    },
    /*删除项目明细*/
    delRefundsDetails(obj) {
      return request({
        url: '/exchangeProduct/delRefundsDetails',
        method: 'post',
        data:obj
      })
    },
    /*确认退换单*/
    orderConfirm(id) {
      return request({
        url: '/exchangeProduct/orderApproval',
        method: 'post',
        data: {id:id}
      })
    },
    /*不审批退换单*/
    orderDisapproval(id) {
      return request({
        url: '/exchangeProduct/orderDisapproval',
        method: 'post',
        data: {id:id}
      })
    },
    /*审批退换单*/
    orderApproval(id) {
      return request({
        url: '/exchangeProduct/orderApproval',
        method: 'post',
        data: {id:id}
      })
    },
    /*批量审批退换单*/
    batchApproval(obj) {
      return request({
        url: '/exchangeProduct/batchApproval',
        method: 'post',
        data:obj
      })
    },
    /*反审批退换单*/
    orderAntiApproval(id) {
      return request({
        url: '/exchangeProduct/orderAntiApproval',
        method: 'post',
        data: {id:id}
      })
    },
    /*作废退换单*/
    orderVoid(id) {
      return request({
        url: '/exchangeProduct/orderVoid',
        method: 'post',
        data: {id:id}
      })
    },
    /*修改退换类型和备注*/
    updateRefunds(obj) {
      return request({
        url: '/exchangeProduct/updateRefunds',
        method: 'post',
        data: obj
      })
    },
    /*全单退换*/
    wholeOrderReturn(obj) {
      return request({
        url: '/exchangeProduct/wholeOrderReturn',
        method: 'post',
        data: obj
      })
    },
    /*生成退换单*/
    createExchangeOrderNew(obj) {
      return request({
        url: '/exchangeProduct/createExchangeOrderNew',
        method: 'post',
        data: obj
      })
    },
    /*获取附件列表*/
    getAttachmentInfo(id) {
      return request({
        url: '/exchangeProduct/getAttachmentInfo',
        method: 'post',
        data: {id:id}
      })
    },
    /*列印和导出表格*/
    indexTable(obj) {
      return request({
        url: '/exchangeProduct/print',
        method: 'post',
        data: obj
      })
    },
}
