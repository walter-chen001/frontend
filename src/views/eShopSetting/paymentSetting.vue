<template>
    <!--<h3>Welcome to Payment Setting</h3>-->
    <el-row :gutter="0" type="flex" justify="center" class="centerSection">
        <div class="sectionContainer">
            <el-form ref="payments" :model="payments">
                <p>Available Payment Options</p>
                <el-checkbox :label="1" v-model="wechat_pay">WeChat Pay</el-checkbox>
                <el-checkbox :label="2" v-model="payPal">PayPal</el-checkbox>
                <el-checkbox :label="3" v-model="aliPay">AliPay</el-checkbox>
                <el-checkbox :label="4" v-model="stripe">Stripe</el-checkbox>
            </el-form>

            <el-tabs :tab-position="tabPosition" style="height: 200px;">
                <el-tab-pane label="WeChat Set Up">
                    <el-form ref="wechat" :model="wechat" :rules="rules">
                        <el-form-item label="WeChat ID">
                            <el-input v-model="wechat.id"></el-input>
                        </el-form-item>
                        <el-form-item label="Bank Account No">
                            <el-input v-model="wechat.bank_acc_no"></el-input>
                        </el-form-item>
                        <el-form-item label="IABN Number">
                            <el-input v-model="wechat.iabn_no"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Ali Pay Set Up">
                    <el-form ref="aliPay" :model="aliPay">
                        <el-form-item label="AliPay ID">
                            <el-input v-model="aliPay.id"></el-input>
                        </el-form-item>
                        <el-form-item label="Bank Account No">
                            <el-input v-model="aliPay.bank_acc_no"></el-input>
                        </el-form-item>
                        <el-form-item label="IABN Number">
                            <el-input v-model="aliPay.iabn_no"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Stripe Set Up">
                    <el-form :ref="stripe" :model="stripe">
                        <el-form-item label="Stripe ID">
                            <el-input v-model="stripe.id"></el-input>
                        </el-form-item>
                        <el-form-item label="Bank Account No">
                            <el-input v-model="stripe.bank_acc_no"></el-input>
                        </el-form-item>
                        <el-form-item label="IABN Number">
                            <el-input v-model="stripe.iabn_no"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "paymentSetting",
        data(){
            return{
                tabPosition: 'left',
                payments: {
                    wechat_pay: false,
                    payPal: false,
                    aliPay: false,
                    stripe: false,
                },
                wechat: {
                    id: null,
                    bank_acc_no: '',
                    iabn_no: '',
                },
                aliPay: {
                    id: null,
                    bank_acc_no: '',
                    iabn_no: '',
                },
                stripe: {
                    id: null,
                    bank_acc_no: '',
                    iabn_no: '',
                }
            }
        }
    }
</script>

<style scoped>
    .centerSection {
        margin: 35px;
    }
    .sectionContainer {
        width: 100%;
    }
</style>