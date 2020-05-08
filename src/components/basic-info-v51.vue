<template>
        <el-collapse v-model="activeName" class="silder_block" v-if="rightColumnData != '' && rightColumnData != null && rightColumnData != 'undefined'">

            <el-collapse-item :name="index+1"  v-for="(item, index) in children" :key="index">
                <template slot="title">
                   
                   <span style="margin-right: 10px;">{{item.title}}</span>
                   <span class="badge badge-danger">1</span>
                   <!--  <div class="unfold-hint-A flexCenter" v-if="item.title == 'Payment Recelve' && rightColumnData.paymentRecelve.outstanding == 1">
                        <div class="unfold-hint-block unfold-hint-A-block">
                            <div class="hinttext">Outstanding</div>
                        </div>
                    </div> -->
                    <!-- <div class="unfold-hint-B flexCenter" v-if="item.title == 'Dellvery' && rightColumnData.dellvery.deliveried == 1">
                        <div class="unfold-hint-block unfold-hint-B-block">
                            <div class="hinttext">Deliveried</div>
                        </div>
                    </div>
                    <div class="unfold-hint-C flexCenter" v-if="true">
                        <div class="unfold-hint-C-block">
                            <div class="hinttext-num">{{rightColumnData.documents.recentNumber}}</div>
                        </div>
                    </div> -->
                </template>
                <div class="item-block">
                   <component
                        ref="orderitem"
                        :is="item.tplname"
                        :customerdata="rightColumnData.customer"
                        :rowDataformid="rowDataformid"
                        :otherInfo='rightColumnData.otherInfo'
                        :downlistData="downlistData"
                        :rowid="rightColumnData.rowid"
                        :account="rightColumnData.account"
                        @setCustomer="setCustomer"
                        :tabledata='rightColumnData.itemDetalls.tableData'
                        :moneyData='rightColumnData.paymentRecelve.data'
                        :pointSetting="pointSetting"
                        :inputFormidData='rightColumnData.documents.recentDocuments'
                        @refreshTable='refreshTable'
                        @currentChangeThisRow='currentChangeThisRow'
                    ></component>
                </div>
            </el-collapse-item>

        </el-collapse>
</template>

<script>
import CustomerV51 from "@/components/customer-v51.vue";
import TableV51 from "@/components/table-v51.vue";
import MoneyV51 from "@/components/money-v51.vue";
import OtherInfoV51 from "@/components/other-info-v51.vue";
export default {
    components: {
        CustomerV51,
        TableV51,
        MoneyV51,
        OtherInfoV51,
    },
    props:['children',"rowId"],
    data() {
        return {
            activeName:[1,2,3,4],
            rowDataformid:'',
            rowDataid:'',
            pointSetting:{}
        }
    },
    computed: {
        rightColumnData() {
            return this.$store.state.order.rightColumnData
        },
        downlistData() {
            return this.$store.state.order.downlistData
        },
    },
    mounted(){
        this.$store.dispatch("parameter/getData").then(response => {
            this.pointSetting=response.data
        }).catch(error=>{
            console.log(error)
        })
    },
    methods: {
        checkVal(e){
            console.log(e);
        },
        setCustomer(clientvalue){
            this.$store.dispatch('order/setCustomer', {id:this.rowDataid,customer:clientvalue}).then(response => {
                // this.refreshTable()
            }).catch((error) => {
                console.log("login error...",error)
                this.$message.error(error);
            })
        },
        refreshTable(){
            this.$emit('refreshTable')
        },
        currentChangeThisRow(){
            this.$emit('currentChangeThisRow')
        }
    },
}
</script>

