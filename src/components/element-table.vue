<template>
  <div class="template-table-box" >
    <template v-if="isTableActive">
    <!--element表格-->
    <el-table  ref="multipleTable" :data="tableData" v-loading="loading" :cell-style="resizeCellWidth"
      :element-loading-background="'#0000'" :row-class-name="tableRowClassName" tooltip-effect="dark" :height=height
      :border="borderStyle" :stripe="stripeStyle" :summary-method="getSummaries" :show-summary="isSum"
      :highlight-current-row="isHighLight" row-key="id" @row-click="rowClick" @current-change="currentChange"
      @selection-change="handleSelectionChange" @header-dragend="rowWidthChange" @select-all="SelectAll"
      @select="rowSelect" @click="clicktable" @cell-click="cellClick">
      <el-table-column v-if="isChecked" class-name="cannotDrag" type="selection" align="center" width="55"></el-table-column>
      <!--展开行-->
      <slot name="expand">
        <!--<el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>-->
      </slot>
      <template  v-for="(column, index) in ocolumns">

        <el-table-column :class-name="cannotDrag" :fixed="column.fixed" :label="column.title" :width="column.width" :min-width="column.width"
          :key="`elColumns_${index}`" :align="column.columnAlign" :header-align="column.titleAlign"
          :show-overflow-tooltip="column.overflow"  :sortable="column.sortable" :prop="column.field"
          :type="column.type" v-if="column.isShow == true && column.custom" :formatter="column.formatter" :resizable="true">

          <!-- 自定义表头排序 -->
            <template slot="header" slot-scope="scope">
              <el-popover id="sortList" placement="bottom" width="250" v-model="headmenus[column.field]">
                 <el-form :ref="'form'+column.field" :model="filter[column.field]"  label-width="0px" size="mini" style="margin-top: 10px">
                <el-form-item  prop="sort">
                  <el-radio-group v-model="filter[column.field].sort.value" size="small" class="table-column-sort" @change="sortChange(column.field)">
                    <!-- <el-radio-button label="asc" ><span class="jqx-grid-sortasc-icon" style="padding: 8px 0px"></span></el-radio-button>
                    <el-radio-button label="desc"><span class="jqx-grid-sortdesc-icon" style="padding: 8px 0px"></span></el-radio-button>
                    <el-radio-button label=""><span class="jqx-grid-sortremove-icon" style="padding: 8px 0px"></span></el-radio-button> -->
                    <!-- <el-radio-button label="asc" title="升序"><span class="fa fa-sort-amount-asc"></span></el-radio-button>
                    <el-radio-button label="desc" title="降序"><span class="el-icon-bottom"></span></el-radio-button>
                    <el-radio-button label="" title="无排序"><span class="el-icon-sort"></span></el-radio-button> -->
                    <el-radio-button label="asc" title="升序"><span class="fa fa-sort-amount-asc"></span></el-radio-button>
                    <el-radio-button label="desc" title="降序"><span class="fa fa-sort-amount-desc"></span></el-radio-button>
                    <el-radio-button label="" title="无排序"><span class="el-icon-sort"></span></el-radio-button>
                  </el-radio-group>
                </el-form-item>


                <template v-for="(item,key) in filter[column.field].data">
                  <el-form-item prop="ruleTextOne" v-if="column.filterType && column.filterType =='date'">
                    <el-date-picker
                    v-model="item.value"
                    style="width: 250px;"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>

                <el-form-item v-if="column.filterType && column.filterType =='select'" prop="value" >
                    <el-select v-model="item.value" multiple clearable style="width:100%;">
                      <el-option v-for="(item, key) in selectOptions(column.selectOptions)" :label="item.label" :value="item.value" :key="key"></el-option>
                    </el-select>
                </el-form-item>

                <div v-if="column.filterType == undefined" style="display: flex;">
                  <div>{{column.filterType}}</div>
                  <el-form-item v-if="item.ruleAndOr" prop="ruleAndOr" style="width:70px;min-width: 70px;">
                    <el-select v-model="item.ruleAndOr" class="select-gray" style="width:100%;">
                      <el-option v-for="(item, key) in joinOption" :label="item.label" :value="item.value" :key="key" ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="rule" style="width:70px;min-width: 70px;">
                    <el-select v-model="item.rule" style="width:100%;" placeholder="请选择">
                      <el-option v-for="(item, key) in filterOption" :label="item.label" :value="item.value" :key="key"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="value">
                    <el-input v-model="item.value"></el-input>
                  </el-form-item>
                </div>

              </template>

              <el-form-item v-if="!column.filterType && column.filterType !='date'" >
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="addFilter(filter[column.field].data)" style="width:100%;">
                </el-button>
              </el-form-item>
              <el-form-item size="mini" style="text-align: center">
                <el-button type="primary" @click="goFilter">筛选</el-button>
                <el-button @click="resetFilter(filter[column.field],column.field)">重置</el-button>
              </el-form-item>

            </el-form>
              <span slot="reference" @mouseenter="showSort(index)" @mouseleave="hideSort">{{column.title}}
                <transition name="icon-fade">
                  <i class="fa fa-reorder" v-if="sortIcon == index" style="cursor: pointer"></i>
                </transition>
              </span>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <span v-html="column.html"></span>
              <compponent @refreshTabledata="refreshTabledata" :is="column.custom.tplname" :data="scope" :other="column.custom.other"></compponent>
            </template>
        </el-table-column>
          <!-- :prop="dropCol[index].field" -->
        <el-table-column v-if="column.isShow == true && !column.custom" :class-name="cannotDrag" :fixed="column.fixed" :label="column.title" :width="column.width"
          :key="`elColumns_${index}`" :align="column.columnAlign" :header-align="column.titleAlign"
          :show-overflow-tooltip="column.overflow"  :sortable="column.sortable" :prop="column.field"
          :type="column.type"  :formatter="column.formatter" :resizable="true">

          <!-- 自定义表头排序 -->
          <template slot="header" slot-scope="scope">

            <span v-if="column['headerSort']">{{column.title}}</span>

            <el-popover v-else id="sortList" placement="bottom" width="250" v-model="headmenus[column.field]">

              <el-form :ref="'form'+column.field" :model="filter[column.field].data"  label-width="0px" size="mini" style="margin-top: 10px">
                <el-form-item  prop="sort">
                  <el-radio-group v-model="filter[column.field].sort.value" size="small" class="table-column-sort" @change="sortChange(column.field)">
                    <el-radio-button label="asc" title="升序"><span class="fa fa-sort-amount-asc"></span></el-radio-button>
                    <el-radio-button label="desc" title="降序"><span class="fa fa-sort-amount-desc"></span></el-radio-button>
                    <el-radio-button label="" title="无排序"><span class="el-icon-sort"></span></el-radio-button>
                  </el-radio-group>
                </el-form-item>


                <template v-for="(item,key) in filter[column.field].data">
                  <el-form-item prop="value" v-if="column.filterType && column.filterType =='date'">
                    <el-date-picker
                    v-model="item.value"
                    style="width: 250px;"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>

                <el-form-item v-if="column.filterType && column.filterType =='select'" prop="value" >
                    <el-select v-model="item.value" multiple  clearable style="width:100%;">
                      <el-option v-for="(item, key) in selectOptions(column.selectOptions)" :label="item.label" :value="item.value" :key="key"></el-option>
                    </el-select>
                </el-form-item>

                <div class="filters-box" v-if="column.filterType == undefined">
                  <el-form-item v-if="item.ruleAndOr" prop="ruleAndOr" style="width:70px;max-width: 70px;margin-right: 5px;">
                    <el-select v-model="item.ruleAndOr" class="select-gray" style="width:100%;">
                      <el-option v-for="(item, key) in joinOption" :label="item.label"  :value="item.value" :key="key"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input placeholder="" v-model="item.value" class="input-with-select" :disabled ="item.rule =='nl'">
                      <el-select v-model="item.rule" slot="prepend" placeholder="请选择" :title="getTitleByRule(item.rule)" style="width: 70px;" @change="changeRule(item)">
                        <el-option v-for="(item, key) in filterOption" :label="item.label" :title="item.title" :value="item.value" :key="key"></el-option>
                      </el-select>
                    </el-input>
                  </el-form-item>
                  <!-- <el-form-item prop="rule" style="width:60px;max-width: 60px;margin-right: 2px;">
                    <el-select v-model="item.rule" style="width:100%;" placeholder="请选择" :title="getTitleByRule(item.rule)">
                      <el-option v-for="(item, key) in filterOption" :label="item.label" :title="item.title" :value="item.value" :key="key"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="value">
                    <el-input v-model="item.value"></el-input>
                  </el-form-item> -->
                </div>

              </template>

              <el-form-item v-if="!column.filterType && column.filterType !='date'" >
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="addFilter(filter[column.field].data)" style="width:100%;">
                </el-button>
              </el-form-item>
              <el-form-item size="mini" style="text-align: center">
                <el-button type="primary" @click="goFilter">筛选</el-button>
                <el-button @click="resetFilter(filter[column.field],column.field)">重置</el-button>
              </el-form-item>

            </el-form>
              <span slot="reference" @mouseenter="showSort(index)" @mouseleave="hideSort">{{column.title}}
                <transition name="icon-fade">
                  <i class="fa fa-reorder" v-if="sortIcon == index" style="cursor: pointer"></i>
                </transition>
              </span>
            </el-popover>
          </template>
        </el-table-column>

      </template>

      <!--自定义列模版-->
      <slot name="editRow">
        <!--<el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
      </slot>
    </el-table>
    <!--element分页-->
    <div class="table-footer" v-if="footer">
      <el-pagination v-if="pagination" :small="small" :background="backgroundColor" :layout="layoutSetting" :total="total"
        :page-sizes="PageSizes" :pager-count="PagerCount" @size-change="size_change":current-page.sync="currentPage" @current-change="current_change">
      </el-pagination>
      <!--<div>
        <el-dropdown @command="rowSettingClick">
        <i class="fa fa-list-ul column-setup" style="margin-left: 30px"></i>
        <el-dropdown-menu slot="dropdown">
          <template v-for="(item, index) in elColumnsHide">
            <el-dropdown-item :key="index" :command="item">
              <span class="el-icon-check" v-if="item.isShow == true"></span>
              <span class="el-icon-check" v-else style="visibility: hidden"></span>
              <span>{{item.title}}</span>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
      </div>-->
      <i class="fa fa-list-ul column-setup" style="margin-left: 30px;cursor: pointer" @click="dragList"></i>
    </div>
<!--列设置 :destroy-on-close="true"-->
    <el-dialog :visible.sync="sortWindow"
               title="列设置"
               width="40%"
               v-if="sortWindow"
               :close-on-click-modal="false"
               class="pub_dialog">
      <ul id="sortCardList">
        <li v-for="(item,index) in this.ocolumns" :key="index" >
          <el-card style="padding:0 10px 0 0;margin-bottom: 10px;">
            <div class="sortCardBox">
<!--              序号-->
              <div class="markNumber">
                {{index+1}}
              </div>
<!--             表头名称-->
              <div style="width: 20%">
                <span>{{item.systemTitle}}</span>
              </div>
<!--              别名-->
              <el-input style="width: 30%;margin: 10px 0" :placeholder="'别名'" v-model="item.alias" @change="updateAlias(item)" clearable></el-input>
<!--              宽度-->
              <el-input style="width: 25%;margin: 10px 0" :placeholder="'宽度'" v-model="item.width" @change="updateTitleWidth(item)" clearable>
                <template slot="append">px</template>
              </el-input>
<!--              显示隐藏-->
              <el-switch v-model="item.isShow"
                         :active-value="true"
                         :inactive-value="false"
                         @change="rowSettingClick(item)">
              </el-switch>
            </div>
          </el-card>
        </li>
      </ul>
      <div slot="footer">
        <el-button class="btn-light" @click="sortWindow = false">关闭</el-button>
        <el-button @click="recoverSettings" class="btn-light">恢复默认设置</el-button>
        <el-button type="primary" @click="saveColumns">保存</el-button>
      </div>
    </el-dialog>
    </template>
  </div>
</template>

<script>

  export default {
    components:{},
    name: 'element-table',
    props: {
      //分页设置
      /*是否使用小型分页样式*/
      small: {
        default: false
      },
      /*分页按钮添加背景色*/
      backgroundColor: {
        default: false
      },
      /*组件布局*/
      layoutSetting: {
        default: "prev, pager, next, total,sizes,jumper"
      },
      /*每页显示个数选择器的选项设置*/
      PageSizes: {
        default: [10, 20, 30, 40, 50, 100]
      },
      /*页码按钮的数量，当总页数超过该值时会折叠*/
      PagerCount: {
        //大于等于 5 且小于等于 21 的奇数
        default: "7"
      },
      //表格设置
      /*表格高度*/
      height: {
        default: 450
      },
      /*是否带斑马纹*/
      stripeStyle: {
        default: false
      },
      /*是否带边框*/
      borderStyle: {
        default: false
      },
      /*是否显示合计*/
      isSum: {
        default: false
      },
      /*是否需要排序功能*/
      sortable: {
        default: true
      },
      /*是否高亮当前行*/
      isHighLight: {
        default: true
      },
      /*是否多选*/
      isChecked: {
        default: true
      },
      /*表头设置*/
      elColumns: {
        type: Array,
        default: function () {
          return [
            /* { field: "itemNo", title:"项目主编码", width: 200, titleAlign: "center", columnAlign: "right",overflow:true,sortable:true,isShow:true,fixed:false},*/
          ]
        }
      },
      searchobj: {
        type: Object,
        default: function() {
            return ""
        }
      },
      specialColumn: {
        type: Array,
        default: function () {
          return [
            {}
          ]
        }
      },
      tableData: {
        type: Array,
        default: function () {
          return []
        }
      },
      downList: {
        type: Object,
        default: function () {
          return {}
        }
      },
      /*表格标识*/
      columnsetid: {
        default: ""
      },
      /*请求数据地址*/
      url: {
        default: ""
      },
      /*请求数据地址*/
      commonurl: {
        default: "common/getTableData"
      },
      /*是否显示底部栏*/
      footer: {
        default: true
      },
      /*是否显示分页*/
      pagination: {
        default: true
      },


    },
    model: {
        prop: 'tableData',
        event: "changetable"
    },
    data() {
      return {
        ocolumns:[],
        ocolumnsCopy:[],
        headmenus: {
          // data:[]
        },
        isTableActive: false,
        multipleSelection: [],
        allData:{},
        sums:[],
        total: 0,
        visible: false,
        pagesize: 10,
        currentPage: 1,
        selIcon: "el-icon-check",
        loading: false,
        sortIcon: -1,
        filter: {},
        filterOption:[
            {label:"☰",value:"contains",title:"内容"},
            {label:"=",value:"equal",title:"等于"},
            {label:">",value:"gt",title:"大于"},
            {label:"<",value:"lt",title:"小于"},
            {label:"_",value:"nl",title:"空"},
        ],
        joinOption:[
            {label:"并且",value:"and"},
            {label:"或者",value:"or"}
        ],
        datasort:{
          label:"",
          value:""
        },
        sortWindow:false,
        currentRow:""
      }
    },
    mounted() {
      console.log("element-table mounted...")
      this.getColumns();
      // this.rowDrop();
      // this.columnDrop();
    },
    watch:{
      searchobj(data){
        // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",data)
      },
    },
    computed: {

      elColumnsHide(){
        let arr = JSON.parse(JSON.stringify(this.ocolumns));
        arr.forEach((item, index, array) => {
          if (array[index].field == "checkbox") {
            arr.splice(index, 1)
          }
        });
        // 将更新后的列设置，传给上级组件，导出用
        this.$emit('resetListBoxSource', arr)
        return arr
      },
    },
    methods: {
      changeRule(item){
        if(item.rule =='nl'){
          this.$set(item,'value','');
        }
      },
      /*解决列设置宽度改变不同时改变单元格宽度问题*/
      resizeCellWidth({row, column, rowIndex, columnIndex}){
        if(column.width){
          column.realWidth = column.width
        }
      },
      /*根据类型判断使用哪种方式*/
      selectOptions(varname){
          let temp =[]
          if(Array.isArray(varname)){
            temp = varname
          }else{
            if(this.downList[varname]){
              temp = this.downList[varname]
            }
          }
          return temp
      },
      /*获取表头配置*/
      getColumns(){
        /*当外部表头没手动配置时 会尝试获取数据库表头配置*/
        if(this.elColumns.length > 0){
          this.getColumnsByLocal();
        }else{
          this.getColumnsByDB();
        }
      },

      /*前端自行配置*/
      getColumnsByLocal(){
        this.ocolumns = this.elColumns;
        this.ocolumnsCopy = JSON.parse(JSON.stringify(this.ocolumns));
        this.getDataBefore();
      },

      /*后端配置*/
      getColumnsByDB(){
        this.$store.dispatch("common/getTableTitle",this.columnsetid).then(res=>{
             console.log("getColumnsByDB...",res);
             if(res.code == 0 && res.data){
                this.ocolumns = res.data.columns;
                this.ocolumnsCopy = JSON.parse(JSON.stringify(this.ocolumns));
                this.getExcelOcolumns()
                this.getDataBefore();
             }else{
                console.log("API请求没有返回数据...")
             }
        }).catch(error=>{
            console.log(error);
            this.$message.error('别着急哦,技术人员正在抢修表头设置....！');
        })
      },
      /*保存表头设置*/
      saveColumns(){
        let obj = {};
        let arr = JSON.parse(JSON.stringify(this.ocolumnsCopy));
        arr.forEach((item, index, array) => {
          var aliasName = array[index].field;
          var aliasValue = array[index].alias;
          if(aliasValue){
            obj[aliasName] = aliasValue;
          }
        });
        let saveAlias = {
          table_sign:this.columnsetid,
          alias_data:obj,
          data:{
            columns:this.ocolumnsCopy
          }
        };
        console.log(saveAlias);
        this.$store.dispatch("common/updateTableTitle",saveAlias).then(res => {
          console.log("保存表格表头设置!............",res);
          if(res.code == 0){
            this.getColumnsByDB();
            this.sortWindow = false;
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'success'
            });
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /*恢复默认设置*/
      recoverSettings(){
        this.$confirm('该操作会刷新当前页签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = {table_sign:this.columnsetid};
          this.$store.dispatch("common/recoverTableTitle",obj).then(res => {
            console.log("恢复表格表头默认设置!............",res);
            if(res.code == 0){
              this.getColumnsByDB();
              this.sortWindow = false;
              this.$notify({
                title: '提示',
                message: res.msg,
                type: 'success'
              });

            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          this.$notify({
            title: '提示',
            message: "已取消",
            type: 'info'
          });
        });
      },
      /*渲染表格前的必要准备*/
      getDataBefore(){
        /*根据表头设置生成筛选的数据结构*/
        this.createFilters();

        /*if (this.isChecked == true) {
          let checkbox = { field: "checkbox", }
          this.elColumns.unshift(checkbox)
          this.dropCol.unshift(checkbox)
        }*/

        /*开始渲染表格*/
        this.isTableActive = true

        if(this.columnsetid || this.url){
          this.getPageData();
        }else{
          console.log("当有标识的时候传入  columnsetid  并自动忽略url");
          console.log("没有标识可以传入  url ");
          console.log("也可直接传入 tableData 表格数组");
          this.loading = false
        }
      },

      createFilters(){
          /*根据表头设置生成filter 的 数据结构*/
        for (var i = 0; i < this.ocolumns.length; i++) {
          let item = this.ocolumns[i]
          if(!item.columnmenu){
            let temp = {}
            if(item.filterType =="select"){
               temp.value =[]
            }else{
               temp ={
                  rule: "contains",
                  value: "",
               }
            }
            this.$set(this.filter,item.field,
            {
              data:[temp],
              sort:{
                label:item.field,
                value:""
              },
            }
            )
          }
        }
      },
      //列设置
      dragList(){
        this.sortWindow = true;
        this.$nextTick(() => {
          this.sortCard();
        });
      },
      //拖拽列设置
      sortCard(){
        const sortList = document.querySelector('#sortCardList');
        console.log(sortList,"rabbit,tank!!!!!!!yeah");
        const _this = this;
        Sortable.create(sortList, {
          animation: 150,
          filter:".aliasInput",
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.ocolumnsCopy.splice(oldIndex, 1)[0];
              _this.ocolumnsCopy.splice(newIndex, 0, currRow);
          },
        })
      },
      getTitleByRule(rule){
        let temptitle = ""
        this.filterOption
        for (var i = 0; i < this.filterOption.length; i++) {
          let item = this.filterOption[i]
          if(item.value == rule){
            temptitle = item.title
          }
        }
        return temptitle
      },
      sortChange(varname){
          console.log("sortChange.......",this.filter,varname)
          // this.$set(this.datasort,'label',varname)

          /*重置其他列的排序*/
          let self = this
          Object.keys(this.filter).forEach(function(key){
          let item  = self.filter[key]
            if(item.sort.label != varname){
              self.$set(item.sort,'value',"")
            }else{
              self.datasort = {...item.sort}
            }
          })

          this.getPageData("filter");
      },
      addFilter(data){
         console.log("addFilter.......",this.filter)
         if(data.length < 5){
            data.push({
              ruleAndOr:"and",
              rule:"contains",
              value:"",
            })
         }

      },
      goFilter(){
          console.log("goFilter.......",this.filter)
          this.currentPage = 1;
          this.getFilter();
          this.getPageData("filter");
      },
      /*获取有值的筛选条件*/
      getFilter(){
        let filter_end = {};
        let self = this
        Object.keys(this.filter).forEach(function(key){
          let item  = self.filter[key];
          let temparr = []
            for (var i = 0; i < item.data.length; i++) {
               let sitem =  item.data[i]
               // console.log("sitem...",sitem)
               if(sitem.value !="" && sitem.value != null || sitem.rule =='nl'){
                   temparr.push(sitem)
               }
            }
            if(temparr.length >0){
                filter_end[key] =  temparr
            }
        })
        return Object.keys(filter_end).length > 0 ? filter_end : false
      },
      resetFilter(data,varname) {
        // let formname = 'form'+index;
        // console.log("reset form ............",formname,this.$refs)
        // this.$refs[formname][0].resetFields();
        console.log("data...",data)
        if(varname && varname =="select"){
            this.$set(data,"data",[{rule:"contains",value:[]}])
        }else{
            this.$set(data,"data",[{rule:"contains",value:""}])
        }

        // data[varname.data] = [{rule:"contains",value:""}]
      },
      clicktable() {
        console.log("clicktable xxxxxxxxxxxxxxxxxxxxxxxxx")
      },
      cancelSelected() {
        this.$refs.multipleTable.setCurrentRow()
      },
      refreshTabledata(page) {
        if(page){
          this.currentPage = 1
        }
        this.getPageData("filter");
      },

      //获取表格数据
      getPageData(type) {
        this.$nextTick(() => {
            this.loading = true
            let obj = {
              tableType: this.columnsetid,
              page: this.currentPage,
              pageSize: this.pagesize
            }
            let postObj = {}
            console.log(this.searchobj.tags)
            if (this.searchobj.tags) {
              postObj = $.extend(obj, {
                data: this.searchobj
              });
            } else {
              postObj = obj;
            }

            if(type =="filter"){
              if(this.datasort.value){
                postObj.sort = this.datasort
              }

              let tempfilter = this.getFilter()
              if(tempfilter){
                postObj.filter = tempfilter
              }
            }

            let tempurl = ""
            if(this.columnsetid){
                tempurl = this.commonurl
            }else{
                tempurl = this.url
            }
            console.log("element-table postdata...", postObj,this.searchobj);

            this.$store.dispatch(tempurl, postObj).then(response => {
              console.log(tempurl+"后端返回表格数据...",response.data);
              if(response.data){
                console.log(this.currentPage);
                this.tableData = response.data.data;
                this.total = Number(response.data.rowTotal);
                // this.total = Number(response.data.data.length)
                this.allData = response.data;
                this.sums = response.data.sumData;
                this.$emit("update",response.data);
                // this.$emit("changetable",response.data.data)
                this.$emit("updateSums",response.data.sumData)
              }
              this.loading = false
            }).catch(error => {
              console.log(error);
               this.$message.error('别着急哦,技术人员正在抢修中....！');
              this.loading = false
            });

         })
      },
      /*获取全部数据*/
      getAllData(){
        return this.allData
      },
      /*获取总计*/
      getSums(){
        return this.sums
      },
      //当前页点击事件
      current_change(currentPage) {
        this.currentPage = currentPage;
        this.getPageData("filter")
      },
      //分页选项点击事件
      size_change(sizePage) {
        this.pagesize = sizePage
        this.getPageData("filter")
      },
      //勾选单行数据
      rowSelect(selection, row) {
        console.log(selection, row)
        this.$emit('rowSelect', { selection, row })
      },
      //全选
      SelectAll(selection) {
        console.log(selection)
        this.$emit('SelectAll', selection)
      },
      //行选择
      currentChange(currentRow, oldCurrentRow) {
        console.log("currentRow", currentRow)
        console.log("oldCurrentRow", oldCurrentRow)
        if (currentRow) {
          this.currentRow=currentRow
          this.$emit('rowClick', { currentRow, oldCurrentRow })
          this.$refs.multipleTable.setCurrentRow(currentRow);
          // this.$store.commit("TOGGLE_RIGHTSIDE_COLLAPSE", false)
        }
      },
      //行选择
      rowClick(currentRow, oldCurrentRow) {

        this.$store.commit("TOGGLE_RIGHTSIDE_COLLAPSE", false)

      },
      //点击单元格
      cellClick(row, column, cell, event){
        this.$emit('cellClick',{row, column, cell, event})
      },
      //行拖拽
      rowDrop() {
        console.log("组件内行拖拽................")
        const tbody = document.querySelector('.el-table__body-wrapper tbody');
        const _this = this
        Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
          }
        })
      },
      /*//列拖拽
      columnDrop() {
        console.log("组件内列拖拽................")
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
        this.sortable = Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          filter: ".cannotDrag",
          draggable: ".canDrag",
          onEnd: evt => {
            const oldItem = this.dropCol[evt.oldIndex]
            this.dropCol.splice(evt.oldIndex, 1)
            this.dropCol.splice(evt.newIndex, 0, oldItem)
          }
        })

      },*/
      //列别名
      updateAlias(v){
        console.log(v)
        this.ocolumnsCopy.forEach((item, index, array) => {
          if (array[index].field == v.field) {
            array[index].alias = v.alias
            if(!v.alias){
              array[index].title = array[index].systemTitle
            }
          }
        });
      },
      //列宽度
      updateTitleWidth(v){
        console.log(v)
        this.ocolumnsCopy.forEach((item, index, array) => {
          if (array[index].field == v.field) {
            array[index].width = v.width
          }
        });
      },
      //列隐藏
      rowSettingClick(command) {
        console.log("列隐藏!!!!!!!!!!!!!!!!!!", command);
        command.isShow = !command.isShow
        this.ocolumns.forEach((item, index, array) => {
          if (array[index].field == command.field) {
            array[index].isShow = !array[index].isShow
          }
        });
        this.ocolumnsCopy.forEach((item, index, array) => {
          if (array[index].field == command.field) {
            array[index].isShow = !array[index].isShow
          }
        });
        if (command.special) {
          this.$emit('specialColumnSettings', command)
        }
        console.log("ocolumnsCopy",this.ocolumnsCopy);
        console.log("ocolumns",this.ocolumns)
      },
      //列宽度
      rowWidthChange(newWidth, oldWidth, column, event) {
        console.log(newWidth, oldWidth, column, event)
      },
      //初始化列设置
      /*initDataColumnSetInfo() {
        if (this.columnsetid) {
          this.$store.dispatch("common/getColumnSetInfo", {
            tableType: this.columnsetid,
            columns: this.elColumns
          }).then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error);
          })
        }
      },*/
      //行数据底色
      tableRowClassName({ row, rowIndex }) {
        /*if(rowIndex % 2== 0){
          return 'warning-row';
        }else{
          return 'success-row';
        }*/
        this.$emit('tableRowClassName', { row, rowIndex })
      },
      handleSelectionChange(val) {
        console.log(val)
        this.$emit('handleSelectionChange', val)
      },
      //显示表格头部排序按钮
      showSort(index) {
        console.log("排序!!!!")
        this.sortIcon = index
      },
      //隐藏表格头部排序按钮
      hideSort() {
        this.sortIcon = -1
      },
      //自定义总计
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      getExcelOcolumns(){
        let arr = JSON.parse(JSON.stringify(this.ocolumns));
        arr.forEach((item, index, array) => {
          if (array[index].field == "checkbox") {
            arr.splice(index, 1)
          }
        });
        // 将更新后的列设置，传给上级组件，导出用
        this.$emit('resetListBoxSource', arr)
        return arr
      }
   
    }
  }



</script>

<style lang="scss">

  .ex-card-table .template-table-box {
    display: grid;
    height: calc(100% - 60px);
  }

  .icon-fade-enter-active {
    transition: all .3s ease;
  }

  .icon-fade-leave-active {
    transition: all .3s ease;
  }

  .icon-fade-enter,
  .icon-fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  #sortList .el-divider,
  .el-divider--horizontal {
    margin: 5px 0px;
  }
  #sortCardList{
    list-style: none;
    padding: 0;
    height: 420px;
    overflow-y: auto;
    color:$regularText!important;
  }
  #sortCardList  .sortCardBox span{color: $regularText ;}
  #sortCardList>li> .el-card .el-card__body{
    padding:0px;
  }
  .sortCardBox{
    display: flex;
    justify-content: space-between;
    align-items: center
  }
  .markNumber{
    height: 58px;
    width: 40px;
    background-color: $borderLighter;
    color: $regularText;
    text-align: center;
    line-height: 58px
  }
  .table-footer{
    padding: 10px 0; display:flex; justify-content:flex-start;align-items: center;
    overflow-x: auto;
    overflow-y: unset;
  }


  .theme-default{
    .filters-box {display: flex;}
    .filters-box .el-form-item {flex:1;}
    .filters-box .el-input__inner{padding-left: 6px;}
    .filters-box .el-input-group .el-input--mini .el-input__inner{height: 29px;line-height: 29px;}
    .filters-box .el-select .el-input__inner{text-align: center;}
    .filters-box .el-input-group .el-input-group__prepend{text-align: center;background-color: #fff;font-weight: bolder;}
    .filters-box .el-input-group .el-input-group__prepend .el-input__inner{font-weight: bolder;}
    .el-card.is-always-shadow{
      box-shadow:none;
      -webkit-box-shadow:none;
    }
  }

  /*.table-footer > *{flex: 1;}*/
  /*.table-footer > *{flex: auto;}
  .table-footer .el-pagination > *{flex: auto;}*/

</style>
