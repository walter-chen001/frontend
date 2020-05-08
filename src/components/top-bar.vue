<template>
  <div class="topBarBox">
    <span v-if="!ispad" class="menu-switch" @click="menuSwitch">
      <i class="fa" :class="[{'fa-reorder':isCollapse !='uncollapse'},{'fa-ellipsis-v':isCollapse =='uncollapse'}]"></i>
    </span>

    <div class="topbar-right">
      <el-select v-if="companyLanguage.length>0" style="width:90px;" class="ex-input-link" v-model="language" placeholder="请选择"
        :popper-append-to-body="false" @change="changeLanguage">
        <el-option v-for="item in companyLanguage" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-menu mode="horizontal" @select="handleSelect" class="menuLine">
     
      <el-submenu index="4" id="avatar">
        <template slot="title">
          <el-avatar :size="'small'">
            <img :src="user.imgUrl" alt="">
          </el-avatar>
          <span class="topBarName">{{user.name}}</span>
        </template>

        <el-submenu v-if="themeList.length>0" index="4-6" class="zhankai-left">
          <template slot="title">
            <i class="fa fa-th iconMargin"></i>
            <span>切换主题</span>
          </template>
          <el-menu-item @click="switchTheme(item.value)" v-for="(item,index) in themeList" :key="index"
            :index="'4-6-'+index">{{item.label}}</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-5">
          <i class="fa fa-sign-out iconMargin"></i>
          <span>登出</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'zh_cn',
          label: '简体'
        }, {
          value: 'zh_tw',
          label: '繁体'
        }, {
          value: 'en',
          label: 'English'
        }],
        themeList: [
          {
            value: 'theme-hyper',
            label: '紫色'
          }, {
            value: 'theme-yellow',
            label: '橙色'
          }]
      }

    },
    computed: {
      isCollapse: {
        get() {
          return this.$store.state.app.menucollapse
        },
        set(v) {
          this.$store.state.app.menucollapse = v
        }
      },
      theme: {
        get() {
          return this.$store.state.app.theme
        },
        set(v) {
          this.$store.state.app.theme = v
        }
      },
      language: {
        get() {
          return this.$store.state.app.language
        },
        set(v) {
          this.$store.state.app.language = v
        }
      },
      companyLanguage() {
        return this.$store.state.app.companyLanguage
      },
      ispad() {
        return this.$store.state.app.ispad
      },
      user() {
        return this.$store.state.user.user
      },
    },
    mounted() {
    },
    methods: {

      //切换主题
      switchTheme(theme_id) {
        this.theme = theme_id
        document.getElementsByTagName('body')[0].setAttribute('class', "theme-default " + this.theme);
        localStorage.setItem('ebixtheme', this.theme);
      },

      menuSwitch() {
        let temp = "uncollapse";
        if (this.isCollapse == "uncollapse") {
          temp = "collapse";
        } else {
          temp = "uncollapse";
        }
        this.isCollapse = temp;
        localStorage.setItem('menucollapse', temp)

      },
      changeLanguage(language) {
        this.$i18n.locale = language
        localStorage.setItem("lang", language)
        // location.reload()  /*Language pack to refresh backend data*/
      },
      handleSelect(event) {
        console.log("topbar click ...", event)
        switch (event) {
          case "4-5":
            this.logout();
            break;
        }
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      },
      addTab() {
        console.log('dddddd')
        this.$store.commit("ADD_TAB", { link: "/userInfo/index", moduleName: "个人档案" ,name:'userInfo'})
      },
      success(msg) {
        this.$notify({
          title: "提示",
          message: msg,
          type: "success"
        });
      },
      warning() {
        this.$notify({
          title: "提示",
          message: "请选择要操作的行",
          type: "warning"
        });
      },
      error(msg) {
        this.$notify({
          title: "提示",
          message: msg,
          type: "error"
        });
      },
    },
  }
</script>
<style lang="scss">
  .topbar-right {
    display: flex;
    align-items: center;
  }

  .fSize25 .el-badge__content,

  .is-dot {
    background: #fa5c7c;
    margin-top: 23px;
    margin-right: 10px;
  }

  .topbar-right .el-select {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .theme-text {
    @include themify($themes) {
      color: themed('primary');
    }
  }
  .topBarName{
    margin-left: 10px;
  }


  /* 向左边展开 */
  .zhankai-left .el-menu--horizontal {
    left: -208px !important;
  }
</style>
