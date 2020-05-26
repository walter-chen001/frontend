import requestCgs from '@/utils/requestCgs'
export default {
    async updateData(obj) {
        return await requestCgs({
            url: '/shop/update',
            method: 'post',
            data: obj
        })
    },

    async postData(obj) {
        return await requestCgs({
            url: '/shop/create',
            method: 'post',
            data: obj
        })
    },
}