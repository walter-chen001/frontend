<template>
    <div class="reset-container-new">
        <el-form ref="resetForm" :model="resetForm" :rules="resetPwdRules" class="retrievePwd-form" auto-complete="on">
            <el-card style="width: 400px;border:0px solid #fff" shadow="never">
                <div slot="header" class="clearfix" style="background:#323A47">
                    <div class="menu-logo">
                        <img src="@/assets/img/logo.png" alt="logo" class="logo2">
                    </div>
                </div>

                <el-row>
                    <el-form-item label="重设密码" prop="password">
                        <el-input v-model="resetForm.password" type="password" placeholder="请输入密码且长度不小于6位"
                            auto-complete="off" @change="emailChange" />
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="确认密码" prop="confirmPwd">
                        <el-input v-model="resetForm.confirmPwd" type="password" placeholder="请再次输入密码"
                            auto-complete="off" @change="emailChange" />
                    </el-form-item>
                </el-row>

                <el-row style="margin: 0 -20px;">
                    <el-button :loading="loading"
                        style="width:100%;margin-bottom:30px;margin-top:15px;background: #323A47;color: #fff;border-radius: 3px;"
                        @click.native.prevent="submit('resetForm')">
                        {{loading?'拼命加载中...':'确认'}}
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
        name: 'resetPwd',
        components: {},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };

            var validateConfirm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else {
                    callback();
                }
            };

            return {
                resetForm: {
                    password: "",
                    confirmPwd: ""
                },
                resetPwdRules: {
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass
                    }],

                    confirmPwd: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateConfirm
                    }],
                },
                loading: false,
            }
        },
        mounted() {
            if (this.$route.params.account && this.$route.params.check_verify_code) {
                this.resetForm.account = this.$route.params.account
                this.resetForm.check_verify_code = this.$route.params.check_verify_code
            } else {
                this.$message({
                    message: '请不要搞破坏啊...',
                    type: 'error',
                    duration: 1200
                });
                var that = this
                setTimeout(() => {
                    that.$router.push('/loginNew');
                }, 1500);

            }
        },
        methods: {
            submit(formName) {
                var obj = {
                    username: this.resetForm.account,
                    verify_code: this.resetForm.check_verify_code,
                    password: this.resetForm.password,
                    confirm_password: this.resetForm.confirmPwd,
                }
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('auth/resetPassword', obj).then(response => {
                            if (response.code == 0) {
                                this.success("密码已修改")
                                setTimeout(() => {
                                    that.$router.push('/loginNew');
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

            registPage() {
                this.$router.push('/register');
            },
            loginPage() {
                this.$router.push('/login');
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

    .reset-container-new {
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100% - 296px);
    }

    .reset-container-new .el-card__header {
        padding: 0;
    }

    .reset-container-new .el-card__header .clearfix {
        padding: 15px;
    }

    .theme-default .reset-container-new .el-card__body {
        padding: 20px;
    }

    .reset-container-new .el-form-item__error {
        right: 0;
        top: 15%;
        left: auto;
    }
</style>