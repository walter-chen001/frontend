<template>
    <div class="template-box">
        <TopBar></TopBar>
        <div class="main-box">
            <JqxSplitter class="jqx-splitter-nested" :width="'100%'" :height="'100%'" :orientation="'vertical'"
                :panels="[{ size: 300,min: 300 }]">
                <div>
                    <LeftNav></LeftNav>
                </div>
                <div class="right-box">
                    <TabNav></TabNav>
                    <div class="main-content">
                        <router-view></router-view>
                    </div>
                </div>
            </JqxSplitter>
        </div>
    </div>
</template>
<script>

    import '@/assets/css/base.css'
    import '@/assets/css/style.css'
    import '@/assets/css/plus.css'
    import '@/assets/css/elementui.plus.css'
    import TopBar from './index/top-bar.vue'
    import TabNav from './index/tab-nav.vue'
    import LeftNav from './index/left.vue'
    //import JqxSplitter from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxsplitter.vue';

    export default {
        name: 'public_template',
        components: {
            JqxSplitter,
            TopBar,
            TabNav,
            LeftNav
        },
        data() {
            return {}
        },
        created() {
            console.log("public_template this.created...", this.$route);
            let obj = {}
            if (this.$route.path == "/") {
                // this.$router.push('/sales/isorder/index');
                // obj ={
                //     title:this.$t("system.salesform"),
                //     link:"/sales/isorder/index", 
                // }
            } else {
                obj = {
                    title: this.$t("system." + this.$route.meta.label),
                    link: this.$route.path,
                }
                this.$store.commit('changeTab', obj)
            }

            if (this.$route.meta.process) {
                let currentProcess = this.$route.meta.process
                this.$store.commit('SET_CURRENT_PROCESS', currentProcess)
            }

            /*获取页面基础数据*/
            this.$store.dispatch("common/getBaseData")

            /*获取红点数据*/
            // this.$store.dispatch("getFormTaskCount")
        },
        mounted() {
            console.log("public_template mounted...");
            this.$store.commit('setModuleNav', "2")
        },
        computed: {},
        watch: {
            $route(to, from) {
                console.log("public_template watch $route...", to)
                let currentProcess = to.meta.process || "6"
                if (currentProcess != this.$store.state.app.currentProcess) {
                    this.$store.commit('CHANGE_LEFT_NAV', currentProcess);
                }
                // this.$store.state.app.moduleID = to.meta.moduleID;
            }
        },
        methods: {}
    }
</script>
<style>
    html,
    body,
    #app,
    .template-box {
        height: 100%;
    }

    body {
        margin: 0;
    }

    .template-box {
        position: relative;
    }

    .top-bar {
        height: 30px;
        background-color: #3392CD;
    }

    .main-box {
        position: absolute;
        width: 100%;
        top: 30px;
        left: 0;
        bottom: 0;
        background-color: #81e0b9;
    }

    .right-box {
        position: relative;
    }

    .main-content {
        position: absolute;
        width: 100%;
        top: 42px;
        left: 0;
        bottom: 0;
    }
</style>