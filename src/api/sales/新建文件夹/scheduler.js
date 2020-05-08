import request from '@/utils/request'

export default {
    // indexSalesTable(obj) {
    //     return request({
    //         url: '/sales/invoice/indexSalesTable',
    //         method: 'post',
    //         data:obj
    //     })
    // },
    getShipmentOrderInfo(obj) {
        return request({
            url: '/shipmentOrder/getShipmentOrderInfo',
            method: 'post',
            data:obj
        })
    },
    printData(obj) {
        return request({
            url: '/shipmentOrder/printData',
            method: 'post',
            data:obj
        })
    },
    
}
