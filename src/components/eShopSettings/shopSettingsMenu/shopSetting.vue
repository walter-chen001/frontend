<template>
    <h3>Welcome to our Company</h3>
</template>

<script>
    export default {
        name: "shopSetting",
        data(){
            return {
                ishead:false,
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

<style scoped>

</style>