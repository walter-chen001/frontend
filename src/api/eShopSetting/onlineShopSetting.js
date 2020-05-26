import request from '@/utils/request'
export default {
    getMasterData() {
        return request({
            url: '/shop/master',
            method: 'get'
        })
    },
}