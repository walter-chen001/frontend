import requestCgs from '@/utils/requestCgs'
export default {
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
            url:'/shop/update/display',
            method: 'post',
            data: obj,
        })
    },

    async updateSecurityData(obj) {
        return await requestCgs({
            url:'/shop/update/security',
            method: 'post',
            data: obj,
        })
    },

    async updateNotificationData(obj) {
        return await requestCgs({
            url:'/shop/update/notification',
            method: 'post',
            data: obj,
        })
    },

    async updateMaintenanceMode(obj) {
        return await requestCgs({
            url:'/shop/update/maintenance',
            method: 'post',
            data: obj,
        })
    },

    async updateDomainData(obj) {
        return await requestCgs({
            url:'/cgs_api/shop/update/domain',
            method: 'post',
            data: obj,
        })
    },

    async updateSeoData(obj) {
        return await requestCgs({
            url:'',
            method: 'post',
            data: obj,
        })
    },
}