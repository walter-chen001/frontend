import requestCgs from '@/utils/requestCgs'
export default {
    async getShopData(obj) {
        return await requestCgs({
            url: '/cgs_api/shop/getData',
            method: 'post',
            data: obj
        })
    },
    async updateShopData(obj) {
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

    async updateDisplayData(obj) {
        return await requestCgs({
            url: '/cgs_api/shop/update/display',
            method: 'post',
            data: obj,
        })
    },

    async updateSecurityData(obj) {
        return await requestCgs({
            url: '/cgs_api/shop/update/security',
            method: 'post',
            data: obj,
        })
    },

    async updateNotificationData(obj) {
        return await requestCgs({
            url: '/cgs_api/shop/update/notification',
            method: 'post',
            data: obj,
        })
    },

    async updateMaintenanceMode(obj) {
        return await requestCgs({
            url: '/cgs_api/shop/update/status',
            method: 'post',
            data: obj,
        })
    }
}