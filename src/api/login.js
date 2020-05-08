import request from '@/utils/request'
	export default {
    loginByUsername(username, password) {
        const data = {
            username,
            password
        }
        return request({
            // url: '/auth/getToken',/*登陆坏了暂时用这个*/
            url: '/auth/login',
            method: 'post',
            data
        })
    },

    logout() {
        return request({
            url: '/auth/logout',
            method: 'post'
        })
    },

    getUserInfo(){
        return request({
            url: '/user/profile',
            method: 'post',
        })
    },

    register(data) {
        return request({
            url: '/auth/register',
            method: 'post',
            data: data
        })
    },

    createCompany(data) {
        return request({
            url: '/site/createCompany',
            method: 'post',
            data: data
        })
    },

    sendSMS(data) {
        return request({
            url: '/auth/sendVerify',
            method: 'post',
            data: data
        })
    },

    checkUser(data) {
        return request({
            url: '/site/checkUser',
            method: 'post',
            data: data
        })
    }


}
