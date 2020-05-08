<template>
    <el-form :label-position="'top'" :model="account" label-width="130px" class="ex-form-responsive" style="margin-bottom: 20px;" rules="rules">
        <div class="money">
            <ul>
                <li>
                    <div class="money-title">{{"总计"}}</div>
                    <div class="money-num">
                        <div class="money-num-block money-num-currency">{{account.currency}}</div>
                        <div class="money-num-block money-num-text textcolorA">{{account.total}}</div>
                    </div>
                </li>
                <li>
                    <div class="money-title">{{"未收金额"}}</div>
                    <div class="money-num">
                        <div class="money-num-block money-num-currency">{{account.currency}}</div>
                        <div class="money-num-block money-num-text textcolorB">{{account.unpaidAmount}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <el-form-item label="货币">
            <el-select style="width:100%" v-model="account.currency" @change="currencyChange" clearable>
                <el-option v-for="(option, index) in downlistData.currencyDownLis" :key="index" :label="option.label" :value="option.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="account.account_name" @change="nameChange" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号">
            <el-input v-model="account.account_acount" @change="accountChange" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select style="width:100%" v-model="account.account_type" @change="typeChange">
                <el-option v-for="(option, index) in downlistData.accountType" :key="index" :label="option.label" :value="option.value" clearable></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="运费">
            <el-input v-model="account.fare" @change="fareChange" clearable></el-input>
        </el-form-item>
        <el-form-item label="税金">
            <el-input v-model="account.tax" @change="taxChange" clearable></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: ['account', 'rowid', 'downlistData', 'pointSetting'],
    data() {
        return {
            item: {
                currency: "CNY",
                num: "1000.00",
            }
        }
    },
    methods: {
        update(type, obj) {
            if (!this.rowid) {
                return false
            }
            var data = {
                id: this.rowid,
                type: type,
                data: obj
            }
            this.$store.dispatch("order/salesUpdate", data).then(response => {
                if (response.code == 0) {
                    this.$notify.success({
                        title: "提示",
                        message: response.msg
                    })
                    this.$emit('refreshTable')
                    if (type == "order") {
                        setTimeout(() => {
                            this.$emit('currentChangeThisRow')
                        }, 1000)
                    }
                } else {
                    this.$notify.error({
                        title: '提示',
                        message: response.msg
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        },
        nameChange(val) {
            this.update('custome', {
                "account_name": val
            })
        },
        accountChange(val) {
            this.update('custome', {
                "account_acount": val
            })
        },
        typeChange(val) {
            this.update('custome', {
                "account_type": val
            })
        },
        fareChange(val) {
            var value = this.toFixed(val, this.pointSetting.price)
            this.update('order', {
                "fare": value
            })
        },
        taxChange(val) {
            var value = this.toFixed(val, this.pointSetting.price)
            this.update('order', {
                "tax": value
            })
        },
        currencyChange(val) {
            this.update('order', {
                "currency": val
            })
        },
        toFixed(number, precision) {
            var arr = number.toString().split(".")
            var length;
            if (arr[1] == undefined) {
                length = 0
            } else {
                length = number.toString().split(".")[1].length
            }
            if (length > Number(precision)) {
                var str = number + ''
                var len = str.length
                var last = str.substr(len - 1, len)
                if (last == '5') {
                    last = '6'
                    str = str.substr(0, len - 1) + last
                    return Number(str - 0).toFixed(precision)
                } else {
                    return Number(number).toFixed(precision)
                }
            } else {
                return Number(number).toFixed(precision)
            }

        },
    }
}
</script>
<style lang="scss">
$AColor: #2c99d4;
$BColor: #e79d66;
.flexCenter {
    display: flex;
    align-items: center;
    justify-content: center;
}

.textcolorA {
    color: $AColor;
}

.textcolorB {
    color: $BColor;
}

.money {
    width: 100%;
    overflow: hidden;
    ul {
        margin: 0;
        padding: 0;
        li {
            list-style: none;
            width: calc(50% - 2px);
            height: 60px;
            float: left;
            border-bottom: 2px solid #e7e7e7;
            font-weight: bold;
            .money-title {
                width: 100%;
                height: 50%;
                line-height: 30px;
                text-align: left;
                font-weight: bold;
                font-size: 13px;
                padding-left: 10px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .money-num {
                width: 100%;
                height: 50%;
                position: relative;
                display: flex;
                align-items: center;
                font-size: 15px;
                .money-num-block {
                    max-width: 50%;
                    position: absolute;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .money-num-currency {
                    left: 10px;
                }
                .money-num-text {
                    right: 10px;
                }
            }
        }
        li:nth-of-type(odd) {
            border-right: 2px solid #e7e7e7;
        }
    }
}
</style>
