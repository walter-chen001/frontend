import api from '@/api/eShopSetting/onlineShopSetting'
// import store from '../../index'
// import getters from '../../getters'

// console.log(getters.user_id().user_id, 'sssssssssssssssstttttttttttttoooooooooooorrrrrrrrrrrrreeeeeeeeeee');

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
                is_allow_quantity_box: false,
                is_allow_product_reviews: false,
                is_auto_approve_reviews: false,
                is_enable_wishlist: false,
                is_enable_product_comparsion: false,
                is_enable_product_thumbnail_image: false,
                is_enable_product_price: false,
                is_enable_product_brand: false,
                is_enable_product_shipping_price: false,
                is_enable_product_rating: false,
                is_enable_expected_delivery_date: false,
                is_enable_add_to_cart: false,
                is_enable_product_sku: false,
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