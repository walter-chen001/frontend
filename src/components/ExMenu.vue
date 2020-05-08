<template>
  <el-menu :class="menuclass" router :collapse="isCollapse" mode="vertical"
    background-color="#313a46" text-color="#8391a2" active-text-color="#FFFFFF">
    <slot></slot>

    <!-- 顶级菜单 -->
    <el-submenu v-if="menucollapse" index="0">
      <template slot="title">
        <i v-if="topMenu.icon" :class="topMenu.icon"></i>
        <span class="item-title">{{topMenu.moduleName}}</span>
      </template>

      <template v-for="(child,index) in topMenu.children">
        <el-menu-item :key="child.value" @click="changeTopMenu(child.value)">
          <i v-if="child.icon" :class="child.icon"></i>
          <span>{{child.moduleName}}</span>
        </el-menu-item>
      </template>
    </el-submenu>

    <!-- <ExMenuitem v-if="menucollapse" v-for="menu in topMenuList" :key="index" :item="menu" @itemclick="sortclick(menu.value)">
          <slot name="menuitem"></slot>
        </ExMenuitem> -->

    <ExMenuitem v-for="menu in menus" :key="menu.itemID" :item="menu" @itemclick="itemclick">
      <slot name="menuitem"></slot>
    </ExMenuitem>

  </el-menu>
</template>
<script>
  import ExMenuitem from './ExMenuitem'

  export default {
    name: 'ExNavmenu',
    components: {
      ExMenuitem
    },
    props: {
      data: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      },
      isCollapse: {
        default: false
      },
      menuclass: {
        default: "ex-navmenu-one"
      }
    },
    data() {
      return {
      }
    },
    computed: {
      menus() {
        let temp = this.data
        return temp
      },
      menucollapse() {
        let bool = false
        if (this.$store.state.app.menucollapse == "collapse") {
          bool = true
        }

        if (this.ispad) {
          bool = true
        }
        //console.log("menucollapse xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", bool, "this.ispad", this.ispad)
        return bool
      },
       topMenu: {
        get() {
          return this.$store.state.app.topMenu
        },
        set(v) {
          this.$store.state.app.topMenu = v
        }
      },

    },
    mounted() {
      console.log("ExMenu mounted...", this.menus)

    },
    methods: {
      sortclick(value) {
        event.preventDefault()//非IE浏览器
      },
      itemclick(event) {
        console.log("itemclick..............", event);
        this.$store.commit("ADD_TAB", event)
      },
      changeTopMenu(value) {
        this.$store.commit('CHANGE_LEFT_NAV', value)
      },

    }
  }
</script>
<style>
  .el-menu--collapse .el-submenu__icon-arrow {
    display: none;
  }

  .el-menu--collapse .item-title {
    display: none;
  }

  .ex-navmenu-one:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }

  /*.el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}*/
</style>
