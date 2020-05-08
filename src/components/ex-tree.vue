<template>
    <div class="extree">
        <div class="extree-item" :class="collapseStatus(item)" v-for="(item, index) in list" :key="index">
            <div class="extree-item-title" v-if="item.children.length <= 0">
                <span style="margin-left:10px;" :class="getstatusclass(item)" @click="setStatus(item)">
                    {{item.title}}AAA
                </span>
            </div>
            <div class="extree-item-title" v-if="item.children.length > 0" >
                <span >
                    <i :class="item.extend == 0 ?'el-icon-arrow-right':'el-icon-arrow-down'" @click="setExtend(item)"></i> 
                    <span @click="setStatus(item,$event)"  :class="getstatusclass(item)">{{item.title}}DDDD</span>
                </span>
            </div>
            <div v-if="item.children.length > 0 " class="extree-item-children">
                <ExTree :list="item.children" @getitem="gettreeitem"></ExTree>
            </div>
        </div>
    </div>
</template>
<script>
import ExTree from "./ex-tree.vue";
export default {
    name: 'ExTree',
    props: {
        list: {
            type: Array,
            default: function() {
                return []
            }
        },
        values: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    model:{
      prop:"values",
      event: "selected"
    },
    components: {
        ExTree,
    },
    data() {
        return {
            current: null,
            setlist: [],
            // values:["Electronics01","Apple01"],
        }
    },
    mounted() {
      console.log("extree mounted...",this.list);
    },
    methods: {
        setStatus(item,event) {
            console.log("setStatus...", item.itemid);
            // var list = this.list;
            // item.status = 1;
                this.$emit('getitem', item.itemid);
            // if (item.children.length <= 0 && item.status == 0) {
            //     item.status = 1;
            //     this.$emit('getitem', item);
            // } else if (item.children.length <= 0 && item.status == 1) {
            //     item.status = 0;
            //     this.$emit('getitem', 'none', 2);
            // }
            this.$emit('selected', [item.itemid])
        },
        forextend(list) {
          console.log("forextend...",list);
            // for (var i in list) {
            //     list[i].extend = 0;
            //     // list[i].status = 0;
            //     this.forextend(list[i].children);
            // }
        },
        setExtend(item) {
            // var list = this.list;
            // var title = item.title;

            if (item.extend == 0) {
                // this.forextend(list);
                item.extend = 1;
                // this.$emit('getitem', item, 0);
            } else {
                item.extend = 0;
                // this.$emit('getitem', 'none');
            }
        },
        gettreeitem(data, num) {
            if (num != null && num != '' && num != 'undefined') {
                this.$emit('getitem', data, num);
            } else {
                this.$emit('getitem', data);
            }
        },
        getstatusclass(item){
          // console.log("getstatusclass.......this.values:",this.values);
          // console.log("getstatusclass.......item.itemid:",item.itemid);
          let tempclass =""
            for (var i = 0; i < this.values.length; i++) {
               console.log("SSSSSSSSSS.......this.values:",this.values[i],"  item.itemid:",item.itemid);
              if(item.itemid == this.values[i]){
                tempclass = "extree-itemBg-block extree-itemBg"
              }
              
            }
            return tempclass
            // return item.status == 1?'extree-itemBg-block extree-itemBg':'extree-itemBg-block'
        },
        collapseStatus(item){
            // return ''
            return item.extend == 1 ? '' : 'collapse-in'
        },
        dbclick(){
          console.log("dbclick...");
        },
        findTopParent(menuJson, childId) {
            let menuStr = JSON.stringify(menuJson);
            let reg = new RegExp('itemid":"([^"]+)"[^\\}\\]]+itemid":"' + childId);
            // console.log("DDDDDDDDDDDD:",menuStr.match(reg))
            return reg.test(menuStr) ? menuStr.match(reg)[1]: undefined;
        }
    },
}
</script>
<style >
.extree {
    width: 100%;
}

.extree-item {
    width: 100%;
}

.extree-item-title {
    width: 100%;
    padding: 3px 0 3px 14px;
    color: #333333;
    cursor: default;
}

.extree-item-children {
    width: 100%;
    padding: 3px 0 3px 20px;
    color: #333333;
}

.extree-itemBg-block {
    min-width: 90px;
    padding: 2px 5px;
    color: #333333;
    border-radius: 5px;
    display: inline-block;
    cursor: pointer;
}

.extree-itemBg {
    background: #2c99d4;
    color: #ffffff !important;
}

.collapse-in .extree-item-children{
  display: none;
}
</style>
