<template>
    <!--<h3>Welcome to Payment Setting</h3>-->
    <el-row :gutter="0" type="flex" justify="center" class="centerSection">
        <div class="sectionContainer">
            <el-form ref="payments" :model="payments">
        <el-checkbox :label="1" v-model="wechat_pay">Quantity Box</el-checkbox>
        <el-checkbox :label="2" v-model="payPal">Allow Product Reviews</el-checkbox>
        <el-checkbox :label="3" v-model="aliPay">Auto Approve Reviews</el-checkbox>
        <el-checkbox :label="4" v-model="stripe">Enable Wishlist</el-checkbox>
            </el-form>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "paymentSetting",
        data(){
            return{
                payments: {
                    wechat_pay: false,
                    payPal: false,
                    aliPay: false,
                    strip: false,
                }
            }
        }
    }
</script>

<style scoped>
    .centerSection {
        margin: 35px;
    }
</style>