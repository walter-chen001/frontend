<template>
    <div class="right" style="width: 77%;">
        <el-card class="box-card" style="height: 800px;">
            <div slot="header" class="clearfix"
                style="height: 55px;display: flex;justify-content: space-between;align-items:center">
                <div style="font-size: 16px;">更改密码</div>
                <!-- <span class="el-icon-setting font-primary"
                            style="font-size: 16px;background: #eee;padding: 5px;"></span> -->
            </div>

            <div class="right-main updatePwdForm" style="font-size: 15px;color: #94939D;">
                <el-form :rules="upadtePwd_rules" :model="upadtePwd_form" ref="upadtePwd_form">
                    <el-row style="margin: 20px 0;">
                        <el-col :span="23">
                            <el-form-item label="当前密码" prop="oldpassword">
                                <el-input v-model="upadtePwd_form.oldpassword" type="password">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin: 20px 0;">
                        <el-col :span="23">
                            <el-form-item label="新密码" prop="newpassword">
                                <el-input v-model="upadtePwd_form.newpassword" type="password">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin: 20px 0;">
                        <el-col :span="23">
                            <el-form-item label="确认密码" prop="newpassword_confirmation">
                                <el-input v-model="upadtePwd_form.newpassword_confirmation" type="password">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row style="border-bottom: 1px solid #EBEEF5;margin: 0 -20px;"></el-row>

                    <el-row style="margin: 20px 0;text-align: right;">
                        <el-col :span="23">
                            <el-form-item>
                                <el-button :loading="loading" type="primary"
                                    @click.native.prevent="submit('upadtePwd_form')">
                                    {{loading?'拼命加载中...':'更改密码'}}
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'upadtePwd',
        components: {},
        data() {
            var oldpasswordPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入当前密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码不能小于6位'))
                } else {
                    callback();
                }
            };
            var newpasswordPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码不能小于6位'))
                } else {
                    callback();
                }
            };
            var newpassword_confirmationPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value != this.upadtePwd_form.newpassword) {
                    callback(new Error('确认密码与新密码不一致'));
                }
                else {
                    callback();
                }
            };
            return {
                upadtePwd_rules: {
                    oldpassword: [{
                        required: true,
                        trigger: 'blur',
                        validator: oldpasswordPass
                    }],
                    newpassword: [{
                        required: true,
                        trigger: 'blur',
                        validator: newpasswordPass
                    }],
                    newpassword_confirmation: [{
                        required: true,
                        trigger: 'blur',
                        validator: newpassword_confirmationPass
                    }],
                },

                upadtePwd_form: {
                    oldpassword: "",
                    newpassword: "",
                    newpassword_confirmation: "",
                },
                loading: false
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            submit(formName) {
                var obj = {
                    oldpassword: this.upadtePwd_form.oldpassword,
                    newpassword: this.upadtePwd_form.newpassword,
                    newpassword_confirmation: this.upadtePwd_form.newpassword_confirmation
                }
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('auth/updatePassword', obj).then(response => {
                            if (response.code == 0) {
                                this.success("密码修改成功")
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
        }
    }
</script>
<style>

.updatePwdForm .el-form-item__label:before {
        content: '' !important
    }
</style>