<template>
  <el-dropdown @command="handleExcel" class="buttonMarign">
    <el-button size="medium" class="btn-light">
      <div v-if="loading">
        <i class="el-icon-loading"></i>
      </div>
      <div v-else>
        <i class="fa fa-share"></i>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <slot></slot>
      <el-dropdown-item :disabled="loading" command="3">
        <JsonExcel :title="tableName" :footer="footer" :finishDownload="finishDownload" :data="excelJsonData"
          :fields="excelJsonFields" worksheet="tableName" :name="stableName" :tableUrl="tableDataUrl">
          {{$t('system.excelSelected')}}
        </JsonExcel>
      </el-dropdown-item>
      <el-dropdown-item :disabled="loading" command="4">
        <JsonExcel :footer="footer" :title="tableName" :finishDownload="finishDownload" :data="excelJsonData"
          :fields="excelJsonFields" :worksheet="tableName" :name="stableName" :tableUrl="tableDataUrl">
          {{$t('system.excelAll')}}
        </JsonExcel>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
  import JsonExcel from '@/components/JsonExcel.vue'
  import { getAllCountryData } from "@/utils/address.js";
  export default {
    props: {
      selectIds: { default: "" },
      tableDataUrl: { default: "" },
      salesDataUrl: { default: "" },
      columns: { default: "" },
      columnoptions: { default: "" },
      tableName: { default: "excel" },
      searchData: { default: "" }
    },
    components: {
      JsonExcel
    },
    data() {
      return {
        tableList: [],
        stableName: this.tableName,
        loading: false,
        excelJsonFields: {
        },
        excelJsonData: [],
        footer: ""
      };
    },
    computed: {},
    mounted() { },
    watch: {
      // 监听异步获数据返回
      tableList: function (newData) {
        this.excleData();
        this.loading = false;
        this.$notify({
          title: this.$t('system.tips'),
          message: this.$t('system.excelSuccessful'),
          type: "success"
        });
      }
    },
    methods: {
      finishDownload() {
        this.excelJsonFields={}
        this.excelJsonData=[]
      },
      handleExcel(command) {
        if (this.startexcle(command) === false) {
          return false;
        }
      },
      startexcle(command) {
        var ids = this.selectIds;
        if (command == 3) {
          if (ids == "") {
            this.$notify({
              title: this.$t('system.tips'),
              message: this.$t('system.pleaseSelectTheRowToOperate'),
              type: "warning"
            });
            return false;
          }
          this.loading = true;
          this.getAllTableListData(command, ids);
        } else if (command == 4) {
          this.loading = true;
          this.getAllTableListData(command);
        }
      },
      excleData() {
        var columnoptions = this.columnoptions
        this.excelJsonFields = {}
        for (var key = 0; key < columnoptions.length; key++) {
          if (columnoptions[key].checked == true && columnoptions[key].value != "del") { //操作列的不用导出
            let value = columnoptions[key].value
            let label = columnoptions[key].label
            this.excelJsonFields[label] = value;
          }
        }
        this.stableName = this.tableName + "_" + this.getNowFormatDate() + ".xls";
        this.excelJsonData = this.tableList
        console.log("excelJsonFields.................................", this.excelJsonFields)
        console.log("excelJsonData.....................................", this.excelJsonData)
      },
      getAllTableListData(command, ids = "") {
        var data;
        if (ids) {
          data = {
            id_list: ids,
          };
        } else {
          data = {
            noPage: 1
          };
        }
        if (command == 4) {
          data.data = this.searchData;
        }
        this.$store.dispatch(this.tableDataUrl, data).then(response => {
            var datalist = response.data.data;
            if(this.tableDataUrl=='client/indexClientTable'){
              for(var i=0;i<datalist.length;i++){
                datalist[i].status=datalist[i].status_1
              }
            }
            this.tableList = datalist;

            var arrLength = datalist.length
            this.footer = "记录：" + arrLength
          })
          .catch(error => {
            console.log(error);
          });
      },
      getNowFormatDate() {
        var date = new Date();
        // var seperator1 = "-";
        // var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate =
          date.getFullYear() +
          // seperator1 +
          month +
          // seperator1 +
          strDate +
          " " +
          date.getHours() +
          // seperator2 +
          date.getMinutes() +
          // seperator2 +
          date.getSeconds();
        return currentdate;
      },
      //传入国家地区id ,返回name
      changeCountry(arr) {
        var tmp = "";
        var data = getAllCountryData("cn");
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          data.forEach(ele => {
            if (element == ele.id) {
              tmp = tmp + ele.name;
              arr.length > index + 1 ? (tmp += " - ") : "";
            }
          });
        }
        return tmp;
      },
    }

  };
</script>
<style>
</style>
