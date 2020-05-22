// let tabledata = {
//     data: [],
//     page: 1,
//     pageSize: 10,
//     rowTotal: '1110',
//     sunData: {}
// }
// for (var i = 0; i < 100; i++) {
//     tabledata.data.push({ title1: "AAAA" + i, title2: "BBBB" + i })
// }

export default {
    getBaseData: config => {
        let obj = {
            code: 0,
            msg: "",
            status: 200
        };
        obj.data = {
            "topMenu": {
                "children": {
                    "2": {
                        "link": "system/setup/staff/index",
                        "moduleName": "仓库",
                        "value": "m008"
                    },
                    "3": {
                        "link": "system/setup/staff/index",
                        "moduleName": "销售",
                        "value": "m009"
                    },
                    "4": {
                        "link": "system/setup/staff/index",
                        "moduleName":"网上商店设置",
                        "value": "m010"
                    }
                },
                "icon": "el-icon-s-tools",
                "link": "system/setup/staff/index"
            },
            "allNav": {
                "m008": [{
                    "type": "m008",
                    "authority": "",
                    "name": "inventory",
                    "itemID": "134",
                    "moduleName": "仓库",
                    "link": "/stock",
                    "icon": "el-icon-s-home",
                    "children": [{
                        "type": "m008",
                        "authority": "ebix99900901",
                        "moduleID": "99999",
                        "name": "stockSettings",
                        "itemID": "1340",
                        "moduleName": "仓库设置",
                        "isModul": true,
                        "parentID": "134",
                        "link": "/stock/stockSettings",
                        "icon": ""
                    }]
                }],
                "m009": [{
                    "type": "m009",
                    "authority": "ebix999004001",
                    "name": "order",
                    "itemID": "105",
                    "moduleName": "销售订单",
                    "link": "/sales/order/index",
                    "icon": "fa fa-shopping-cart"
                }],
                "m010": [{
                    "type": "m010",
                    "authority":"ebix999004001",
                    "name": "shopSettingIndex",
                    "itemID": "106",
                    "moduleName":"网上商店设置", //E-shop setting
                    "link":"/eShopSettings",
                    "children": [{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99998",
                        "name": "shopSetting",
                        "itemID": "1060",
                        "moduleName": "Shop Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/shopSetting",
                        "icon": ""
                    },{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99997",
                        "name": "storeSetting",
                        "itemID": "1061",
                        "moduleName": "Store Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/storeSetting",
                        "icon": ""
                    },{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99996",
                        "name": "paymentSettings",
                        "itemID": "1062",
                        "moduleName": "Payment Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/paymentSetting",
                        "icon": ""
                    },{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99995",
                        "name": "productSetting",
                        "itemID": "1063",
                        "moduleName": "Product Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/productSetting",
                        "icon": ""
                    },{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99994",
                        "name": "domainSetting",
                        "itemID": "1064",
                        "moduleName": "Domain Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/domainSetting",
                        "icon": ""
                    },{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99993",
                        "name": "seoSetting",
                        "itemID": "1065",
                        "moduleName": "SEO Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/seoSetting",
                        "icon": ""
                    },{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99992",
                        "name": "sslSettings",
                        "itemID": "1066",
                        "moduleName": "SSL Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/sslSettings",
                        "icon": ""
                    },{
                        "type": "m010",
                        "authority": "ebix999004001",
                        "moduleID": "99991",
                        "name": "publishSettings",
                        "itemID": "1067",
                        "moduleName": "Publish Setting",
                        "isModul": true,
                        "parentID": "106",
                        "link": "/eShopSetting/publishSettings",
                        "icon": ""
                    }]
                }]
            },
            "currentFlow": "m010",

            "companyLanguage": [{
                "label": "简体",
                "value": "zh_cn"
            }]
        }
        return obj
    },
    // getTableData: config => {
    //     let obj = {
    //         code: 0,
    //         msg: "",
    //         status: 200
    //     }
    //     obj.data = tabledata
    //     return obj
    // },
    // getColumnOption: config => {
    //     return [
    //         { title1: "DDDD1", title2: "DDDD1" }
    //     ]
    // },
    // getColumns: config => {
    //     let obj = {
    //         code: 0,
    //         msg: "",
    //         status: 200
    //     }
    //     obj.data = [
    //         { field: "status", title: "状态", width: "80", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, filterType: "select", selectOptions: "status", isShow: true, fixed: false, custom: { tplname: "ColumnStatusV1", other: { "true": "上架", "false": "下架" } } },
    //         { field: "item_no", title: "项目主编码", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, isShow: true, fixed: false },
    //         { field: "type", title: "类型", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, isShow: true, fixed: false },
    //         { field: "category", title: "分类", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, isShow: true, fixed: false },
    //         { field: "name", title: "项目主名称", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, isShow: true, fixed: false },
    //         { field: "model", title: "型号", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, isShow: true, fixed: false },
    //         { field: "description", title: "描述", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, isShow: true, fixed: false },
    //         { field: "created_at", title: "记录日期", titleAlign: "left", columnAlign: "left", overflow: true, sortable: false, filterType: "date", isShow: true, fixed: false },
    //     ]
    //     return obj
    // },
    // getColumnSetInfo: config => {
    //     let obj = {
    //         code: 0,
    //         msg: "",
    //         status: 200
    //     }
    //     /**
    //      * index sort
    //      * n name
    //      * s show  0 hidden 1 show
    //      * w width
    //      */
    //     obj.data = [
    //         { n: 'title1', s: 1, w: 60 },
    //         { n: 'title2', s: 0, w: 120 },
    //         { n: 'title4', s: 1, w: 220 },
    //         { n: 'title3', s: 1, w: 100 },
    //     ]
    //     return obj
    // },
    // updateColumnSet: config => {
    //     return [
    //         { client1: "DDDD1", client2: "DDDD1" }
    //     ]
    // },
    // getFormTaskCount: config => {
    //     let obj = {
    //         'm50301': { label: Math.floor((Math.random() * 100) + 1), color: "badge-danger", tip: "新接收" },
    //         'm7405': { label: Math.floor((Math.random() * 100) + 1), color: "badge-danger", tip: "新接收" },
    //         'm30101': { label: Math.floor((Math.random() * 100) + 1), color: "badge-danger", tip: "新接收" },
    //     };
    //     return obj
    // },

}
