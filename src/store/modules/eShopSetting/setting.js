import api from '@/api/eShopSetting/onlineShopSetting'

const setting = {
    namespaced: true,
    state: {
        shop: {
            name: '',
            shop_logo: [],
            region: '',
            languages: [],
            currency: [],
        },
        stores: {
            display: {
                is_allow_quantity_box: 0,
                is_allow_product_reviews: 0,
                is_auto_approve_reviews: 0,
                is_enable_wishlist: 0,
                is_enable_product_comparsion: 0,
                is_enable_product_thumbnail_image: 0,
                is_enable_product_price: 0,
                is_enable_product_brand: 0,
                is_enable_product_shipping_price: 0,
                is_enable_product_rating: 0,
                is_enable_expected_delivery_date: 0,
                is_enable_add_to_cart: 0,
                is_enable_product_sku: 0,
                new_product_days: '',
                best_seller_type: '',

            },
            security: {
                is_enable_complex_password: false,
                is_enable_cookie_tracking: false,
                is_enable_analytics: false,

            },
            notification: {
                is_product_review_notification: false,
                is_forward_order_invoice: false,
                is_forward_shipping_status: false,
                is_enable_cart_notification: false,
                page_inventory_notification: '',
            }
        },
        domain: {
           domain_name: '',
           fav_icon: [],
        },
        seo: {
            pages: [],
            title: '',
            description: '',
            multi_tag: []
        }
    },
    mutations: {

    },
    actions: {
        getShopData({ commit }, obj) {
            return new Promise((resolve, reject) => {
                api.getShopData(obj).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err);
                    console.log(err)
                })
            })
        },

    },
};

export default setting