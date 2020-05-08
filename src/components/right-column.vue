<template>
    <div class="template-box">
        <div class="right-column-head">
            <i class="el-icon-plus ebix-button--mini"></i>
        </div>
        <div class="right-column-content">
            
        </div>
        <div v-if="control" class="right-column-footer">
            <button>SS</button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        control:{default:true}
    },
    computed:{
        
    },
    data() {
        return {

        }
    },
    mounted: function() {}
}
</script>
