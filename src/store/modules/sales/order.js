import api from '@/api/sales/order'
const order = {
    namespaced: true,
    state: {
      downlistData:{},
      rightColumnData:{
        order:'',
        step:0,
        rowid:"",
        isAdd:false,
        customer:{
            client:[],
            clientvalue:'',
            customerName:'',
            last_name:"",
            address:"",
            country:[],
            first_name:"",
            office_phone:"",
            phone:"",
            fax:"",
            email:"",
            contact_name:""
        },
        itemDetalls:{
            tableData:[{itemNo: "", describe: "", origin: "", brand: "", attribute_no: "", skuName: "",flat:true}],
        },
        paymentRecelve:{
            outstanding:0,
            data:[]
        },
        dellvery:{
            deliveried:0,
        },
        documents:{
            recentNumber:0,
            recentDocuments:[]
        },
        account:{
          totalCurrency:"",
          total:"",
          unpaidCurrency:"",
          unpaidAmount:"",
          account_name:"",
          account_acount:"",
          account_type:"",
          fare:"",
          tax:"",
          currency:"",
        },
        otherInfo:{
          sales_user_id:"",
          sale_date:"",
          remarks:"",
        }
      },
      initData:{
        layout:{
            middle:{
              tplname:"FormTableV51",
            },
            right:{
                tplname:"RightColumnV51",
                children:[
                    {
                        tplname:'BasicInfoV51',
                        'dataname':'BasicInfoV51',
                        children:[
                            {tplname:'CustomerV51','dataname':'CustomerV51',title:'客户资料'},
                            {tplname:'TableV51','dataname':'TableV51',title:'项目主明细'},
                            {tplname:'MoneyV51','dataname':'MoneyV51',title:'收款信息'},
                            // {tplname:'DellveryV51','dataname':'DellveryV51',title:'Dellvery'},
                            // {tplname:'InputFormidV51','dataname':'InputFormidV51',title:'Documents'},
                            {tplname:'OtherInfoV51','dataname':'OtherInfoV51',title:'其它信息'},
                        ],
                    },
                ],
            }

        }
      },
    },
    mutations: {
        
    },
    actions: {
        getOrderData({ commit }, id) {
            return new Promise((resolve, reject) => {
                api.getOrderData(id).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getTableData({ commit }, obj) {
            return new Promise((resolve, reject) => {
                api.getTableData(obj).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        getDownListData({ commit }, obj) {
            return new Promise((resolve, reject) => {
                api.getDownListData(obj).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        addOrder({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.addOrder(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },

        getPersonal({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.getPersonal(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },

        setPersonal({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.setPersonal(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },

        addPersonal({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.addPersonal(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },

        setCustomer({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.setCustomer(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },

        delitemDetalls({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.delitemDetalls(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },

        getCountData({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.getCountData(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },

        salesAdd({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.salesAdd(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        salesGetData({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.salesGetData(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        salesUpdate({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.salesUpdate(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        downlistData(){
            return new Promise((resolve, reject) => {
                api.downlistData().then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        getContactInfo({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.getContactInfo(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        indexSalesTable({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.indexSalesTable(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        delete({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.delete(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        delDetail({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.delDetail(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        addDetails({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.addDetails(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        addInvoice({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.addInvoice(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
        addFormOut({ commit }, obj) {
            return new Promise((resolve, reject) => {
              api.addFormOut(obj).then(response => {
                resolve(response)
              }).catch(err => {
                reject(err)
                console.log(err)
              })
            })
        },
    }
}

export default order
