import request from '@/utils/request'
export default {
  getOrderData(id) {
    return request({
      url: '/sales/order/getOrderData',
      method: 'post',
      data:{id:id}
    })
  },

  getTableData(obj) {
    return request({
      url: '/sales/order/getTableData',
      method: 'post',
      data:obj
    })
  },

  getDownListData() {
    return request({
      url: '/sales/order/getDownListData',
      method: 'post',
    })
  },

  addOrder(obj) {
    return request({
      url: '/sales/order/addOrder',
      method: 'post',
      data:obj
    })
  },

  getPersonal(obj) {
    return request({
      url: '/sales/order/getPersonal',
      method: 'post',
      data:obj
    })
  },

  setPersonal(obj) {
    return request({
      url: '/sales/order/setPersonal',
      method: 'post',
      data:obj
    })
  },

  addPersonal(obj) {
    return request({
      url: '/sales/order/addPersonal',
      method: 'post',
      data:obj
    })
  },

  setCustomer(obj) {
    return request({
      url: '/sales/order/setCustomer',
      method: 'post',
      data:obj
    })
  },

  delitemDetalls(obj) {
    return request({
      url: '/sales/order/delitemDetalls',
      method: 'post',
      data:obj
    })
  },

  getCountData(obj) {
    return request({
      url: '/sales/order/getCountData',
      method: 'post',
      data:obj
    })
  },
  salesAdd(obj) {
    return request({
      url: '/sales/order/add',
      method: 'post',
      data:obj
    })
  },
  salesGetData(id) {
    return request({
      url: '/sales/order/getData',
      method: 'post',
      data:{id:id}
    })
  },
  salesUpdate(obj) {
    return request({
      url: '/sales/order/update',
      method: 'post',
      data:obj
    })
  },
  downlistData() {
    return request({
      url: '/sales/order/downlistData',
      method: 'post',
    })
  },
  getContactInfo(obj) {
    return request({
      url: '/sales/order/getContactInfo',
      method: 'post',
      data:obj
    })
  },
  indexSalesTable(obj) {
    return request({
      url: '/sales/order/indexSalesTable',
      method: 'post',
      data:obj
    })
  },
  delete(obj) {
    return request({
      url: '/sales/order/delete',
      method: 'post',
      data:obj
    })
  },
  delDetail(obj) {
    return request({
      url: '/sales/order/delDetail',
      method: 'post',
      data:obj
    })
  },
  addDetails(obj) {
    return request({
      url: '/sales/order/addDetails',
      method: 'post',
      data:obj
    })
  },
  addInvoice(obj) {
    return request({
      url: '/sales/order/addInvoice',
      method: 'post',
      data:obj
    })
  },
  addFormOut(obj) {
    return request({
      url: '/sales/order/addFormOut',
      method: 'post',
      data:obj
    })
  },
  
}





