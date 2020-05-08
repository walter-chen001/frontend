<template>
    <div>
        <el-cascader v-model="values" ref="cascader" :placeholder="placeholder" @change="handleChange" :options="com_options"
            clearable :props="props" :disabled="IsDisabled" filterable style="width: 100%;">
        </el-cascader>
    </div>
   
</template>
<script>
    /*
      //使用方法 js

      import CascaderV from './cascader-v.vue'

      // html

      <CascaderV v-model="createForm.country_id" @change="handleChange" :placeholder="placeholder"></CascaderV>

      */
    export default {
        props: {
            values: {
                type: Array,
                default: function () {
                    return []  /*[1213000,1213003,131020245]  注: 数组里的类型必须和下拉数据一致 不然无法显示 */
                }
            },
            type: {
                default: 'country'  /*country  地址  industry 行业分类*/
            },
            url: {
                default: ''  /*设置URL 必须设置type 而且不能和已有的重复*/
            },
            placeholder: {
                default: ''
            },
            props: {
                type: Object,
                default: function () {
                    return { expandTrigger: 'hover' }
                }
            },
            IsDisabled: {
                default: false
            },
            countryValue: {
                type: Array,
                default: function () {
                    return []
                }
            },
            post_options: {
                default: []
            }
        },
        model: {
            prop: 'values',
            event: "change"
        }, watch: {
            countryValue(val) {
                this.values = []
                for (var i = 0; i < val.length; i++) {
                    this.values.push(Number(val[i]))
                }
            },
        },
        data() {
            return {}
        },
        computed: {
            com_options() {
                //有传入数据源，则用传入的数据源
                if (this.post_options.length > 0) {
                    return this.post_options;
                } else {
                    return this.options[this.type]
                }
            },
            options: {
                get() {
                    return this.$store.state.common.options
                },
                set(v) {
                    this.$store.state.common.options = v
                }
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            handleChange(val) {
                this.$emit("change", val);
            },
            initData() {
                if(this.post_options.length>0){
                    return false;
                }
                if (this.options[this.type] && this.options[this.type].length == 0) {
                    let tempurl = 'common/getCountryOptions'
                    switch (this.type) {
                        case "industry":
                            tempurl = 'common/getCompanyIndustryOptions'
                            break;
                    }
                    if (this.url && this.type != "country") {
                        tempurl = this.url
                    }
                    this.$store.dispatch(tempurl).then(response => {
                        console.log(tempurl + "获取级联数据...", response)
                        this.options[this.type] = response.data
                    })
                }

            },

        }

    }
</script>