<template>
    <div class="customer">
        <el-form :label-position="'top'" :model="customerdata" label-width="130px" class="ex-form-responsive" rules="rules">
            <el-form-item label="客户名称" style="position:relative">
                <el-input class="customer_client" v-model="customerdata.customerName" @change="clientNameChange" clearable>
                    <el-button slot="append" type="primary"  @click.stop="addSelect"><i class="fa fa-list"></i></el-button>
                </el-input>
            </el-form-item>

            <el-dialog
                class="pub_dialog"
                title="选择客户"
                :visible.sync="dialogVisible"
                width="70%"
                append-to-body
                :close-on-click-modal="false">
                    <HeadSearch @toSearch="toSearch" :data="searchData" :advancedSearch='false' :placeholder="'客户编码/客户名称'"></HeadSearch>

                    <ElementTable class="eTables" :searchobj="searchobj" :columnsetid="'customer_choice'" :elColumns="elColumns" :height="450" @rowClick="rowClick" @handleSelectionChange="handleSelectionChange" :isChecked='false'  ref="multipleTable"></ElementTable>
                <span slot="footer" class="dialog-footer">
                    <el-button class="btn-light" @click="dialogVisible=false">关 闭</el-button>
                    <el-button type="primary" @click="saveSelect">确 定</el-button>
                </span>
            </el-dialog>

            <!-- <el-form :label-position="labelPosition" label-width="130px" ref="clientDataAddress" :model="customerdata" class="eForm ex-form-responsive"> -->
            <el-form-item label="联系地址" prop="country">
                <CascaderV name="country" :countryValue='customerdata.country' v-model="customerdata.country" @change="handleChange_country" :clearable="clearable"></CascaderV>

                <el-input v-model="customerdata.address" @change="addressChange" type="textarea" resize="none" rows="2" placeholder="详细地址" style="margin-top:10px" clearable></el-input>

            </el-form-item>

            <el-form-item label="联系人">
                <el-input class='inputStyle' placeholder="姓" v-model="customerdata.contact_name"  @change="contact_nameChange" clearable></el-input>
                <!-- <el-input class='inputStyle' placeholder="姓" v-model="customerdata.last_name"  @change="lastnameChange" clearable></el-input>
                <el-input class='inputStyle' style="margin-top:10px" placeholder="名" v-model="customerdata.first_name"  @change="firstnameChange" clearable></el-input> -->
            </el-form-item>

            <el-form-item label="办公电话">
                <el-input class='inputStyle' v-model="customerdata.office_phone" @change="officePhoneChange" clearable></el-input>
            </el-form-item>

            <el-form-item label="移动电话">
                <el-input class='inputStyle' v-model="customerdata.phone" @change="mobilePhoneChange" clearable></el-input>
            </el-form-item>

            <el-form-item label="传真">
                <el-input class='inputStyle' v-model="customerdata.fax" clearable @change="faxChange"></el-input>
            </el-form-item>

            <el-form-item label="电子邮箱">
                <el-input class='inputStyle' clearable v-model="customerdata.email" @change="emailChange"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ElementTable from "@/components/element-table.vue"
    import HeadSearch from "@/components/head-search-v1.vue"
    import CascaderV from '@/components/cascader-v.vue'
    //import ColumnStatusV1 from "./column-status-v1.vue"
    //Vue.component('ColumnStatusV1', ColumnStatusV1)
export default {
    // props:['customerdata','rowid'],
    props: {
      customerdata: {
        type: Object,
        default: {customerName:""}
      },
      rowid:{default:""}
    },
    components: {
      ElementTable,
      HeadSearch,
      CascaderV
    },
    data(){
        return {
            editIndex:null,
            setText:'',
            isShow:false,
            dialogVisible:false,
            searchobj:{},
            searchData: {
              tags: [],
              search_date: "",
              create_staff:"",
            },
            /*elColumns: [
            ],*/
            selectIds:[],
            rowData:[],
            labelPosition:"top",
            account:{
                id:"",
                account_name: "",
                account_acount: "",
                account_type:"",
            }
        }
    },
    computed:{
        rightColumnData:{
            get() {
                return this.$store.state.order.rightColumnData
            },
            set(v) {
                this.this.$store.state.order.rightColumnData = v
            }
        },
    },
    methods: {
        toSearch(data) {
            console.log("form-table-v1 toSearch ...", data)
            // this.searchobj = data
            this.$set(this,"searchobj",data)
            console.log(this.searchobj)
            this.$refs.multipleTable.refreshTabledata(1)
        },
        formatter(row, column, cellValue, index){
            let country = this.changeCountry(cellValue)
            return country
        },
        statusRender(row, column, cellValue, index){
            let status = cellValue == false? "禁用":"启用"
            return status
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
        //勾选
        handleSelectionChange(selection) {
            console.log(selection)
            this.rowData=selection
            let arr = []
            selection.forEach((item,index,array) => {
              arr.push(item.id)
            })
            this.selectIds = arr
            console.log(this.selectIds)
        },
        rowClick(event){
            console.log(event)
            this.rowData=[]
            this.rowData.push(event.currentRow)
            this.rowData[0].address=this.changeCountry(event.currentRow.country)
            console.log(this.rowData[0])
        },
        addSelect(){
            this.dialogVisible = true ;
        },
        saveSelect(){
            if(this.rowData.length==0){
                this.$notify.error({title:'提示',message:'请选择客户'})
                return false
            }
            this.$store.dispatch("order/getContactInfo",{id:this.rowData[0].id,country:this.rowData[0].address}).then(response => {
                if(response.code==0){
                    // this.rightColumnData.customer
                    this.customerdata.id=this.rowData[0].id
                    this.customerdata.customerName=response.data.clientName
                    this.customerdata.last_name=response.data.last_name
                    this.customerdata.contact_name=response.data.contact_name
                    if(response.data.address){
                        this.customerdata.address=response.data.address.address
                        this.customerdata.country=response.data.address.country
                    }else{
                        this.customerdata.country=[]
                        this.customerdata.address=""
                    }
                    this.customerdata.account_name=response.data.account.account_name
                    this.customerdata.account_acount=response.data.account.account_acount
                    this.customerdata.account_type=response.data.account.account_type
                    this.customerdata.first_name=response.data.first_name
                    this.customerdata.office_phone=response.data.office_phone
                    this.customerdata.phone=response.data.phone
                    this.customerdata.fax=response.data.fax
                    this.customerdata.email=response.data.email
                    this.dialogVisible=false
                    this.account=response.data.account
                    this.rightColumnData.account=response.data.account
                    for(var key in this.customerdata){
                        if(this.customerdata[key]==null){
                            this.customerdata[key]=""
                        }
                    }
                    this.update({
                        "client_id":this.rowData[0].id,
                        "address":this.customerdata.address,
                        "last_name":this.customerdata.last_name,
                        "first_name":this.customerdata.first_name,
                        "office_phone":this.customerdata.office_phone,
                        "phone":this.customerdata.phone,
                        "fax":this.customerdata.fax,
                        "email":this.customerdata.email,
                        "customerName":this.customerdata.customerName,
                        "country":this.customerdata.country,
                        "account_id":this.account.id,
                        "account_name":this.account.account_name,
                        "account_acount":this.account.account_acount,
                        "account_type":this.account.account_type,
                        "contact_name":this.customerdata.contact_name
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        },
        update(obj){
            console.log(this.rowid)
            if(!this.rowid){
                return false
            }
            var data={
                id:this.rowid,
                type:'custome',
                data:obj
            }
            this.$store.dispatch("order/salesUpdate",data).then(response => {
                if(response.code==0){
                    this.$notify.success({title:"提示",message:response.msg})
                    this.$emit('refreshTable')
                    setTimeout(()=>{
                        this.$emit('currentChangeThisRow')
                    },1000)
                }else{
                    this.$notify.error({title:'提示',message:response.msg})
                }
            }).catch(error => {
                console.log(error)
            })
        },
        handleChange_country(val){
            console.log(val)
            // this.customerdata.country = val
            // console.log(this.changeCountry(val))
            this.update({'country':val})
        },
        addressChange(val){
            this.update({'address':val})
        },
        lastnameChange(val){
            this.update({'last_name':val})
        },
        firstnameChange(val){
            this.update({'first_name':val})
        },
        officePhoneChange(val){
            this.update({'office_phone':val})
        },
        mobilePhoneChange(val){
            this.update({'phone':val})
        },
        faxChange(val){
            this.update({'fax':val})
        },
        emailChange(val){
            this.update({'email':val})
        },
        clientNameChange(val){
            this.update({'customerName':val})
        },
        contact_nameChange(val){
            this.update({'contact_name':val})
        }
    },
}
</script>

<style lang="scss">

</style>
