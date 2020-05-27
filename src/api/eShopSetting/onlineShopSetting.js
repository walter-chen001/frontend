import request from '@/utils/request'
export default {
    async getShopData(obj) {
        return await request({
            url: '/system/shop/getData',
            method: 'post',
            data: {}
        })
    },
}