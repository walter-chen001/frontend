<template>
    <div class="retrievePwd-container-new">
        <el-form ref="retrievePwdForm" :model="retrievePwdForm" :rules="retrievePwdRules" class="retrievePwd-form"
            auto-complete="on">
            <el-card style="width: 400px;border:0px solid #fff" shadow="never">
                <div slot="header" class="clearfix" style="background:#323A47;">
                    <div class="menu-logo">
                        <img src="@/assets/img/logo.png" alt="logo" class="logo2">
                    </div>
                </div>

                <el-row>
                    <el-form-item label="登录账号" prop="account">
                        <el-input v-model="retrievePwdForm.account" placeholder="请输入电子邮箱/手机号码" auto-complete="off"
                            @change="emailChange" />
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="验证码" prop="check_verify_code">
                        <el-col>
                            <el-input v-model="retrievePwdForm.check_verify_code" placeholder="请输入验证码" type="text"
                                auto-complete="off">
                                <template slot="append">
                                    <el-button v-if="timeBtn"
                                        style="width:120px;background:rgba(0,0,0,0.5);padding: 10px 20px;color:#fff">
                                        {{time+' s'}}</el-button>
                                    <el-button v-else type="primary" :loading="sendBtnLoad" :disabled="sendBtnLoad"
                                        @click="checkVerifyFunc"
                                        style="width:120px;padding: 10px 10px;background: #323A47;color: #fff;">
                                        {{sendBtnLoad?'':'发送验证码'}}</el-button>
                                </template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                </el-row>


                <el-row style="margin: 0 -20px;">
                    <el-button :loading="loading"
                        style="width:100%;margin-bottom:30px;margin-top:15px;background: #323A47;color: #fff;border-radius: 3px;"
                        @click.native.prevent="submit('retrievePwdForm')">
                        {{loading?'拼命加载中...':'下一步'}}
                    </el-button>
                </el-row>


                <el-row style="margin: 15px 0px;">
                    <div style="text-align: center">
                        <span style="color: #39AFD1;cursor: pointer;" @click="registPage">立即注册</span>/
                        <span style="color: #39AFD1;cursor: pointer;" @click="loginPage">立即登录</span>
                    </div>
                </el-row>


            </el-card>

        </el-form>
    </div>
</template>
<script>

    export default {
        name: 'loginNew',
        components: {},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };

            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };

            return {
                retrievePwdForm: {
                    account: '',
                    check_verify_code: ""
                },
                retrievePwdRules: {
                    account: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass
                    }],

                    check_verify_code: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateCode
                    }],
                },
                loading: false,
                time: 120,
                timeBtn: false,
            }
        },
        mounted() {
        },
        methods: {
            submit(formName) {
                var obj = {
                    username: this.retrievePwdForm.account,
                    verify_code: this.retrievePwdForm.check_verify_code
                }
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('auth/toVerify', obj).then(response => {
                            if (response.code == 0) {
                                setTimeout(() => {
                                    that.$router.push({ name: 'resetPwd', params: { account: this.retrievePwdForm.account, check_verify_code: this.retrievePwdForm.check_verify_code } })
                                }, 1000);
                            } else {
                                this.error(response.msg);
                            }
                            this.loading = false
                        }).catch((error) => {
                            console.log("error...", error)
                        })
                    }
                })
            },
            checkVerifyFunc() {
                if (this.check_email(this.retrievePwdForm.account) || this.check_phone(this.retrievePwdForm.account)) {
                    this.sendSMS()
                } else {
                    this.error("您的账号格式不正确")
                }
            },
            sendSMS() {
                var obj = {
                    username: this.retrievePwdForm.account,
                }
                this.$store.dispatch('auth/findPassword', obj).then(response => {
                    this.sendBtnLoad = false
                    if (response.code == 0) {
                        this.countdown()
                        this.success('验证码已经发送！')
                    } else {
                        this.error(response.msg)
                    }
                }).catch((error) => {
                    this.closecountdown()
                    this.error(error)
                    console.log("sendSMS error...", error)
                })
            },
            /*验证码倒计时*/
            countdown() {
                let that = this
                this.timeBtn = true
                this.timeDown = setInterval(function () {
                    if (that.time > 0) {
                        that.time--
                    } else {
                        that.closecountdown()
                    }
                }, 1000)
            },
            closecountdown() {
                clearInterval(this.timeDown);
                this.timeBtn = false
                this.time = 120
            },

            registPage() {
                this.$router.push('/register');
            },
            loginPage() {
                this.$router.push('/loginNew');
            },
            check_email(val) {
                var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (!regEmail.test(val)) {
                    return false
                } else {
                    return true
                }
            },
            check_phone(val) {
                var regPhone = /^1[0-9]{10}$/
                if (!regPhone.test(val)) {
                    return false
                } else {
                    return true
                }
            },

            success(msg) {
                this.$notify({
                    title: "提示",
                    message: msg,
                    type: "success"
                });
            },
            warning() {
                this.$notify({
                    title: "提示",
                    message: "请选择要操作的行",
                    type: "warning"
                });
            },
            error(msg) {
                this.$notify({
                    title: "提示",
                    message: msg,
                    type: "error"
                });
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    body {
        margin: 0;
    }

    .menu-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75px;
    }

    .menu-logo img {
        height: 25px;
    }

    .retrievePwd-container-new {
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100% - 296px);
    }

    .retrievePwd-container-new .el-card__header {
        padding: 0;
    }

    .retrievePwd-container-new .el-card__header .clearfix {
        padding: 15px;
    }

    .theme-default .retrievePwd-container-new .el-card__body {
        padding: 20px;
    }

    .retrievePwd-container-new .el-form-item__error {
        right: 0;
        top: 15%;
        left: auto;
    }

    .retrievePwd-container-new .el-form-item__label:before {
        content: '' !important
    }
</style>