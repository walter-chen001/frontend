<template>
	<i class="fa fa-circle" :class="[getcolor()]" :title="title"></i>
</template>
<script>
	export default{
		props:{
			data:{
				type:Object,
				default:function(){return {}}
			},
			other:{
				type:[Object],
				default:function(){
					return {
						"true":"上架",
						"false":"下架"
					}
				},
				// validator: function (value) {

				// 	return value ||{
				// 		"true":"sdsd",
				// 		"false":"sdfds"
				// 	}
				// }
			}
		},
		data(){
			return{
				title:""
			}
		},
		methods:{
			getcolor(){
				// console.log("getcolor........",this.data)
				let temptitle = this.other || {} 
				let color = this.data.row.status ? 'color-green' : 'color-red'
				// this.title = this.data.row.status  ? '上架' : '下架'
				this.title = this.other[this.data.row.status]
				return color
			}
		}
	}
</script>