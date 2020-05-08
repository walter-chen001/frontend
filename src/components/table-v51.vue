<template>
    <div class="tableitem">
        <div class="tableitem-block">
            <el-table :data="tabledata" border style="width: 100%;" height="277" row-style="height:35px">
                <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                        <div class="icon-block" @click="handleClick(scope,scope.$index)">
                            <i class="el-icon-delete-solid eIcon color-danger"></i>
                            <!-- <span class="el-icon-close" style="cursor:pointer"></span> -->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="itemNo" label="项目主编码" width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.$index==tabledata.length-1" style="position:relative">
                            <el-input class="cellElInput" v-model="scope.row.itemNo">
                                <el-button slot="append" @click="choseItem">选择</el-button>
                            </el-input>
                        </div>
                        <span v-else>{{scope.row.itemNo}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="describe" label="描述"  width="150">
                    <template slot-scope="scope">{{scope.row.describe}}</template>
                </el-table-column>
                <el-table-column prop="origin" label="原产地"  width="90">
                     <template slot-scope="scope">{{scope.row.describe}}</template>
                </el-table-column>
                <el-table-column prop="brand" label="品牌"  width="70">
                     <template slot-scope="scope">{{scope.row.brand}}</template>
                </el-table-column>
                <el-table-column prop="attribute_no" label="属性编码"  width="150">
                     <template slot-scope="scope">{{scope.row.attribute_no}}</template>
                </el-table-column>
                <!-- <el-table-column prop="attribute_name" label="属性名称"  width="100">
                     <template slot-scope="scope">{{scope.row.attribute_name}}</template>
                </el-table-column> -->
               <!--  <el-table-column prop="attribute_no" label="属性编码"  width="100">
                     <template slot-scope="scope">{{scope.row.attribute_no}}</template>
                </el-table-column> -->
                <el-table-column prop="price" label="单价"  width="100">
                     <template slot-scope="scope">
                        <span v-if="scope.$index==tabledata.length-1"></span>
                        <el-input v-else class="cellElInput" v-model="scope.row.price" @change="priceChange($event,scope.$index,scope.row)"></el-input>
                     </template>
                </el-table-column>
                <el-table-column prop="quantity" label="数量"  width="100">
                     <template slot-scope="scope">
                        <span v-if="scope.$index==tabledata.length-1"></span>
                        <el-input v-else class="cellElInput" v-model="scope.row.quantity" @change="quantityChange($event,scope.$index,scope.row)"></el-input>
                     </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            class="pub_dialog"
            title="选择项目"
            :visible.sync="TableV51Dialog"
            width="70%"
            append-to-body
            :modal-append-to-body='false'>
                <HeadSearch @toSearch="toSearch" :data="searchData" :placeholder="$t('system.itemMasterCode')+'/'+$t('system.itemMasterName')+'/'+'属性编码'"></HeadSearch>

                <ElementTable class="eTables" :searchobj="searchobj" :columnsetid="'sales_selection_items'" :elColumns="elColumns"
                  :height="450"  ref="multipleTable"
                  @handleSelectionChange="handleSelectionChange" @resetListBoxSource="resetListBoxSource" @updateSums="updateSums" ><!-- :isChecked='true' @rowClick="rowClick"-->
                  <template v-slot:editRow>
                    <!-- <el-table-column label="类型">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content: flex-start">
                          <div v-for="(item, index) in type" :key="index">
                            <span v-if="item.value == scope.row.type">{{item.label}}</span>
                          </div>
                        </div>
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column label="操作" :header-align="'center'">
                      <template slot-scope="scope">
                        <div style="display: flex;justify-content:center;">
                          <i class="el-icon-delete-solid eIcon" @click.stop="delDepart(scope.row)"></i>
                        </div>
                      </template>
                    </el-table-column> -->
                  </template>
                </ElementTable>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-light" @click="TableV51Dialog=false">关 闭</el-button>
                <el-button type="primary" @click="saveSelect">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import ElementTable from "@/components/element-table.vue"
    import HeadSearch from "@/components/head-search-v1.vue"
    //import ColumnStatusV1 from "./column-status-v1.vue"
  //Vue.component('ColumnStatusV1', ColumnStatusV1)
export default {
    props:['tabledata','rowid','pointSetting'],
    components: {
      ElementTable,
      HeadSearch
    },
    data() {
        return {
            TableV51Dialog:false,
            searchobj: {},
            searchData: {
                tags: [],
            },
            /*elColumns: [
            ],*/
            addData:[],
            defaultData:{itemNo: "", describe: "", origin: "", brand: "", attribute_no: "", attribute_name: "",flat:true},
            selectIds:[],
            addPostData:{
                itemDetalls:{tableData:[]}
            },
        }
    },
    watch:{},
    computed: {
        rightsidecollapse:{
            get() {
              return this.$store.state['app'].rightsidecollapse
            },
            set(v) {
              this.$store.state['app'].rightsidecollapse = v
            }
          },
    },
    methods: {
        toSearch(data) {
             // this.searchobj = data
            this.$set(this, "searchobj", data)
            console.log(this.searchobj)
            this.$refs.multipleTable.refreshTabledata(1)
         },
        choseItem(){
            this.TableV51Dialog=true
            setTimeout(()=>{
                this.refreshTable()
            },100)
        },
        handleClick(scope,index){
            if(index==this.tabledata.length-1){
                return false
            }
            this.delitem(scope.row.id,index);
        },
        delitem(detailsId,index){
            if(this.rowid==""){
                this.tabledata.splice(index,1);
                return false
            }
             this.$confirm('是否确认删除此项目？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
                this.$store.dispatch("order/delDetail",{id:this.rowid,detailsID:detailsId}).then(response =>{
                    // console.log(response.data);
                    if(response.code==0){
                        this.$notify.success({title:'提示',message:response.msg})
                        this.tabledata.splice(index,1);
                        this.refreshTable1()
                        setTimeout(()=>{
                            this.$emit('currentChangeThisRow')
                        },1000)
                    }else{
                        this.$notify.error({title:'提示',message:response.msg})
                    }

                }).catch(error => {
                    console.log(error)
                })
            }).catch(() => {
                this.$notify.error({title:'提示',message:'已取消操作'})
            });

        },
        saveSelect(){

            if(this.selectIds.length==0){
                this.$notify({
                    title:'提示',
                    type: 'error',
                    message: '请选择项目'
                });
                return false
            }
            if(this.tabledata[this.tabledata.length-1]['flat']){
                this.tabledata.pop()
            }

            console.log(this.rowid=="")
            if(this.rowid==""){
                for(var i=0;i<this.addData.length;i++){
                    this.tabledata.push(this.addData[i])
                }
                this.tabledata.push(this.defaultData)
                this.TableV51Dialog=false
                return false
            }
            this.$store.dispatch("order/addDetails",{id:this.rowid,data:this.addPostData}).then(response =>{
                if(response.code==0){
                    this.$notify.success({title:"提示",message:response.msg})
                    for(var i=0;i<response.data.itemDetalls.length;i++){
                        this.tabledata.push(response.data.itemDetalls[i])
                    }
                    this.tabledata.push(this.defaultData)
                    this.refreshTable1()
                    setTimeout(()=>{
                        this.$emit('currentChangeThisRow')
                    },1000)
                    this.TableV51Dialog=false
                    console.log(this.tabledata)
                }else{
                    this.$notify.error({title:"提示",message:response.msg})
                    this.tabledata.push(this.defaultData)
                }

            }).catch(error => {
                console.log(error)
            })


            // this.rightsidecollapse.itemDetalls.tableData=this.tabledata.concat(this.addData)
        },
        handleSelectionChange(selectItems) {
            this.addData=[]
            this.addPostData['itemDetalls']['tableData']=[]
            this.selectIds = []
            selectItems.forEach(element => {
              this.selectIds.push(element.id)
              this.addPostData['itemDetalls']['tableData'].push(element)
              var obj={'id':"","itemNo":"",'describe':"",'origin':"",'brand':"",'attribute_no':"",'attribute_name':"",price:"",quantity:""}
              obj.itemNo=element.item_no
              obj.describe=element.description
              obj.origin=element.origin
              obj.brand=element.brand
              obj.attribute_no=element.attribute_no
              obj.attribute_name=element.name
              obj.id=element.id
              obj.price=element.price
              obj.quantity=element.quantity
              this.addData.push(obj)
            });

            console.log("selectIds", this.selectIds)
        },
        // 获取更新后的列设置信息，导出用
        resetListBoxSource(arr) {
            this.listBoxSource = []
            var obj = {}
            arr.forEach(element => {
              obj.label = element.title
              obj.value = element.field
              obj.checked = element.isShow
              this.listBoxSource.push(obj)
              obj = {}
            });
        },
        updateSums(val) {
            this.$emit('getSums', val);
          },
        rowClick(event){
            // var row=event.currentRow
            // this.addData={}
            //
            //

            //
        },
        toFixed(number, precision) {
            // number=Number(number).toFixed(Number(precision)+1)
            var arr=number.toString().split(".")
            var length;
            if(arr[1]==undefined){
                length=0
            }else{
                length=number.toString().split(".")[1].length
            }
            if(length>Number(precision)){
                var str = number + ''
                var len = str.length
                var last = str.substr(len-1, len)
                if (last == '5') {
                    last = '6'
                    str = str.substr(0, len-1) + last
                    return Number(str - 0).toFixed(precision)
                } else {
                    return Number(number).toFixed(precision)
                }
            }
            else{
                return Number(number).toFixed(precision)
            }

        },
        Mul(arg1, arg2){
            var m=0,s1=arg1.toString(),s2=arg2.toString();
            //获取两个相乘数据的小数点后面的数据的长度，即获取小数的位数，因为最终相乘计算的结果：结果小数的位数=第一个数的小数位数+第二个数的小数位数
             try{
              m+=s1.split(".")[1].length;
            }catch(e){}
             try{
              m+=s2.split(".")[1].length;
            }catch(e){}
            //将两个小数去掉小数点，强制转换整个值（即进行数值放开小数点位数的倍数），然后进行相乘的操作，相乘的结果除去10的m次方
             return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
        },
        refreshTable1(){
            this.$emit('refreshTable')
        },
        refreshTable(){
            this.$refs.multipleTable.refreshTabledata(1)
        },
        caculaterTotal(){
            var total=0,unpaidAmount=0;
            for(var i=0;i<this.tabledata.length;i++){
                if(i!=this.tabledata.length-1){
                    var data=this.Mul(Number(this.tabledata[i].price),Number(this.tabledata[i].quantity))
                    total+=data
                }
            }
            console.log(total)

        },
        update(obj,row){
            console.log(this.rowid)
            if(!this.rowid){
                return false
            }
            var data={
                id:this.rowid,
                detallsID:row.id,
                type:'detalls',
                data:obj
            }
            this.$store.dispatch("order/salesUpdate",data).then(response => {
                if(response.code==0){
                    this.$notify.success({title:"提示",message:response.msg})
                    this.$emit('refreshTable')
                    setTimeout(()=>{
                        this.$emit('currentChangeThisRow')
                    },1000)
                }else{
                    this.$notify.error({title:'提示',message:response.msg})
                }
            }).catch(error => {
                console.log(error)
            })
        },
        priceChange(event,index,row){
            var value=this.toFixed(event,this.pointSetting.price)
            this.$set(this.tabledata[index],'price',value)
            this.update({"price":value},row)
            // this.caculaterTotal()
        },
        quantityChange(event,index,row){
            var value=this.toFixed(event,this.pointSetting.quantity)
            this.$set(this.tabledata[index],'quantity',value)
            this.update({"quantity":value},row)
            // this.caculaterTotal()
        },

    },
}
</script>

<style>
    .tableitem{
        width: 100%;
		height: 280px;
		box-sizing: border-box;
		padding: 0 10px ;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .tableitem-block{
        width: 100%;
        height: 280px;
        overflow: hidden;
        box-sizing: border-box;
    }

    .icon-block{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        font-size: 20px;
        color: #F56C6C;
    }
    .cellElInput input{
        height:36px !important;
        line-height:36px !important
    }
</style>
