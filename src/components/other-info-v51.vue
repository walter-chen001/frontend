<template>
    <el-form :label-position="'top'" :model="otherInfo" label-width="130px" class="ex-form-responsive" rules="rules">
        <el-form-item label="销售人员">
            <el-select clearable filterable v-model="otherInfo.sales_user_id" class="flex-group-auto" @change="salesManChange" style="width: 100%;">
                <el-option-group v-for="group in downlistData.staffDownLis" :key="group.title" :label="group.title">
                    <el-option v-for="item in group.data" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-option-group>
            </el-select>
        </el-form-item>
        <el-form-item label="销售日期">
            <el-date-picker v-model="otherInfo.sale_date" type="date" style="width:100%" placeholder="请选择销售日期" value-format="yyyy-MM-dd" clearable @change="salesDateChange">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
            <textarea v-model="otherInfo.remarks" class="form-ele-fill" rows="3" @change="remarksChange" clearable></textarea>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props: ['otherInfo', 'rowid', 'downlistData'],
    data() {
        return {
            recordStaffData: [],
            labelPosition: "top",
        }
    },
    methods: {
        update(obj) {
            console.log(this.rowid)
            if (!this.rowid) {
                return false
            }
            var data = {
                id: this.rowid,
                type: 'order',
                data: obj
            }
            this.$store.dispatch("order/salesUpdate", data).then(response => {
                if (response.code == 0) {
                    this.$notify.success({
                        title: "提示",
                        message: response.msg
                    })
                    this.$emit('refreshTable')
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
        salesManChange(val) {
            this.update({
                "sales_user_id": val
            })
        },
        salesDateChange(val) {
            console.log(val)
            this.update({
                "sale_date": val
            })
        },
        remarksChange(val) {
            var value = val.target.value
            this.update({
                "remark": value
            })
        }
    }
}
</script>
