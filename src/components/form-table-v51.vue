<template>
    <el-card class="ex-card-table">

        <div class="search-top">
            <div class="flexTop">
                <!-- <i class="mdi mdi-numeric-2-box"></i>
                <el-input placeholder="Search..." class="eInput"></el-input>
                <el-button class="searchButton" type="info" @click="dialogFormVisible = true">Advanced</el-button> -->
                <SearchFormV51 @toSearch="toSearch" :options='options'></SearchFormV51>
            </div>
            <div class="flexTopEnd">
                <el-tooltip class="item" effect="dark" :content="$t('system.newform')" placement="top-start">
                    <el-button class="buttonMarign" type="danger" @click.stop="newclick">
                        <i class="el-icon-document"></i>
                    </el-button>
                </el-tooltip>

                <print ref="print" :selectIds="selectIds" :tableDataUrl="'order/indexSalesTable'" :columns="elColumns" :searchData="searchData"></print><!-- 'itemMaster/excelData' -->

                <excel ref="excel" :selectIds="selectIds" :tableDataUrl="'order/indexSalesTable'" :columnoptions="listBoxSource" :searchData="searchData" :tableName="'销售单'"></excel><!-- 'itemMaster/excelData' excel-->

                <el-tooltip class="item" effect="dark" :content="$t('system.more')" placement="top-start">
                  <el-dropdown class="buttonMarign" trigger="hover" @command="handleCommand">
                    <el-button class="btn-light">
                      <i class = "el-icon-s-fold"></i>
                      <i class = "el-icon-caret-bottom"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="1">生成收款任务</el-dropdown-item>
                      <el-dropdown-item command="2">生成出库任务</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-tooltip>
            </div>
        </div>
         <!-- :url="'order/getTableData'" :tableData="tableData"-->
        <ElementTable
            class="eTables"
            :searchobj="searchobj"
            :columnsetid="'sales_index'"
            :elColumns="elColumns"
            :height="450"
            @rowClick="rowClick"
            @SelectAll="SelectAll"
            @handleSelectionChange="handleSelectionChange"
            @resetListBoxSource="resetListBoxSource"
            @update='getUpdate'
            ref="multipleTable">
            <template v-slot:editRow>
                <ColumnControl @delete="delSales"></ColumnControl>
            </template>
        </ElementTable>
    </el-card>
</template>


<script>
import ElementTable from "@/components/element-table.vue"
import SearchFormV51 from "@/components/search-form-v51.vue"
import print from "@/components/print.vue"
import excel from "@/components/excel.vue"
import { getAllCountryData } from "@/utils/address.js";
export default {
    props:['options','user'],
    components: {
      ElementTable,
      SearchFormV51,
      print,
      excel,
    },
    data() {
        return {
            columnsetid:"sales_order",
            dialogFormVisible: false,
            tableData:[],
            searchobj: {},
            searchData: {
                tags: [],
                // search_date: "",
                status:"",
                currency:"",
            },
            /*elColumns: [
            ],*/
            elColumns:[],
            idData:null,
            selectIds:[],
            listBoxSource: [], //存储列设置信息
            oldCurrentRow:{},
            data:[]
        }
    },
    computed:{
      rightsidecollapse:{
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
	},
    methods: {
        formatter(row, column, cellValue, index){
            let country = this.changeCountry(cellValue)
            return country
        },
          //传入国家地区id ,返回name
        changeCountry(arr) {
            var tmp = "";
            var data = getAllCountryData("cn");
            for (let index = 0; index < arr.length; index++) {
              const element = arr[index];
              data.forEach(ele => {
                if (element == ele.id) {
                  tmp = tmp + ele.name;
                  arr.length > index + 1 ? (tmp += " - ") : "";
                }
              });
            }
            return tmp;
        },
        //点击每行数据
        rowClick(row, column, event) {
            console.log("rowClick...............", row)

            // this.$store.commit("TOGGLE_RIGHTSIDE_COLLAPSE", false)
            // this.drawer = true
            // this.isCollapse = true
            // this.rightsidecollapse = false ;
            // console.log(this.rightsidecollapse);
            this.oldCurrentRow=row
            this.$emit('onRowclick',row);
        },
        SelectAll(selection) {
            console.log(selection)
            this.idData = selection ;
        },
        clearCurrentRow(){
            this.$refs.multipleTable.currentRow={}
        },
        newclick(){
            this.$refs.multipleTable.cancelSelected();
            this.$emit('newclick');
        },
        refreshTable(){
            this.$refs.multipleTable.getPageData(1);
        },
        currentChange(){
            var that=this
            setTimeout(()=>{
               this.$refs.multipleTable.currentChange(that.data[0],that.oldCurrentRow)
            },2000)
        },
        delSales(row){
            var id=row.id
            this.$confirm('是否确认删除此销售单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonClass:"btn-light",
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
                this.$store.dispatch("order/delete",{"id":id}).then(response => {
                    this.refreshTable()
                    if(response.code==0){
                        this.success(response.jmsg)
                        this.clearData()
                    }else{
                        this.error(response.jmsg)
                    }
                }).catch(error => {
                    console.log(error)
                })
            }).catch(() => {
              this.error('已取消操作')
            });

        },
        toSearch(data) {
            this.searchData={}
            console.log("form-table-v1 toSearch ...", data)
            // this.searchobj = data
            this.$set(this, "searchobj", data)
            this.searchData=data
            console.log(this.searchobj)
            this.$refs.multipleTable.refreshTabledata(1)
        },
        //勾选
        handleSelectionChange(selectItems) {
            this.selectIds = []
            selectItems.forEach(element => {
              this.selectIds.push(element.id)
            });
            console.log("selectIds", this.selectIds)
        },
        // 获取更新后的列设置信息，列印/导出用
        resetListBoxSource(arr) {
            this.elColumns=arr  //列印
            this.listBoxSource = []
            var obj = {}
            arr.forEach(element => {
              obj.label = element.title
              obj.value = element.field
              obj.checked = element.isShow
              this.listBoxSource.push(obj)
              obj = {}
            });
        },
        handleCommand(command){
            console.log(command)
            if(this.selectIds.length == 0){
              this.error("请选择要操作的行")
            }else {
                var api="";var str="";
              if(command==1){
                api="order/addInvoice"
                str="确认生成收款任务"
              }else if(command==2){
                api="order/addFormOut"
                str="确认生成出库任务"
              }
            this.$confirm(str, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass:"btn-light",
              type: 'warning',
              center: true
            }).then(() => {
                this.$store.dispatch(api,{"id_list":this.selectIds}).then(response => {
                if(response.code==0){
                    this.success(response.msg)
                    this.refreshTable()
                }else{
                    var arr=response.msg
                    if(arr instanceof Array){
                        for(let i=0;i<response.msg.length;i++){
                            setTimeout(()=>{
                                this.error(response.msg[i])
                            },i*150)
                        }
                    }else{
                        this.error(response.msg)
                    }
                }
              }).catch(error => {
                console.log(error)
              })
            }).catch(() => {
              this.error('已取消操作')
            });
            }
        },
        getUpdate(data){
            this.data=data.data
        },
        clearData(){
            this.rightColumnData.order=""
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
        success(msg) {
          this.$notify({
            title: "提示",
            message: msg,
            type: "success"
          });
        },
        error(msg) {
          this.$notify({
            title: "提示",
            message: msg,
            type: "error"
          });
        },
    },
    mounted() {

    },
}
</script>

<style lang="scss">

</style>
