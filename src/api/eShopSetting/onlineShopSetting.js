import request from '@/utils/request'
export default {
    async getLanguageData(obj) {
        return await request({
            url: '/company/getLangList',
            method: 'post',
            data: {}
        })
    },

    async getRegionList(obj) {
        return await request({
            url: '/country/getRegionList',
            method: 'post',
            data: {}
        })
    },

    async getCurrencyList(obj) {
        return await request({
            url: '/system/currency/downListData',
            method: 'post',
            data: {}
        })
    },
}