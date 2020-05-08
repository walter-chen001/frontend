<template>
    <div class="login-container-new">
        <el-form ref="loginFrom" :model="loginFrom" :rules="loginRules" class="login-form" auto-complete="on"
            @submit.native.prevent>
            <el-card style="width: 400px;border:0px solid #fff" shadow="never">
                <div slot="header" class="clearfix" style="background:#323A47;">
                    <div class="menu-logo">
                        <img src="@/assets/img/logo.png" alt="logo" class="logo2">
                    </div>
                </div>

                <el-row>
                    <el-form-item label="账号登录" prop="account">
                        <el-input @keyup.enter.native="submitlogin('loginFrom')" v-model="loginFrom.account"
                            placeholder="请输入电子邮箱/手机号码" auto-complete="off" @change="emailChange" />
                        <div style="color: #39AFD1;text-align: right;margin: 0 -5px -20px 0px;">
                            <span @click="retrievePwd" style="cursor: pointer;">忘记密码？</span>
                        </div>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="登录密码" prop="password">
                        <el-input @keyup.enter.native="submitlogin('loginFrom')" v-model="loginFrom.password"
                            type="password" placeholder="请输入密码且长度不小于6位" auto-complete="new-password" />
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item prop="remember">
                        <el-checkbox @keyup.enter.native="submitlogin('loginFrom')" v-model="loginFrom.remember"
                            @change="remember_account"><span style="color: #606266;">记住账号</span>
                        </el-checkbox>
                    </el-form-item>
                </el-row>

                <el-row style="margin: 0 -20px;">
                    <el-button :loading="loading"
                        style="width:100%;margin-bottom:30px;margin-top:15px;background: #323A47;color: #fff;border-radius: 3px;"
                        @click.native.prevent="submitlogin('loginFrom')">
                        {{loading?'拼命加载中...':'登录'}}
                    </el-button>

                </el-row>

                <el-row style="margin: 15px 0px;">
                    <div style="text-align: center;font-size: 15px;color: #8b8b8b;">其他登录方式</div>
                </el-row>

                <el-row style="margin: 15px 0px;">
                    <div style="text-align: center">
                        <img src="@/assets/otherLogin.jpg" alt="">
                    </div>
                </el-row>

                <el-row style="margin: 15px 0px;">
                    <div style="text-align: center">
                        <span>没有账号？</span><span style="color: #39AFD1;cursor: pointer;" @click="registPage">立即注册</span>
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
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };

            return {
                loginFrom: {
                    account: '',
                    password: '',
                    remember: true

                },
                loginRules: {
                    account: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass
                    }],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass2
                    }],

                },
                loading: false,
                redirect: undefined
            }
        },
        mounted() {
            this.getCookie();
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            remember_account(val) {
                if (val) {
                    this.setCookie(this.loginFrom.account)
                } else {
                    this.clearCookie()
                }
            },
            //设置cookie
            setCookie(c_name, exdays = 1) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "account" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                // window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function () {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'account') {
                            this.loginFrom.account = arr2[1]; //保存到保存数据的地方
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function () {
                this.setCookie("account", "", -1); //修改2值都为空，天数为负1天就好了
            },
            submitlogin(formName) {
                var obj = {
                    username: this.loginFrom.account,
                    password: this.loginFrom.password,
                }
                console.log("postdata...", obj)
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //记住账号
                        this.loginFrom.remember ? this.setCookie(this.loginFrom.account) : "";
                        this.loading = true
                        this.$store.dispatch('LoginByUsername', obj).then(response => {
                            console.log("register response...", response);
                            if (response.code == 0) {
                                that.$router.push('/')
                                // this.success("登录成功")
                                // setTimeout(() => {
                                //     that.$router.push('/')
                                // }, 1000);
                            } else {
                                this.error(response.msg);
                            }
                            this.loading = false
                        }).catch((error) => {
                            this.loading = false
                            this.error(error.msg);
                            console.log("error...", error)
                        })
                    }
                })
            },

            retrievePwd() {
                this.$router.push('/retrievePwd');
            },
            registPage() {
                this.$router.push('/register');
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
    .login-container-new {
        height: 100%;
        display: flex;
        background-color: #fff;
        justify-content: center;
        align-items: center;
        min-height: calc(100% - 296px);
    }




    .login-container-new .el-card__header {
        padding: 0px;
    }

    .login-container-new .el-card__header .clearfix {
        padding: 15px;
    }

    .login-container-new .el-card__body {
        padding: 20px;
    }

    .login-container-new .el-form-item__error {
        right: 0;
        top: 15%;
        left: auto;
    }

    .login-container-new .el-form-item__label:before {
        content: '' !important
    }

    .login-container-new .theme-hyper .el-card {
    }
</style>