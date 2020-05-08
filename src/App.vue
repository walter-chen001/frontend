<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'App',
    computed: {
    	theme(){
    		return this.$store.state.app.theme
    	}
    },
    mounted(){
    	document.getElementsByTagName('body')[0].setAttribute('class', "theme-default " + this.theme);
    }
}
</script>
