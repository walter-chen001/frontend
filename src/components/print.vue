<template>
  <el-dropdown @command="handlePrint" class="buttonMarign">
    <el-button size="medium" class="btn-light">
      <div v-if="loading">
        <i class="el-icon-loading"></i>
      </div>
      <div v-else>
        <i class="el-icon-printer"></i>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <!--<div v-show="tableDataUrl!='inventory/getPageData'">
        <el-dropdown-item :disabled="loading" command="1">列印选择采购单</el-dropdown-item>
        <el-dropdown-item :disabled="loading" command="2">列印全部采购单</el-dropdown-item>
      </div>-->
      <el-dropdown-item :disabled="loading" command="3">{{$t('system.printSelected')}}</el-dropdown-item>
      <el-dropdown-item :disabled="loading" command="4">{{$t('system.printAll')}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    props: {
      selectIds: { default: "" },
      tableDataUrl: { default: "" },
      salesDataUrl: { default: "" },
      columns: { default: "" },
      searchData: { default: "" },
      tableData: {
        type: Object,
        default: function () { return {} }
      },
      elColumns: { default: "" }
    },
    components: {},
    data() {
      return {
        tableList: [],
        salesList: [],
        loading: false,
        command: "",
        companyName: "",
        PrintHeaderData: [],
        columnData: {}
      };
    },
    computed: {},
    mounted() { },
    watch: {
      // 监听异步获数据返回
      tableList: function (newData) {
        this.loading = false;
        let command = this.command;
        this.printData(command);
      },
      salesList: function (newData) {
        this.loading = false;
        let command = this.command;
        this.printData(command);
      }
    },
    methods: {
      handlePrint(command) {
        this.command = command;
        if (this.startprint(command) === false) {
          return false;
        }
      },

      startprint(command) {
        var ids = this.selectIds;
        if (command == 1) {
          if (ids == "") {
            this.$notify({
              title: this.$t('system.tips'),
              message: this.$t('system.pleaseSelectTheRowToOperate'),
              type: "warning"
            });
            return false;
          }
          this.getSalesListData(ids);
        } else if (command == 2) {
          this.getSalesListData();
        } else if (command == 3) {
          if (ids == "") {
            this.$notify({
              title: this.$t('system.tips'),
              message: this.$t('system.pleaseSelectTheRowToOperate'),
              type: "warning"
            });
            return false;
          }
          this.getAllTableListData(command, ids);
        } else if (command == 4) {
          this.getAllTableListData(command);
        }
        this.printHeader()
      },

      printData(command) {
        var gridContent = "";
        var tmp = "";
        if (command == 1 || command == 2) {
          gridContent = '<div class="content">';
          var salesList = this.salesList;
          for (const key in salesList) {
            if (key != "clone") {
              tmp = salesList[key];

              var tableCreat = "";
              tableCreat += "<table align='center' border='1'><thead>";
              var printHeader = this.PrintHeaderData;
              var value = [];
              var headerText = {}
              // var headerText={"custome-adv":"操作","itemName":"品名","Quantity":"数量","UnitPrice":"单价","amount":"小计","description":"规格","Model":"级别"}
              for (var key1 in this.columnData) {
                headerText[key1] = this.columnData[key1]["c_name"]
              }
              tableCreat += "<td>序号</td>";
              for (const key2 in printHeader) {
                if (!printHeader[key2].hidden && key2 != "custome-adv") {
                  value.push(key2);
                  tableCreat += "<td>" + headerText[key2] + "</td>";
                }
              }
              tableCreat += "</thead><tbody>";
              if (tmp.data === undefined) {
                tableCreat += "<tr><td>1</td>"
                for (let index = 0; index < value.length; index++) {
                  tableCreat += "<td></td>";
                }
              } else {
                for (var i = 0; i < tmp.data.length; i++) {
                  if (i == tmp.data.length - 1) {
                    tableCreat += "<tr><td>合计</td>"
                  } else {
                    tableCreat += "<tr><td>" + (i + 1) + "</td>"
                  }
                  var data1 = tmp.data[i]
                  for (let index = 0; index < value.length; index++) {
                    var has = false;
                    for (const k in data1) {
                      if (value[index] == k) {
                        tableCreat += "<td>" + data1[k] + "</td>";
                        has = true;
                        break;
                      }
                    }
                    if (has == false) {
                      tableCreat += "<td>" + "" + "</td>";
                    }
                  }
                }
                tableCreat += "</tr></body></table>";
              }



              gridContent +=
                '<table align="center"><thead><h2 style="text-align:center;font-weight:normal" ><p>' + tmp.companyName + '</p><p>采购单</p></h2></thead>' +
                '<tr><td colspan="3" style="text-align:left">订购单编码:</td><td colspan="5" style="text-align:left">' +
                tmp.purchaseNO +
                '</td><td colspan="3" style="text-align:left">打印日期:</td><td colspan="5" style="text-align:left">' +
                this.getNowFormatDate() +
                "</td></tr>" +
                '<tr><td colspan="3" style="text-align:left">供应商名称:</td><td colspan="5" style="text-align:left">' +
                tmp.vendorName +
                '</td><td colspan="3" style="text-align:left">订购日期:</td><td colspan="5" style="text-align:left">' +
                tmp.purchaseDate +
                "</td></tr>" +
                '<tr style="border-bottom:none"><td colspan="3" style="text-align:left;border-bottom:none">采购人员:</td><td colspan="5" style="text-align:left;border-bottom:none">' +
                tmp.purchaseStaffID +
                '</td><td colspan="3" style="text-align:left;border-bottom:none">审批人员:</td><td colspan="5" style="text-align:left;border-bottom:none">' +
                tmp.approveStaff +
                "</td></tr></table>"
              //   +'<tr><td colspan="1">序号</td><td colspan="2">品名</td><td colspan="1">品牌</td><td colspan="2">规格</td><td colspan="2">级别</td><td colspan="3">数量</td><td colspan="1">单位</td><td colspan="2">单价</td><td colspan="2">总计</td></tr>';

              // if (tmp.data === undefined) {
              //   var tmp1 = "";
              //   tmp1 = '<tr><td colspan="1">1</td>';
              //   tmp1 += ' <td colspan="2"></td>';
              //   tmp1 += ' <td colspan="1"></td>';
              //   tmp1 += ' <td colspan="2"></td>';
              //   tmp1 += ' <td colspan="2"></td>';
              //   tmp1 += ' <td colspan="3"></td>';
              //   tmp1 += ' <td colspan="1"></td>';
              //   tmp1 += ' <td colspan="2"></td>';
              //   tmp1 += ' <td colspan="2"></td></tr>';
              //   gridContent += tmp1;
              // } else {
              //   var index = 1;
              //   for (const i in tmp.data) {
              //     var tmp1 = "";
              //     if (tmp.data.hasOwnProperty(i)) {
              //       tmp1 = '<tr> <td colspan="1">' + index + "</td>";
              //       tmp1 +=
              //         ' <td colspan="2">' + tmp.data[i]["itemName"] + "</td>"; //
              //       tmp1 += ' <td colspan="1">' + tmp.data[i]["brand"] + "</td>"; //
              //       tmp1 +=
              //         ' <td colspan="2">' + tmp.data[i]["description"] + "</td>"; //
              //       tmp1 +=
              //         ' <td colspan="2">' + tmp.data[i]["ModelNo"] + "</td>"; //
              //       tmp1 += ' <td colspan="3">' + tmp.data[i]["Quantity"] + "</td>"; //
              //       tmp1 += ' <td colspan="1">' + tmp.data[i]["unitName"] + "</td>"; //
              //       tmp1 += ' <td colspan="2">' + tmp.data[i]["UnitPrice"] + "</td>"; //
              //       tmp1 +=
              //         ' <td colspan="2">' + tmp.data[i]["amount"] + "</td>"; //
              //       gridContent += tmp1;
              //       index++;
              //     }
              //   }
              // }
              // gridContent +=
              //   '<tr> <td colspan="1">合计</td> <td colspan="7"></td> <td colspan="3">'+tmp.TotalQty+'</td> <td colspan="3"></td> <td colspan="2">' +
              //   tmp.TotalPrice +
              //   "</td> </td></table>";
              gridContent += tableCreat
              gridContent += "<p></p><p></p><p></p>";
              gridContent +=
                '<table border="1"><tr><td style="text-align:left">' +
                tmp.termsConditions +
                '<p style="height:30px"></p></td></tr></table>';
              gridContent += "<p>地址：" + tmp.address + "</p>";
              gridContent += "<p>电话：" + tmp.phone + "</p>";
              // gridContent += "<p>传真：" + tmp.fax + "</p>";
              gridContent += "<p>账号：" + tmp.accountNumber + "</p>";
              // gridContent += "<p>户名：" + tmp.accountName + "</p>";
              gridContent += "<p>开户行：" + tmp.accountBankName + "</p>";
              gridContent += "<p>备注: " + tmp.Remarks + "</p>";
              gridContent +=
                // '<div style="margin-top:100px;text-align:right"><img src="/assets/Logo_Wooddidi.png"></div><hr style="page-break-after: always; ;border:1px dashed #fff" />';
                '<div style="margin-top:100px;text-align:right"><img src="' + tmp.img + '" onerror="javascript:this.src=' + "'/assets/Logo_Wooddidi.png'" + ';this.onerror = null"></div><hr style="page-break-after: always; ;border:1px dashed #fff" />';
            }
          }

          gridContent += "</div>";
        } else if (command == 3 || command == 4) {
          gridContent = "<table><thead>";
          var printHeader = this.columns;
          for (const key7 in printHeader) {
            if (printHeader[key7].field == "checkbox") {
              printHeader.splice(key7, 1)
            }
          }
          for (const key5 in printHeader) {
            if (printHeader[key5].text == "多选") {
              printHeader.splice(key5, 1)
            }
          }

          var value = [];
          for (let index = 0; index < printHeader.length; index++) {
            if (!printHeader[index].hidden) {
              value.push(printHeader[index].field);
              gridContent += "<th>" + printHeader[index].title + "</th>";
            }
          }
          gridContent += "</thead><tbody>";
          var datalist = this.tableList;
          for (let index = 0; index < datalist.length; index++) {
            var data = datalist[index];
            gridContent += "<tr>";
            for (let index = 0; index < value.length; index++) {
              var has = false;
              for (const k in data) {
                if (value[index] == k) {
                  if (data['status'] == "已作废") {
                    if (k == "purchaseNO") {
                      gridContent += "<td style='text-decoration:line-through;color:red;'>" + data[k] + "</td>";
                    }
                    else {
                      gridContent += "<td>" + data[k] + "</td>";
                    }
                  }
                  else {
                    gridContent += "<td>" + data[k] + "</td>";
                  }
                  has = true;
                  break;
                }
              }
              if (has == false) {
                gridContent += "<td>" + "" + "</td>";
              }
            }
            gridContent += "</tr>";
          }
        }

        let newWindow = window.open("", "", "width=800, height=500"),
          document = newWindow.document.open(),
          pageContent =
            "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            '<meta charset="utf-8" />\n' +
            "<title></title>\n" +
            "<style type='text/css'>.content{margin:0 auto;width:800px}table { border-collapse:collapse;width:800px}tr,td,th { border:1px solid #666;text-align:center}</style>\n" +
            "</head>\n" +
            "<body>\n" +
            gridContent +
            "\n</body>\n</html>";
        document.write(pageContent);
        document.close();
        newWindow.print();
      },

      getAllTableListData(command, ids = "") {
        var data;
        if (ids) {
          data = {
            id_list: ids,
            data: this.searchData
          };
        } else {
          data = {
            noPage: 1,
            data: this.searchData
          };
        }
        if (command == 4) {
          data.data = this.searchData;
        }
        this.loading = true;
        this.$store
          .dispatch(this.tableDataUrl, data)
          .then(response => {
            var datalist = response.data.data;
            this.tableList = datalist;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getSalesListData(ids = "") {
        var data;
        if (ids) {
          data = {
            id_list: ids,
          };
        } else {
          data = {
            noPage: 1,
            data: this.searchData
          };
        }
        this.loading = true;
        this.$store
          .dispatch(this.salesDataUrl, data)
          .then(response => {
            var datalist = response.data.data;
            //var datalist = response.data;
            this.columnData = response.data.column;
            if (this.command == 1 || this.command == 2) {
              for (var i = 0; i < datalist.length; i++) {
                var obj = {
                  "Quantity": datalist[i].TotalQty,
                  "amount": datalist[i].TotalPrice
                }
                if (datalist[i].data === undefined) {
                  var obj1 = {}
                  for (var key9 in this.columnData) {
                    obj1[key9] = ""
                  }
                  datalist[i].data = []
                  datalist[i].data.push(obj1)
                  datalist[i].data.push(obj)
                } else {
                  datalist[i].data.push(obj)
                }
              }
            }
            console.log(datalist);
            this.companyName = datalist.companyName
            this.salesList = datalist.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate =
          date.getFullYear() + seperator1 + month + seperator1 + strDate;
        // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        //         + " " + date.getHours() + seperator2 + date.getMinutes()
        //         + seperator2 + date.getSeconds();
        return currentdate;
      },
      printHeader() {
        // this.$store.dispatch('common/getColumnSetInfo', {
        //   tableType: 'purchase_details_index',
        //   columns: [],
        // }).then(response => {
        //   this.PrintHeaderData = response.columns.columns
        //   console.log("8888888888888888888888888", response)
        // }).catch(error => {
        //   console.log(error)
        // })
      },
    }
  };
</script>
<style>
</style>