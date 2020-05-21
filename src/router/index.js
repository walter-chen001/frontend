
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

import shopSetting from '../components/eShopSettings/shopSettingsMenu/shopSetting.vue'
import storeSetting from '../components/eShopSettings/shopSettingsMenu/storeSetting.vue'
import paymentSetting from '../components/eShopSettings/shopSettingsMenu/paymentSetting.vue'
import productSetting from '../components/eShopSettings/shopSettingsMenu/productSetting.vue'
import domainSetting from '../components/eShopSettings/shopSettingsMenu/domainSetting.vue'
import seoSetting from '../components/eShopSettings/shopSettingsMenu/seoSetting.vue'
import sslSetting from '../components/eShopSettings/shopSettingsMenu/sslSetting.vue'
import publishSetting from '../components/eShopSettings/shopSettingsMenu/publishSetting.vue'

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
    {
        path: '/shop-setting',
        name: 'shopSetting',
        component: shopSetting,
        meta: {auth: true}
    },
    {
        path: '/store-setting',
        name: 'storeSetting',
        component: storeSetting,
        meta: {auth: true}
    },{
        path: '/payment-setting',
        name: 'paymentSetting',
        component: paymentSetting,
        meta: {auth: true}
    },{
        path: '/product-setting',
        name: 'productSetting',
        component: productSetting,
        meta: {auth: true}
    },{
        path: '/domain-setting',
        name: 'domainSetting',
        component: domainSetting,
        meta: {auth: true}
    },{
        path: '/seo-setting',
        name: 'seoSetting',
        component: seoSetting,
        meta: {auth: true}
    },{
        path: '/ssl-setting',
        name: 'sslSetting',
        component: sslSetting,
        meta: {auth: true}
    },{
        path: '/publish-setting',
        name: 'publishSetting',
        component: publishSetting,
        meta: {auth: true}
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
