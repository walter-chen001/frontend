<template>
    <MainContent class="salesOrderStyle" ref="maincontent">
        <template slot="main">
            <!-- <HeadTotal :total="total"></HeadTotal> -->
            <component
                ref="formTable"
                :is="tablename"
                :options="initData.downListData"
                :user="user"
                @onRowclick="onRowclick"
                @newclick="newclick">
            </component>
        </template>
        <template slot="right">
            <component
                ref="rightbom"
                :is="columnname"
                :initial="initial"
                :rowId="rowId"
                @refreshTable='refreshTable'
                @currentChange='currentChange'
                @currentChangeThisRow="currentChangeThisRow"
                @clearCurrentRow='clearCurrentRow'>
            </component>
        </template>
    </MainContent>
</template>
<script>
import MainContent from "@/components/main-contents.vue";
import HeadTotal from "@/components/head-total.vue";
import RightColumnV51 from "@/components/right-column-v51.vue";
import FormTableV51 from "@/components/form-table-v51.vue"
export default {
    name:"order",
    components: {
        MainContent,
        HeadTotal,
        RightColumnV51,
        FormTableV51,
    },
    computed:{
        tablename(){
            return this.$store.state.order.initData.layout.middle.tplname
        },
        columnname() {
            return this.$store.state.order.initData.layout.right.tplname
        },
        rightsidecollapse: {
            get() {
                return this.$store.state['app'].rightsidecollapse
            },
            set(v) {
                this.$store.state['app'].rightsidecollapse = v
            }
        },
        rightColumnData: {
            get() {
                return this.$store.state.order.rightColumnData
            },
            set(v) {
                this.$store.state.order.rightColumnData = v
            }
        },
        downlistData:{
            get() {
                return this.$store.state.order.downlistData
            },
            set(v) {
                this.$store.state.order.downlistData = v
            }
        }
    },
    data: function() {
        return {
            user:'',
            initData: {
                downListData:{}
            },
            codeImport:"",
            countData:null,
            total:[
                {label:'总计',value:'100.00'},
                {label:'未送货',value:'10.00'},
                {label:'未付款',value:'50.00'},
              ],
            rowId:"",
            sales_no:"",
            rowData:"",
            defaultData:{itemNo: "", describe: "", origin: "", brand: "", skuNo: "", skuName: "",flat:true}
        }
    },
    methods: {
        onRowclick(row){
            console.log(row);
            this.rowId=row.currentRow.id
            this.rightColumnData.rowid=row.currentRow.id
            this.sales_no=row.currentRow.sales_no
            this.rowData=row
            this.getOrderData(row.currentRow.id);
        },
        getTableData(val){
            // this.TableData=val
            this.codeImport=val.codeImport;
        },
        getOrderData(formid){
            var that = this ;//'order/salesGetData'
            this.rightColumnData.isAdd=false
            // this.rightColumnData.itemDetalls.tableData=[]
            this.$store.dispatch('order/salesGetData', formid).then(response => {
                if(response.code == 0){
                    console.log(response.data);
                    this.rightColumnData.order = this.sales_no;
                    // this.rightColumnData.order = response.data.order;
                    this.rightColumnData.step = response.data.order.status ;
                    this.rightColumnData.customer = response.data.customer ;
                    this.rightColumnData.itemDetalls.tableData = response.data.itemDetalls ;
                    this.rightColumnData.itemDetalls.tableData.push(this.defaultData);
                    this.rightColumnData.account=response.data.account
                    // this.rightColumnData.paymentRecelve = response.data.paymentRecelve ;
                    this.rightColumnData.otherInfo = response.data.otherInfo ;
                    if(this.rightColumnData.otherInfo.sale_date!=""&&this.rightColumnData.otherInfo.sale_date!=null&&this.rightColumnData.otherInfo.sale_date!=undefined){
                        var date = new Date(this.rightColumnData.otherInfo.sale_date*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var Y = date.getFullYear() + '-'
                        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
                        var D = date.getDate()
                        this.rightColumnData.otherInfo.sale_date=Y+M+D
                    }else if(this.rightColumnData.otherInfo.sale_date==0){
                        this.rightColumnData.otherInfo.sale_date=""
                    }
                    console.log(this.rightColumnData.otherInfo.sale_date)
                    this.rightsidecollapse = false ;
                }
            }).catch((error) => {
                console.log("login error...",error)
                this.$message.error(error);
            })
        },
        newclick(){
            console.log("newclick...");
            this.rightColumnData.rowid=""
            this.rightColumnData.isAdd=true
            this.rightsidecollapse = false ;
            this.rightColumnData.order = "新增销售单";
            this.rightColumnData.step = 0 ;
            this.rightColumnData.customer = {
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
            } ;
            this.rightColumnData.itemDetalls = {
                    tableData: [
                        {itemNo: "", describe: "", origin: "", brand: "", skuNo: "", skuName: "",flat:true}
                    ],
                } ;
            this.rightColumnData.otherInfo = {
                sales_user_id:"",
                sale_date:"",
                remarks:"",
            } ;
            this.rightColumnData.account={
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
            }
        },
        toSearch(){
            console.log("toSearch!!!!!")
            this.refreshTable()
        },
        refreshTable(){
            this.$refs.formTable.refreshTable();
        },
        currentChangeThisRow(){
            this.onRowclick(this.rowData)
        },
        clearCurrentRow(){
            this.$refs.formTable.clearCurrentRow()
        },
        currentChange(){
            this.$refs.formTable.currentChange()
        }
    },
    created() {
    },
    mounted() {
        this.$store.dispatch("order/downlistData").then(response => {
            console.log(response.data);
            this.initData.downListData = response.data
            this.downlistData=response.data
        }).catch(error => {
            console.log(error)
        })

        this.$store.dispatch("order/getCountData").then(response => {
            this.countData = response.data
        }).catch(error => {
            console.log(error)
        })

    },
}
</script>

<style >
.salesOrderStyle{
  /*  .order-title{
        height: 40px;
        line-height: 40px;
        padding: 5px 0 5px 15px;
    }
    .silder-block {
        height: 100%;
        overflow-y: auto;
    }
    .marginTD{
        margin: 5px 0 ;
    }
    .flexCenter{
        display: inline-block !important;
        align-items: none !important;
        justify-content: none !important;
    }
    .el-step__title.is-success {
        color: #2c99d4 !important;
    }
    .el-step__head.is-success {
        color: #2c99d4 !important;
        border-color: #2c99d4 !important;
    }
    .el-step__title.is-process {
        font-weight: 700;
        color: #e79d66 !important;
    }
    .el-step__head.is-process {
        color: #ffffff !important;
        border-color: #e79d66 !important;
    }
    .is-process>.el-step__icon{
        background: #e79d66;
    }
    .el-step__line {
        background-color: #2c99d4 !important;
    }
    .el-step__title{
        font-size: 12px !important;
        line-height: 18px !important;
    }
    .unfold-hint-block{
        min-width: 80px;
        height: 100%;
        border-radius: 5px;
        font-size: 12px;
        color: #fff;
        padding: 0px 7px;
        line-height: 20px;
    }
    .unfold-hint-A{
        height: 20px;
        display: inline-block;
    }
    .unfold-hint-B{
        height: 20px;
        display: inline-block;
    }
    .unfold-hint-A-block{
        background: #e79d66;
    }
    .unfold-hint-B-block{
        background: #2c99d4;
    }
    .unfold-hint-C{
        height: 18px;
        display: inline-block;
    }
    .unfold-hint-C-block{
        min-width: 18px;
        height: 18px;
        border-radius: 9px;
        background: #e79d66;
        font-size: 12px;
        color: #fff;
        padding: 5px;
        box-sizing: border-box;
    }
    .hinttext-num{
        width: 100% !important;
        height: 100% !important;
        display: flex;
        align-items: center;
    }
    .hinttext{
        text-align: center;
    }*/
}
</style>
