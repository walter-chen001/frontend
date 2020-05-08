<template>
  <div class="top-nav-v1">
    <router-link to="/" tag="div" class="tabsFirst">
      <i class="fa fa-home"></i>
    </router-link>
    <!-- 左偏移动按钮 -->
    <button v-show="navBtnShow" :class="[{ disabled: !deviation }, 'pver_btn']" @click="nav_pver()"><i class="fa fa-backward"></i></button>
    <nav id="pageTabs">
      <div id="pageTabs-content" :style="{ marginLeft: -marval + 'px' }">
        <!-- <div :class="[index == 3 ? 'is-active' : '', 'tabsItem']" v-for="(list, index) in tablist" :key="index">
          <span class="tab-title">{{ list.title }}</span>
          <i class="fa fa-times-circle I_delete" v-on:click.stop.prevent="removetab(index)"></i>
        </div> -->
        <router-link tag="div" :to="list.link" :class="['tabsItem']" v-for="(list, index) in tablist" :key="index" @click.native="torouter(list)"">
          <span class="tab-title">{{ list.moduleName }}</span>
          <i class="el-icon-close I_delete" v-on:click.stop.prevent="removetab(list,index)"></i>
        </router-link>
      </div>
    </nav>

    <div class="rightMenu">
      <button v-show="navBtnShow" class="pver_btn" @click="nav_next"><i class="fa fa-forward"></i></button>
      <!-- <el-dropdown @command="opcommand" style="">
        <span class="el-dropdown-link">
          关闭操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">关闭所有选项卡</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他选项卡</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        deviation: 0,
        marval: 0,
        pageTabsWidth: 0,
        NavTabsWidth: 0,
      };
    },
    computed: {
      navBtnShow() {
        if(this.NavTabsWidth > this.pageTabsWidth){
          return true
        }else{
          this.marval = 0;
          return false
        }
      },
      tablist: {
        get: function() {
          return this.$store.state.app.tablist;
        },
        set: function(newValue) {
          this.$store.state.app.tablist=newValue;
        }
      },
      exclude:{
        get: function() {
          return this.$store.state.app.exclude;
        },
        set: function(newValue) {
          this.$store.state.app.exclude=newValue;
        }
      }
    },
    mounted() {
      this.getNavTabsWidth(); //dom挂载完获取tabs宽度总和
      window.onresize = () => {
        this.getNavTabsWidth();
      };
    },
    watch: {
      tablist() {
        this.getNavTabsWidth(); //当tablist变化（打开了tab,或者关闭了某个tab）,重新获得tabs宽度总和
      }
    },
    methods: {
      torouter(item){
        /*同步流程显示*/
        console.log("torouter....",item)
        if (item.type && item.type != this.$store.state.app.currentProcess) {
          this.$store.commit('CHANGE_LEFT_NAV', item.type);
        }
      },
      removetab(list,index) {
        console.log("removetab",list,index)
        let clink = this.tablist[index].link;
        this.tablist.splice(index, 1);
        //删除tab,取消组件缓存
        this.exclude.push(list.name);
        // tab无剩余 跳转首页
        if(this.tablist.length<1){
          this.$router.push("/");
          return
        }
        //有剩余
        if(this.tablist.length>=1){
          let pverLink;
          if(this.tablist.length==1){//剩余1个
            pverLink = this.tablist[0].link;
          }else{//剩余多个
            if(this.$router.currentRoute.path==clink){
              console.log(index,this.tablist.length)
              if(index>=this.tablist.length-1){
                pverLink = this.tablist[this.tablist.length-1].link;
              }
              if(index<this.tablist.length-1){
                pverLink = this.tablist[index].link;
              }
            }
          }
          if(pverLink){
            this.$router.push(pverLink);
          }
        }
      },
      opcommand(command) {
        switch (command) {
          case 'all':
            this.closeAll();
            break;
          case 'other':
            this.closeOther();
            break;
        }
      },
      closeAll() {
        this.tablist = [];
        this.marval = 0;
        this.$router.push("/");
      },
      closeOther() {
        console.log('关闭其他');
        if (this.tablist.length != 0) {
          this.tablist = this.tablist.filter((item)=>{
            return item.link ==this.$router.currentRoute.path
          })
          this.deviation=this.marval=0;
        } else {
          this.$router.push("/");
        }
      },
      //按钮偏移导航
      nav_pver() {
        if (!this.deviation) return;
        this.marval = --this.deviation * 300; //右偏移值，显示前面的tab
      },
      nav_next() {
        if ((this.deviation + 1) * 300 < this.NavTabsWidth) {
          //先试探偏移值是否小于总长
          this.marval = ++this.deviation * 300; //左偏移值,显示后面的tab
        }
      },
      //获取导航标签宽度和
      getNavTabsWidth() {
        this.$nextTick(() => {
          this.NavTabsWidth = document.getElementById('pageTabs-content').offsetWidth;
          this.pageTabsWidth = document.getElementById('pageTabs').offsetWidth;
        });
      }
    }
  };
</script>
<style lang="scss">

  /* nav style */
  .top-nav-v1 {
    position: relative;
    height: 45px;
    min-height: 45px;
    @include themify($themes) {
      // background-color: themed('primary');
    };
    border: 1px solid #eee;
    box-sizing: border-box;
    display: flex;

    .pver_btn {
      position: relative;
      width: 40px;
      height: 40px;
      border: none;
      outline: none;
      cursor: pointer;
      text-align: center;
      top: 0;
      background-color: #0000;
      @include themify($themes) {
        color: themed('secondaryText');
        // background-color: themed('primary');
      };
    }
    #pageTabs {
      overflow: hidden;
      display: flex;
      align-items: center;
      width: 100%;
      padding-left: 4px;
    }
    #pageTabs-content {
      display: flex;
      align-items: center;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .tabsFirst {
      white-space: nowrap;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }


    .tabsFirst.router-link-active {
      background: #0000;
      font-size: 24px;
      @include themify($themes) {
        color: themed('secondaryText');
      };


    }
    .tabsItem {
      border: 1px #eee solid;
      height: 30px;
      // line-height: 28px;
      border-radius: 2px;
      margin-right: 5px;
      padding: 0 20px;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 0 10px;
      @include themify($themes) {
        color: themed('placeholder');
        // background-color: themed('primarya');
        // border: 1px themed('secondaryText') solid;
      };
    }
    .tabsItem.router-link-exact-active:hover {
      @include themify($themes) {
        color: themed('primary');
      };
    }
    .tabsItem .I_delete {
      cursor: pointer;
      display: block;
      margin-left: 7px;
      @include themify($themes) {
        color: themed('secondaryText');
      };
    }
    .tabsItem > .I_delete:hover {
      @include themify($themes) {
        color: themed('primary');
      };
    }

    .tabsItem.router-link-active {
      @include themify($themes) {
        border: 1px themed('active') solid;
        background: themed('active');
      };
      color: #ffffff;
    }

    .tabsItem.router-link-active .I_delete{
      color: #ffffff;
    }

    .rightMenu {
      display: flex;
      align-items: center;
    }

    .rightMenu .el-dropdown{
      height: 100%;
      display: flex;
      align-items: center;
    }

    .rightMenu .el-dropdown-link{
      white-space: nowrap;
    }

    .tabsFirst.router-link-exact-active .fa{
      color:#0ACF97;
      @include themify($themes) {
        color: themed('active');
      };
    }
  }


</style>
