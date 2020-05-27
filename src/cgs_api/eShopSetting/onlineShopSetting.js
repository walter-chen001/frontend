import requestCgs from '@/utils/requestCgs'
export default {
    async updateData(obj) {
        return await requestCgs({
            url: '/cgs_api/shop/update',
            method: 'post',
            data: obj
        })
    },

    async postData(obj) {
        return await requestCgs({
            url: '/cgs_api/shop/create',
            method: 'post',
            data: obj
        })
    },
}