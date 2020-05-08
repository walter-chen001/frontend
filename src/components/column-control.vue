<template>
	<el-table-column :label="label" :header-align="align" :width="width">
		<template slot-scope="scope">
			<div class="column-control-box">
				<slot></slot>
				<i v-if="isedit" class="el-icon-edit-outline color-info" @click.stop="editrow(scope.row)"></i>
				<i v-if="isdel" class="el-icon-delete-solid color-danger" @click.stop="delrow(scope.row)"></i>
			</div>
		</template>
	</el-table-column>
</template>
<script>
	/*
	//调用方式
	<template v-slot:editRow>
	  	<ColumnControl @delete="delDepart"></ColumnControl>
	</template>
	 */
	export default{
		props:{
			label:{default:"操作"},
			align:{default:"center"},
			width:{default:""},
			isdel:{default:true},
			isedit:{default:false},
			data:{
				type:Object,
				default:function(){return {}}
			}
		},
		data(){
			return{
				title:""
			}
		},
		methods:{
			delrow(data){
				console.log("delrow...",data)
				this.$emit('delete',data)
			},
		}
	}
</script>
<style>
	.column-control-box{display: flex;justify-content:center;}
	.column-control-box i{margin: 0 10px;font-size: 16px;cursor:pointer;}
</style>