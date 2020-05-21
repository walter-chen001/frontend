<template>
    <section>
        <main-contents ref="maincontent">
            <template slot="main">
                <el-menu default-active="1" class="el-menu-vertical-demo heightAll"
                         @select="handleSelect" @close="handleClose" theme="dark">
                    <el-menu-item index="1" @click="goto('shopSetting')">
                        Shop Setting
                    </el-menu-item>
                    <el-menu-item index="2" @click="goto('storeSetting')">
                        Store Setting
                    </el-menu-item>
                    <el-menu-item index="3" @click="goto('paymentSetting')">
                        Payment Setting
                    </el-menu-item>
                    <el-menu-item index="4" @click="goto('productSetting')">
                        Product Setting
                    </el-menu-item>
                    <el-menu-item index="5" @click="goto('domainSetting')">
                        Domain Setting
                    </el-menu-item>
                    <el-menu-item index="6" @click="goto('seoSetting')">
                        SEO Setting
                    </el-menu-item>
                    <el-menu-item index="7" @click="goto('sslSetting')">
                        SSL Setting
                    </el-menu-item>
                    <el-menu-item index="8" @click="goto('publishSetting')">
                        Publish Setting
                    </el-menu-item>

                </el-menu>
            </template>
            <template slot="right">
                <component :is="path"></component>
            </template>
        </main-contents>
    </section>
</template>

<script>
    import shopSetting from '../shopSettingsMenu/shopSetting.vue';
    import storeSetting from '../shopSettingsMenu/storeSetting.vue';
    import paymentSetting from '../shopSettingsMenu/paymentSetting.vue';
    import productSetting from '../shopSettingsMenu/productSetting.vue';
    import domainSetting from '../shopSettingsMenu/domainSetting.vue';
    import seoSetting from '../shopSettingsMenu/seoSetting.vue';
    import sslSetting from '../shopSettingsMenu/sslSetting.vue';
    import publishSetting from '../shopSettingsMenu/publishSetting.vue';
    import MainContents from "../../main-contents";

    export default {
        name: "sideNavBar",
        components: {
            MainContents,
            shopSetting,
            storeSetting,
            paymentSetting,
            productSetting,
            domainSetting,
            seoSetting,
            sslSetting,
            publishSetting,
        },
        data() {
            return {
                path: '',
            }
        },
        methods: {
            goto(val){
                this.path = val;
            }
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>