<template>
    <div style=" margin-top: 30px; padding: 50px;">
        <el-card class="box-card">
            <el-form ref="shopData" :model="shopData" label-width="120px">
                <el-form-item label="E-Shop Name">
                    <el-col :span="10">
                        <el-input v-model="shopData.shop_name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="E-Shop logo">
                    <el-col :span="10">
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :file-list="fileList">
                            <el-button size="large"><i class="el-icon-upload2"></i></el-button>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item label="Languages">
                    <el-col :span="12">
                        <el-select v-model="language" multiple multiple-limit="3" placeholder="Select">
                            <el-option
                                    v-for="item in lang"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "shopSetting",
        data(){
            return {
                shopData: {
                    shop_name : null,
                },
                fileList:'',
                language:[],
                lang: [{
                    value: 'english',
                    label: 'English'
                }, {
                    value: 'chinese',
                    label: 'Chinese'
                },{
                    value: 'chinese traditional',
                    label: 'Chinese Traditional'
                },{
                    value: 'chinese cultured',
                    label: 'Chinese cultured'
                }, ],
            }
        },
        methods:{
            beforeRemove(file, fileList) {
                return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
            }
        }
    }
</script>

<style scoped>

</style>