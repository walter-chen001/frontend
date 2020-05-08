import { getCountryAreData, getBaseData, getFormTaskCount, getData3, updateColumnSet, getColumnOption, getTableData, getColumnSetInfo, uploadImg, attachSave, getAttachmentInfo, attachDel, getInitData, getCountryOptions, getCompanyIndustryOptions, getAreaCode, getTableTitle,updateTableTitle,recoverTableTitle } from '@/api/common'
import { sortKey } from '@/utils/tool'

const common = {
    namespaced: true,
    state: {
        addressData: [],
        tableColumnInfo: [],

        //国家地区和行业的数据源
        options: {
            country: [],
            industry: [],
        },
        areaCodeList: [],//地区编码数据源
    },

    mutations: {
        SET_TABLE_COLUMN_INFO: (state, obj) => {
            if (obj.tableType) {
                state.tableColumnInfo[obj.tableType] = obj.data
            }
        },
        SET_ADDRESSDATA: (state, arr) => {
            state.addressData = arr
        }
    },

    actions: {
        getCountryAreData({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                getCountryAreData().then(response => {
                    commit('SET_ADDRESSDATA', response.data)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getBaseData({ commit, dispatch ,state,rootState},route) {
            return new Promise((resolve, reject) => {
                getBaseData().then(response => {
                    console.log("getBaseData...",JSON.stringify(response.data.leftNav))
                    // console.log(JSON.stringify(response.data))
                    // if (route.path != "/") {
                    //     commit("INIT_TAB", route)
                    // }
                   resolve(response)
                   
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getFormTaskCount() {
            return new Promise((resolve, reject) => {
                getFormTaskCount().then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        updateColumnSet({ commit }, data) {
            return new Promise((resolve, reject) => {
                updateColumnSet(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getData3() {
            return new Promise((resolve, reject) => {
                getData3().then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getColumnOption({ commit }, data) {
            return new Promise((resolve, reject) => {
                getColumnOption(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })

            })
        },

        getTableData({ commit }, data) {
            return new Promise((resolve, reject) => {
                getTableData(data).then(response => {
                    // console.log("store getTableData xxxxxxxxxxxxxxxx",response)
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    // console.log("common store getTableData...",err)
                })

            })
        },

        getColumnSetInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                getColumnSetInfo(data).then(response => {
                    console.log("合并数据库表头数据.....", response.data);
                    // var tableType = data.tableType;
                    // var columns = data.columns;
                    // var new_columns = response.data.columns;
                    // var noShowColumn = response.data.noShowColumn;
                    // var columns_arr = [];
                    // for (let index = 0; index < columns.length; index++) {
                    //     if (noShowColumn.indexOf(columns[index].datafield) >= 0) {
                    //         /*删除不显示列*/
                    //     } else {
                    //         if (new_columns) {//列设置
                    //             if (new_columns[columns[index].datafield]) {
                    //                 columns[index].width ? columns[index].width : '100'
                    //                 new_columns[columns[index].datafield].width ? new_columns[columns[index].datafield].width : columns[index].width
                    //                 columns_arr.push(Object.assign(columns[index], new_columns[columns[index].datafield]))
                    //             } else {
                    //                 columns_arr.push(Object.assign(columns[index], { 'sort': 99 }))
                    //             }
                    //         } else {
                    //             columns_arr.push(columns[index]);//前端列设置
                    //         }
                    //     }
                    // }
                    // //    console.log('columns_arr...',columns_arr)
                    // columns_arr = sortKey(columns_arr, 'sort')
                    // var ocolumnoptions = [];
                    // for (let index = 0; index < columns_arr.length; index++) {
                    //     if (!columns_arr[index].hidedlg) {
                    //         var checked = columns_arr[index].hidden ? false : true;
                    //         ocolumnoptions[index] = { label: columns_arr[index].text, value: columns_arr[index].datafield, checked: checked }
                    //     }
                    // }
                    // var arr = JSON.parse(JSON.stringify(ocolumnoptions));
                    // var columnsSetData = [];
                    // var s = 1;
                    // for (let key in arr) {
                    //     if (arr[key] && arr[key]['value']) {
                    //         if (arr[key]["checked"] == true) {
                    //             s = 1;
                    //         } else {
                    //             s = 0;
                    //         }
                    //         columnsSetData.push({ 'n': arr[key]["value"], 's': s, 'w': columns_arr[key].width ? columns_arr[key].width : '100' });
                    //     }
                    // }
                    // let tempObj = { columns: columns_arr, columnoptions: ocolumnoptions, columnsSetData: columnsSetData }
                    // commit('SET_TABLE_COLUMN_INFO', { tableType: tableType, data: tempObj })

                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })

            })
        },

        uploadImg({ commit }, data) {
            return new Promise((resolve, reject) => {
                uploadImg(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        attachSave({ commit }, data) {
            return new Promise((resolve, reject) => {
                attachSave(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getAttachmentInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAttachmentInfo(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        attachDel({ commit }, data) {
            return new Promise((resolve, reject) => {
                attachDel(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        /**
         * tableType string
         */
        getInitData({ commit, dispatch }, type) {
            return new Promise((resolve, reject) => {
                getInitData(type).then(response => {
                    // console.log("getInitData...",response.data)
                    // console.log(JSON.stringify(response.data))
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getCountryOptions({ commit, dispatch }, type) {
            return new Promise((resolve, reject) => {
                getCountryOptions(type).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        getCompanyIndustryOptions({ commit, dispatch }, type) {
            return new Promise((resolve, reject) => {
                getCompanyIndustryOptions(type).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getAreaCode({ commit, dispatch}) {
            return new Promise((resolve, reject) => {
                getAreaCode().then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        /**
         * 获取表头设置
         * @return {[type]}                  [description]
         */
        getTableTitle({ commit, dispatch }, type) {
            return new Promise((resolve, reject) => {
                getTableTitle(type).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        updateTableTitle({ commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                updateTableTitle(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        recoverTableTitle({ commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                recoverTableTitle(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },




    }

}

export default common
