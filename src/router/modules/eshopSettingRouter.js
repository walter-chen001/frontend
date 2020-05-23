
import Public_template from '@/views/public_template.vue'
import shopSetting from '@/views/eShopSetting/shopSetting.vue'
import storeSetting from '@/views/eShopSetting/storeSetting.vue'
import paymentSetting from '@/views/eShopSetting/paymentSetting.vue'
import productSetting from '@/views/eShopSetting/productSetting.vue'
import domainSetting from '@/views/eShopSetting/domainSetting.vue'
import seoSetting from '@/views/eShopSetting/seoSetting.vue'
import sslSetting from '@/views/eShopSetting/sslSetting.vue'
import publishSetting from '@/views/eShopSetting/publishSetting.vue'



const eshopSettingRouter = {
    path: '/eShopSetting',
    name: 'setting',
    component: Public_template,
    children: [
        {
            path: 'shopSetting',
            component: shopSetting,
            name: 'shopSetting'
        },
        {
            path: 'storeSetting',
            component: storeSetting,
            name: 'storeSetting'
        },
        {
            path: 'paymentSetting',
            component: paymentSetting,
            name: 'paymentSetting'
        },
        {
            path: 'productSetting',
            component: productSetting,
            name: 'productSetting'
        },
        {
            path: 'domainSetting',
            component: domainSetting,
            name: 'domainSetting'
        },
        {
            path: 'seoSetting',
            component: seoSetting,
            name: 'seoSetting'
        },
        {
            path: 'sslSetting',
            component: sslSetting,
            name: 'sslSetting'
        },
        {
            path: 'publishSetting',
            component: publishSetting,
            name: 'publishSetting'
        },
    ]
};

export default eshopSettingRouter
