<template>
  <RightSide v-model="embed" :control="rightColumnData.isAdd">
    <template slot="head">
        {{rightColumnData.order}}
    </template>

    <template slot="body">
        <div class="silder_block" v-for="(item, index) in layout.right.children" :key="index">
            <component 
                ref="bomitem"
                :is="item.tplname"
                :children="item.children"
                :rowId="rowId"
                @refreshTable='refreshTable'
                @currentChangeThisRow='currentChangeThisRow'>
            </component>
        </div>
    </template>

    <template slot="footer">
        <el-button type="primary" v-if="rightColumnData.isAdd" @click="newAddOrder">保存</el-button>
    </template>
    
  </RightSide>
</template>
<script>
import RightSide from "@/components/right-side.vue"
import BasicInfoV51 from "@/components/basic-info-v51.vue"
export default {
    props:['initial','rowId'],
    components: {
        RightSide,
        BasicInfoV51,
    },
    props:[],
    data() {
        return {
            
        }
    },
    computed: {
      embed: {
        get() {
          return this.$store.state['app'].rightside_embed
        },
        set(v) {
          this.$store.state['app'].rightside_embed = v
        }
      },
      layout(){
        return this.$store.state.order.initData.layout
      },
      columnname() {
        return this.$store.state.order.initData.layout.right.tplname
      },
      // rightColumnData() {
      //   return this.$store.state.order.rightColumnData
      // }
      rightColumnData:{
        get() {
            return this.$store.state.order.rightColumnData
        },
        set(v) {
            this.this.$store.state.order.rightColumnData = v
        }
    },
    },
    methods:{
        newAddOrder(){
            var customerName=this.rightColumnData.customer.customerName
            console.log(this.rightColumnData.customer.customerName=="")
            if(customerName==""||customerName==undefined||customerName==null){
                this.$notify.error({title:'提示',message:'客户名称不能为空'})
                return false
            }
            this.rightColumnData.customer.sales_user_id=this.rightColumnData.otherInfo.sales_user_id
            this.rightColumnData.customer.sale_date=this.rightColumnData.otherInfo.sale_date
            this.rightColumnData.customer.remarks=this.rightColumnData.otherInfo.remarks
            this.rightColumnData.customer.account_acount=this.rightColumnData.account.account_acount
            this.rightColumnData.customer.account_name=this.rightColumnData.account.account_name
            this.rightColumnData.customer.account_type=this.rightColumnData.account.account_type
            this.rightColumnData.customer.fare=this.rightColumnData.account.fare
            this.rightColumnData.customer.tax=this.rightColumnData.account.tax
            this.rightColumnData.customer.currency=this.rightColumnData.account.currency
            var data={
                order:this.rightColumnData.order,
                step:this.rightColumnData.step,
                rowid:this.rightColumnData.rowid,
                isAdd:this.rightColumnData.isAdd,
                customer:this.rightColumnData.customer,
                itemDetalls:{
                    tableData: [],
                },
                paymentRecelve:this.rightColumnData.paymentRecelve,
                dellvery:this.rightColumnData.dellvery,
                documents:this.rightColumnData.documents,
                otherInfo:this.rightColumnData.otherInfo,
                account:this.rightColumnData.account
            }
            var arr=this.rightColumnData.itemDetalls.tableData
            for(var i=0;i<arr.length;i++){
                if(i!=arr.length-1){
                    data.itemDetalls.tableData.push(arr[i])
                }
            }
            var that = this ;
            this.$store.dispatch("order/salesAdd",data).then(response => {
                console.log(response.code==0)
                if(response.code==0){
                    this.$emit('clearCurrentRow')
                    this.success(response.msg)
                    this.rightColumnData.isAdd=false
                    this.rightColumnData.rowid=response.data.id
                    this.$emit('currentChange')
                    this.refreshTable();
                }else{
                    this.$notify.error({title:'提示',message:response.msg})
                }
            }).catch(error => {
                console.log(error)
            })
        },
        currentChangeThisRow(){
            this.$emit('currentChangeThisRow')
        },
        success(msg) {
          this.$notify({
            title: "提示",
            message: msg,
            type: "success"
          });
        },
        refreshTable(){
            this.$emit('refreshTable')
        }
    },
}
</script>
<style lang="scss">

</style>
