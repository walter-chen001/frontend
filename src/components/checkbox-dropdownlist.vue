<template>
    <div class="checkbox-drop" @click.stop.prevent>
        <el-popover :placement="placement" width="150" transition="el-zoom-in-top" :trigger="trigger">
            <el-checkbox-group v-model="values" @change="changevalue" :class="{'el-checkbox-nowrap':wrap}">
                <el-checkbox v-for="(item,key) in options" :label="item.value" :key="key" :disabled ="item.disabled == undefined  ? false : item.disabled">{{item.label}}</el-checkbox>
                <!-- <el-checkbox label="2">Top 10 Sales Chart</el-checkbox> -->
                <!-- <el-checkbox label="3">Delivery Tracking</el-checkbox> -->
                <!-- <el-checkbox label="4">Return Rate</el-checkbox> -->
                <!-- <el-checkbox label="5">Refund Rate</el-checkbox> -->
                <!-- <el-checkbox label="6">Regional Sales Distribution</el-checkbox> -->
            </el-checkbox-group>
            <div class="checkbox-icon" slot="reference">
                <i class="fa" :class="icon"></i>
            </div>
        </el-popover>
    </div>
</template>
<script>
/*
//使用方法
<CheckboxDropdownlist  v-model="values" :options="options"></CheckboxDropdownlist>

data() {
        return {
          values:['1','2','3'],
            options:[
            {label:"AAA1",value:"1"},
            {label:"AAA2",value:"2",disabled:true},
            {label:"AAA3",value:"3"},
            ]
        }
    },
 */

export default {
    props: {
        values: {
            type: Array,
            default: function() {
                return [];
            }
        },
        options: {
            type: Array,
            default: function() {
                return [{
                    label: "AAA1",
                    value: "1"
                }, {
                    label: "AAA2",
                    value: "2"
                }, {
                    label: "AAA3",
                    value: "3"
                }, ];
            }
        },
        /**
         * [wrap description]
         * @type {bool} 默认换行显示 
         */
        wrap: {
            default: true
        },
        icon: {
            default: 'fa-bars'
        },
        /**
         * [placement description]
         * @type {string}  bottom-start bottom bottom-end
         */
        placement: {
            default: 'bottom-end'
        },
        /**
         * [trigger description]
         * @type {string} click/focus/hover/manual
         */
        trigger: {
            default: 'click'
        }
    },
    model: {
        prop: 'values',
        event: "change"
    },
    data() {
        return {
            /**/
            // checkList: [],
            // show:false,
        }
    },
    methods: {
        // handleClose(val){
        //     if(val == 0){
        //         this.show = false ;
        //     }else{
        //         this.show = true ;
        //     }
        // },
        changevalue(e) {
            // this.$emit('checkVal',e);
            // this.$emit('update:value',e)
            this.$emit('change', e)
        }
    },
    mounted() {
        // var that = this ;
        // document.addEventListener('click',function(e){
        //     if(e.target.className!='checkbox-icon' && e.target.className!='fa fa-bars' && e.target.className!='el-checkbox-group' && e.target.className!='el-checkbox__label' && e.target.className!='el-checkbox__original' && e.target.className!='el-checkbox__inner' && e.target.className!='checkbox-block-item2'){
        //         that.show = false;
        //     }
        // })

        // this.$emit('update:value',"子组件的值")
    },
}
</script>
<style >
.checkbox-drop {
    width: 40px;
    height: 25px;
    position: relative;
    outline: none;
}

.checkbox-icon {
    width: 100%;
    height: 100%;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-checkbox-nowrap .el-checkbox {
    width: 100%;
    margin-right: 0;
}
</style>
