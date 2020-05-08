<template>
    <div class="middle-content-head head-total">
        <div class="main-top-box">
          <div class="main-top-item" v-for="(item, index) in total" :key="index">
            <div class="flex-group"><span class='flex-label bg-primary'>
              <!-- Total -->
                {{item.label}}
              </span>
              <div class="flex-group-fill flex-group-block"><span class="color-primary" style="float: right; font-size: 18px;">{{item.value}}</span></div>
            </div>
          </div>
      </div>
    
    </div>
</template>
<script>
// import JqxSplitter from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxsplitter.vue';

export default {
    props:['total'],
    components: {
        // JqxSplitter
    },
    data: function() {
        return {
          
        }
    },
    beforeCreate: function() {},
    methods: {
        resize(event){
          this.$emit("resize")
        },
        rightExpand(enable){
            console.log("rightExpand....");
            this.$refs.rightSplitter.expand();
            if(enable != undefined){
                if(enable){
                    this.$refs.rightSplitter.enable();
                }
            }
        },
        rightCollapse(disable){
            console.log("rightCollapse....");
            this.$refs.rightSplitter.collapse();
            if(disable != undefined){
                if(disable){
                    this.$refs.rightSplitter.disable();
                }
            }
        },
        rightDisable(){
            console.log("rightDisable....");
            this.$refs.rightSplitter.disable();
        }
    }
}
</script>
<style lang="scss">

.head-total {
    height: 50px;
    display: flex;
    align-items: center;
}

.head-total .main-top-box {
    flex: 1;
}

.head-total .btn-set {
    margin-right: 0;
    margin-left: 20px;
    margin-bottom: 10px;
}

.head-total .flex-group .flex-group-block{
    @include themify($themes) {
       border: 1px themed('primary') solid;
   }
}
</style>
