<template>
    <el-container>
       <side-nav-bar></side-nav-bar>
        <el-container>
            <el-main>
                <keep-alive :exclude="exclude">
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import ToolBar from "./header/toolBar";
    import SideNavBar from "./sideBar/sideNavBar";
    export default {
        name: "shopSettingIndex",
        components: {SideNavBar, ToolBar},
        computed: {
            exclude() {
                return this.$store.state.app.exclude
            }
        },
    }
</script>

<style scoped>

</style>