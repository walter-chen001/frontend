<template>
    <div class="results-box">
                <JqxSplitter class="jqx-splitter-nested" :width="'100%'" :height="'100%'" :orientation="'horizontal'" :panels="[{ size: 400,min: 100 },{ size: 100 ,min: 100}]">
                    <div class="splitter-panel">
                        <JqxSplitter class="jqx-splitter-nested" :width="'100%'" :height="'100%'" :orientation="'horizontal'" :panels="[{ size: 100,min: 50, collapsible: false },{ size: 300 ,min: 50,collapsed: false,collapsible:true}]">
                            <div class="splitter-panel" style="position: relative;">

                                <slot name="rsitem_a"></slot>
                            </div>
                            <div class="splitter-panel">
                                <slot name="rsitem_b"></slot>
                                <!-- <div class="template-box-y" style="padding: 0 15px;">
                                    <div class="ebix-flex">
                                        <el-card class="box-card ebix-card" style="min-width: 200px;flex:1;">
                                            <div slot="header" class="clearfix">
                                                <span>卡片名称</span>
                                                <span class="ebix-card-tool"><i class="el-icon-close ebix-button ebix-button--min--text "></i></span>
                                            </div>
                                                <div style="height: 100px;"></div>
                                        </el-card>
                                        <el-card class="box-card ebix-card" style="min-width: 200px;flex:1;">
                                            <div slot="header" class="clearfix">
                                                <span>卡片名称</span>
                                                <span class="ebix-card-tool"><i class="el-icon-close ebix-button ebix-button--min--text "></i></span>
                                            </div>
                                                <div style="height: 100px;"></div>
                                        </el-card>
                                    </div>
                                </div> -->
                            </div>
                        </JqxSplitter>
                    </div>
                    <div class="splitter-panel">
                        <slot name="rsitem_c"></slot>
                        <!-- <div style="height:100%;overflow-y: auto;padding: 15px;">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>卡片名称</span>
                                </div>
                                <EasyJqxgrid :columns="columns"></EasyJqxgrid>
                                <el-table :data="tableData" height="250" border style="width: 100%">
                                    <el-table-column prop="date" label="日期" width="180">
                                    </el-table-column>
                                    <el-table-column prop="name" label="姓名" width="180">
                                    </el-table-column>
                                    <el-table-column prop="address" label="地址">
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </div> -->
                    </div>
                </JqxSplitter>
            </div>
</template>
<script>
//import JqxSplitter from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxsplitter.vue';

export default {
    components: {
        //JqxSplitter
    },
    data: function() {
        return {

        }
    },
    beforeCreate: function() {},
    methods: {

    }
}
</script>
<style>

</style>
