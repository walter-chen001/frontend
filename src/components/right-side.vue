<template>
  <transition name="slide-fade" mode="out-in">
    <div class="rightSide" :class="{'right-side-embed':embedRs =='embed','right-side-collapsein':isCollapseRs,'right-side-collapseout':!isCollapseRs,'right-side-control':control}" :style="getStyle()" @click.stop>
      <!--<el-button :icon="!embed?'el-icon-menu':'el-icon-more'" class="rightside-switch" @click.stop="change" circle>
      </el-button>-->
      <el-dropdown trigger="click" class="rightside-switch" @command="handleCommand" placement="bottom-start">
        <el-button :icon="'el-icon-menu'"  circle> </el-button>
        <!-- <el-button :icon="embed =='embed'?'el-icon-menu':'el-icon-location-information'"  circle> </el-button> -->
        <el-dropdown-menu slot="dropdown" class="rightside-switch-dropdown">
          <!-- el-icon-lock -->
          <el-dropdown-item v-if="!ispad" command="lock">
            <div style="padding: 0 15px;">
               <i :class="embed =='embed'?'el-icon-unlock':'el-icon-lock'"></i>
               <span v-if="embed =='embed'">{{$t("system.unlock")}}</span>
               <span v-else>{{$t("system.lock")}}</span>
            </div>
            
          </el-dropdown-item>
          <!--<el-dropdown-item icon="fa fa-th">30%</el-dropdown-item>
          <el-dropdown-item icon="fa fa-th-list">40%</el-dropdown-item>
          <el-dropdown-item icon="fa fa-pause">50%</el-dropdown-item>
          <el-dropdown-item icon="fa fa-reorder">70%</el-dropdown-item>-->
          <el-dropdown-item command="30p" >
            <el-radio v-model="rightsidewidth" :label="0.3" @change="changewidth">30%</el-radio>
          </el-dropdown-item>
          <el-dropdown-item command="40p" >
            <el-radio v-model="rightsidewidth" :label="0.4" @change="changewidth">40%</el-radio>
          </el-dropdown-item>
          <el-dropdown-item command="50p">
            <el-radio v-model="rightsidewidth" :label="0.5" @change="changewidth">50%</el-radio>
          </el-dropdown-item>
          <el-dropdown-item v-if="embed =='unembed'" command="75p">
            <el-radio v-model="rightsidewidth" :label="0.75" @change="changewidth">75%</el-radio>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <slot name="ibox">

        <div class="rightside-head">
          <slot name="head"><span style="font-size: 16px;line-height: 30px"></span></slot>
        </div>
        <slot name="ibody">
          <div class="rightside-body">
            <slot name="body"> </slot>
          </div>
        </slot>
        <slot name="ifooter">
          <div class="rightside-foot">
           <slot name="footer"> </slot>
         </div>
       </slot>
     </slot>
   </div>
 </transition>
</template>
<script>
  import {uuid} from "@/utils/tool.js"
  export default {
    props: {
      embed: {
        default: 'unembed',
      },
      control:{default:true}
    },
    model: {
      prop: 'embed',
      event: "change"
    },
    computed: {

      isCollapse: {
        get() {
          return this.$store.state['app'].rightsidecollapse
        },
        set(v) {
          this.$store.state['app'].rightsidecollapse = v
        }
      },
      rightsidewidth: {
        get() {
          return Number(this.$store.state['app'].rightsidewidth)
        },
        set(v) {
          this.$store.state['app'].rightsidewidth = Number(v)
        }
      },
      ispad(){
         return this.$store.state.app.ispad
      },
      menucollapse() {
        return this.$store.state.app.menucollapse
      },
      isCollapseRs(){
        let bool = this.isCollapse
         if(this.embed =="embed" && !this.ispad){
            bool = false
         }
         return bool
      },
      embedRs(){
        let str = this.embed
          if(this.ispad){
              str ="unembed"
          }
          return str
      }
     
    },
   
    watch:{
      isCollapse(v){
        // console.log("watch isCollapse xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",v,this.rightsideID)
      },
      winwidth(){}
    },
    data() {
      return {
        rwtype:0.5,
        rightsideID:"",
      }
    },
    mounted: function() {
      console.log("right-side....mounted.....")
      /*生成唯一ID*/
      this.rightsideID =  uuid(8,8)

    },
    methods: {
      getStyle(){
        let stylestr = {} ;
        if(this.embed =="embed"){
           let pt = Number(this.rightsidewidth) * 100
           stylestr = {width:pt+"%"}
        }else{
           let  leftmenuwidth = '250px';

           if(this.menucollapse =="collapse" || this.ispad){
                leftmenuwidth = '64px'
           } 
           // console.log("this.menucollapse xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",this.menucollapse,leftmenuwidth)
           stylestr = {width:"calc((100% - "+leftmenuwidth+") *"+this.rightsidewidth+")"}
        }
        // console.log("right-side根据右边栏状态获取样式:",stylestr,this.rightsidewidth,this.embed)
        return  stylestr
      },
      change(e) {
        let bool =""
         if(this.embed =="embed"){
           bool = "unembed"
         }else{
           bool = "embed"
         }
        this.$emit('change', bool)
        // console.log("right-side改变右边栏是否嵌入 bool：",bool)
        localStorage.setItem('rightsideembed',bool)
        // console.log("right-side改变右边栏是否嵌入：",this.embed,this.rightsidewidth)
        if(bool =="embed" && this.rightsidewidth == 0.75){
           this.rightsidewidth = 0.5
        }
      },
      changewidth(val){
          this.rightsidewidth = val
          localStorage.setItem('rightsidewidth',val)
      },
      handleCommand(command){
        // console.log(command)
        if(command == "lock"){
          this.change()
        }
      }

    },
  }
</script>
<style lang="scss">
.theme-default{
.rightSide {
    width: calc((100% - 250px) * 0.5);
    min-width: 357px;
    position: fixed;
    right: 0px;
    top: 105px;
    // z-index: 1;
    height: calc(100% - 105px);
    background: #fff;
    transition: all .3s ease;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
  }

  .rightside-head {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 5px;
    font-weight: bold;
    font-size: 14px;
  }

  .rightside-foot {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
  }

  .rightside-body {
    height: calc(100% - 60px);
    overflow-y: auto;
  }

  .right-side-control .rightside-body {
    height: calc(100% - 120px);
  }

  .rightside-body .el-collapse {
    margin: 0 10px;
  }

.rightside-switch {
  position: absolute!important;
  top: 12px;
  left: 10px;
}

.rightside-switch button{
  border: unset;
  background: unset;
}
.rightside-switch-dropdown .el-dropdown-menu__item{padding: 0;}
.rightside-switch-dropdown .el-dropdown-menu__item label{padding: 0 15px;}

.rightside-head {
  padding-left: 50px;
}

.right-side-embed{
   position: relative;
   top: initial;
    height: 100%;
}

.right-side-collapsein{
  /*display: none;*/
  right: -120%;
}

.right-side-collapseout{
  right: 0;
}

.rightSide .rightside-foot{display: none;}
.right-side-control .rightside-foot{display: flex;}
}
</style>
