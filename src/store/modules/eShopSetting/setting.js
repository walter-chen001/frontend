import api from '@/api/eShopSetting/setting'

const setting = {
    namespaced: true,
    state: {
        language: [{
            "language_id":501,
            "language_name":"Chinese Simplified",
            "language_code":"chinese_simplified",
            "language_symbol":"简体中文"
        },
            {
                "language_id":502,
                "language_name":"Chinese Traditional",
                "language_code":"chinese_traditional",
                "language_symbol":"中國傳統的"
            },
            {
                "language_id":503,
                "language_name":"English",
                "language_code":"english",
                "language_symbol":"English"
            },
            {
                "language_id":504,
                "language_name":"Tamil",
                "language_code":"tamil",
                "language_symbol":"தமிழ்"
            }],
        shop:{
            shop_name : '',
            shop_logo: '',
            region: [{
                value: "(GMT +08:00) Asia/Hong_Kong",
                label: "(GMT +08:00) Asia/Hong_Kong"
                },
                {
                    value: "(GMT +05:00) Asia/China",
                    label: "(GMT +05:00) Asia/China"
                },
                {
                    value: "(GMT +05:30) Asia/India",
                    label: "(GMT +05:30) Asia/India"
                },
                {
                    value: "(GMT +04:00) Asia/Nepal",
                    label: "(GMT +04:00) Asia/Nepal"
                }] ,
            members : [],
            currency: [{
                currency_id: 501,
                currency_name: "EUR",
                currency_code: "eur",
                currency_symbol: "€"
                },
                {
                    currency_id: 502,
                    currency_name: "USD",
                    currency_code: "usd",
                    currency_symbol: "$"
                },
                {
                    currency_id: 503,
                    currency_name: "YUAN",
                    currency_code: "yuan",
                    currency_symbol: "¥"
                },
                {
                    currency_id: 504,
                    currency_name: "INR",
                    currency_code: "inr",
                    currency_symbol: "₹"
                }],
            email: '',
            role : [{
                admin: false,
                backoffice_manager : false,
                website_manager: false,
                bookings_admin: false,
                bookings_staff_member: false,
            }],
        },
        store: {
          display : {
              quantity_box: false,
              allow_p_review: false, //p - product
              auto_approve: false,
              enable_wishlist: false,
              enable_p_comparison: false,
              p_thumbnail_images: false,
              p_price: false,
              p_brand: false,
              p_shipping_cost: false,
              p_rating: false,
              expected_delivery_date: false,
              add_to_cart: false,
              p_sku: false,
          },
          security : {
              complex_pwd: false,
              cookie_consent_tracking: false,
              analytics_business: false,
          },
          notification: {
              p_review_notification: false,
              forward_order_invoice: false,
              forward_shipping_status: false,
              abandoned_cart_notification: false,
              p_page_inventory: {
                  always_notify: false,
                  notify_current: false,
                  notify_p_low: false,
              }
          }
        }

    },
    mutations: {

    },
    actions: {

    }
};

export default setting