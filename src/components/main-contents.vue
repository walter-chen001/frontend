<template>
  <div class="template-box" style="display: flex;">
    <div class="middle-content" style="flex:1;" :class="{'un-head':!ishead}">
      <slot name="main"></slot>
    </div>
    <slot name="right"></slot>
    <!-- <div class="middle-footer">2019 - 2020 EBIX</div> -->
  </div>
</template>
<script>
  export default {
    props:{},
    data(){
      return {
        ishead:false
      }
    },
    computed: {
      rightside_embed() {
        return this.$store.state['app'].rightside_embed
      }
    },
    mounted() {
      if($(".middle-content-head") && $(".middle-content-head").length >0){
        this.ishead = true
      }
    }
  }
</script>
