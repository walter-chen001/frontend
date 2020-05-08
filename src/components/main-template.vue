<template>
    <el-container>
        <LeftNav></LeftNav>
        <el-container>
            <el-header>
                <TopBar></TopBar>
            </el-header>
            <TabNav></TabNav>
            <el-main>
                <keep-alive :exclude="exclude">
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import '@/assets/css/theme.scss';
import '@/assets/css/base.scss';
import '@/assets/css/style.scss';
import '@/assets/css/elementui.plus.scss';

import TopBar from './top-bar.vue'
import TabNav from './top-nav.vue'
import LeftNav from './left.vue'

/*注册全局组件*/
import '@/utils/publicComponents'

export default {
    name: 'public_template',
    components: {
        TopBar,
        TabNav,
        LeftNav
    },
    data() {
        return {}
    },
    created() {

    },
    mounted() {

    },
    computed: {
        theme() {
            return this.$store.state.app.theme
        },
        exclude() {
            return this.$store.state.app.exclude
        }
    },
    watch: {

    },
    methods: {

    }
}
</script>
<style lang="scss">
#app,
.template-box {
    height: 100%;
}

.template-box {
    position: relative;
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

.el-container {
    height: 100%;
}

.el-aside {
    overflow: hidden;
}

.el-header {
    padding: 0px;
}

.el-main {
    overflow-y: hidden;
    height: 100%;
    background-color: #f1f3fa
}
</style>
