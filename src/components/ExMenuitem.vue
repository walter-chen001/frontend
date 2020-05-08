<template>
  <div >
    <slot></slot>
    <template v-if="!item.children || (item.children && item.children.length == 0) ">
      <el-menu-item :index="item.link" @click="itemclick(item)">
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{item.moduleName}}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="item.link">
      <template slot="title" >
       <i v-if="item.icon" :class="item.icon"></i>
       <span class="item-title">{{item.moduleName}}</span>
     </template>

     <template v-for="child in item.children">
        <ExMenuitem v-if="child.children&&child.children.length>0" :item="child" :key="child.itemID"/>
        <el-menu-item v-else :key="child.itemID" :index="child.link" @click="itemclick(child)">
         <i v-if="child.icon" :class="child.icon"></i>
         <!-- <i class="el-icon-location"></i> -->
         <span>{{child.moduleName}}</span>
       </el-menu-item>
     </template>
   </el-submenu>

 </div>
</template>

<script>
  export default {
    name: 'ExMenuitem',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods:{
      itemclick(event){
        this.$emit("itemclick",event)
      }
    }
  }
</script>
