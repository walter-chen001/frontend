<template>
  <!--左侧导航开始-->
  <ExMenu :data="leftNav" :isCollapse='menucollapse' :class="'el-menu-vertical-demo heightAll'">
    <div class="menu-logo">
      <el-image  class="logoPN" :src="company_info.logo" fit="cover" v-if="!menucollapse"></el-image>
    </div>
    <div class="menuHeader" v-if="!menucollapse">
        <el-select
        v-if="topMenu.children.length != '0'"
        style="width:100%;"
        class="ex-input-links"
        :popper-append-to-body="false"
        v-model="currentProcess"
        @change="changeProcess"
        >
          <el-option v-for="item in topMenu.children" :key="item.value" :label="item.moduleName" :value="item.value"></el-option>
        </el-select>
    </div>
  </ExMenu>

</template>
<script>
  import ExMenu from '@/components/ExMenu.vue'
  export default {
    components: {
      ExMenu
    },
    data() {
      return {
        isCollapse: false,
      }
    },
    computed: {
      currentProcess: {
        get() {
          return this.$store.state.app.currentProcess
        },
        set(v) {
          this.$store.state.app.currentProcess = v
        }
      },

      menucollapse() {
        let bool = this.$store.state.app.menucollapse == "collapse" ? true : false

        /*In tablet size, the left navigation menu is always hidden*/
        if (this.ispad) {
          bool = true
        }

        //console.log("left menucollapse ...", bool, "this.ispad", this.ispad)  //for debug
        return bool
      },
      company_info(){
        return this.$store.state.user.company_info
      },
      leftNav() {
        return this.$store.state.app.leftNav
      },
      topMenu(){
        return this.$store.state.app.topMenu
      },
      ispad() {
        return this.$store.state.app.ispad
      }
    },
    methods: {
      /*Switch the process, switch the left navigation menu according to the process*/
      changeProcess(val) {
        this.$store.commit('CHANGE_LEFT_NAV', val)
      }
    }
  }
</script>
<style lang="scss">
.theme-default {
  .menu-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }

  .menu-logo img {
    height: 25px;
  }

  .el-badge__content {
    border: none;
    border-radius: 4px;
    background: #0acf97;
  }

  .el-breadcrumb__inner {
    color: #8391a2;
  }

  .el-dropdown-link {
    color: #8391a2;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-width: 250px;
    min-height: 400px;
  }

  .el-menu-vertical-demo.el-menu--collapse {
    min-width: 64px;
  }

  .el-menu-vertical-demo.el-menu--collapse .el-submenu__title {
    padding: 0 !important;
    text-align: center;
  }

  .el-menu-vertical-demo.el-menu--collapse .el-tooltip {
    padding: 0 !important;
    text-align: center;
  }

  .heightAll {
    height: 100%;
    overflow-y: auto;
  }

  .heightAll>li>ul>li .el-menu-item-group__title {
    padding: 0px;
  }

  .menuHeader {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
  }

  .menuHeader .el-breadcrumb {
    margin-left: 20px;
  }

  .el-menu--collapse .menuHeader {
    justify-content: center;
  }

  .el-menu--collapse .menu-logo .logoPN {
    display: none;
  }

  .el-menu--collapse .el-breadcrumb {
    display: none;
  }

  .el-menu--collapse .el-badge {
    display: none;
  }

  .menu-logo .ex-menu-icon,
  .menuHeader .ex-menu-icon {
    font-size: 18px;
    color: #909399;
  }

}
</style>