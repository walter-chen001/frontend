<template>

    <el-row class="tac">
        <el-col :span="8">
            <h5>Without icons</h5>
            <el-menu default-active="2" class="el-menu-vertical-demo"
                     @select="handleOpen" @close="handleClose" theme="dark">
                <!--<el-submenu index="1">-->
                <!--<template slot="title">Navigator One</template>-->
                <!--<el-menu-item-group title="Group One">-->
                <!--<el-menu-item index="1-1">item one</el-menu-item>-->
                <!--<el-menu-item index="1-2">item two</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group title="Group Two">-->
                <!--<el-menu-item index="1-3">item three</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-submenu index="1-4">-->
                <!--<template slot="title">item four</template>-->
                <!--<el-menu-item index="1-4-1">item one</el-menu-item>-->
                <!--</el-submenu>-->
                <!--</el-submenu>-->
                <el-menu-item index="2">
                    <a href="/shop-setting" target="_self">Orders</a>
                    <!--<shop-setting />-->
                </el-menu-item>
                <el-menu-item index="3">Navigator Three</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "sideBar"
    }
</script>

<style scoped>

</style>