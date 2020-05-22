
import Public_template from '@/views/public_template.vue'

import Login from '@/views/login/index.vue'
import Register from '@/views/login/register.vue'
import RetrievePwd from '@/views/login/retrievePwd.vue'
import ResetPwd from '@/views/login/resetPwd.vue'
// import UserInfo from '@/views/userInfo/index.vue'

import Home from '@/views/home/index.vue'
import salesRouter from './modules/sales'
import stockRouter from './modules/stock'

import eshopSettingRouter from './modules/eshopSettingRouter'

export const constantRouterMap = [
    {
        path: '/',
        component: Public_template,
        children: [
            {
                path: '/',
                component: Home,
                name: 'BackHome'
            },
            
        ]
    },

    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/retrievePwd',
        component: RetrievePwd,
        name: 'retrievePwd'
    },
    {
        path: '/resetPwd',
        component: ResetPwd,
        name: 'resetPwd'
    },


    salesRouter,
    stockRouter,
    eshopSettingRouter,
];

export default new VueRouter({
    mode: "history",
    routes: constantRouterMap
})

export const asyncRouterMap = [];
