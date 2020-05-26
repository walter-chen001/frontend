<template>
  <div>
    <el-row :gutter="0" type="flex" justify="center" class="centerSection">
      <div class="sectionContainer">
        <el-card class="box-card">
          <el-form :model="shop" ref="shop" :rules="shopDetailrules">
            <el-form-item label="E-Shop Name" prop="shop_name">
              <el-input v-model="shop.shop_name" @change="changeShopName"></el-input>
            </el-form-item>
            <el-form-item label="E-Shop logo" prop="shop_logo">
              <el-upload
                class="upload-demo"
                ref="upload"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                @on-success="handleSuccess"
                :data="uploadData"
                :action="action"
                :auto-upload="true"
                multiple
                :limit="1"
              >
                <el-button native-type="button" size="large" @click="submitUpload">
                  Upload
                  <i class="el-icon-upload2"></i>
                </el-button>
              </el-upload>
            </el-form-item>

            <el-form-item label="Supported Languages" prop="language">
              <el-select
                v-model="shop.language"
                multiple
                @change="changeLanguage"
                multiple-limit="3"
                placeholder="Select"
              >
                <el-option
                  v-for="item in languages"
                  :key="item.language_id"
                  :label="item.language_name"
                  :value="item.language_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Region" prop="region">
              <el-select v-model="shop.region" placeholder="Select" @change="changeRegion">
                <el-option
                  v-for="item in regions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Billing Currency" prop="currency">
              <el-select
                v-model="shop.currency"
                multiple
                @change="changeCurrency"
                multiple-limit="3"
                placeholder="Select"
              >
                <el-option
                  v-for="item in currencies"
                  :key="item.currency_id"
                  :label="item.currency_name"
                  :value="item.currency_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="text-right pt-10">
              <el-button type="primary" size="small" @click="submitToSave('shop')">Save</el-button>
            </div>
          </el-form>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
import * as ALL from "../../api/eShopSetting/onlineShopSetting";

export default {
  name: "eShopSetting",
  data() {
    const selectAtleast3 = ({ field }, value, callback) => {
      if (value.length <= 2) {
        callback(new Error(`Please select atleast 3 ${field}`));
      } else {
        callback();
      }
    };

    return {
        action: `https://jsonplaceholder.typicode.com/posts/`,
        uploadData: {userId: 1304, pathName: 'company'},
        languages: [
            {
                language_id: 501,
                language_name: "Chinese Simplified",
                language_code: "chinese_simplified",
                language_symbol: "简体中文"
            },
            {
                language_id: 502,
                language_name: "Chinese Traditional",
                language_code: "chinese_traditional",
                language_symbol: "中國傳統的"
            },
            {
                language_id: 503,
                language_name: "English",
                language_code: "english",
                language_symbol: "English"
            },
            {
                language_id: 504,
                language_name: "Tamil",
                language_code: "tamil",
                language_symbol: "தமிழ்"
            }
        ],
        regions: [
            {
                value: "(GMT +08:00) Asia/Hong_Kong",
                label: "(GMT +08:00) Asia/Hong_Kong"
            },
            {
                value: "(GMT +05:00) Asia/China",
                label: "(GMT +05:00) Asia/China"
            },
            {
                value: "(GMT +05:30) Asia/India",
                label: "(GMT +05:30) Asia/India"
            },
            {
                value: "(GMT +04:00) Asia/Nepal",
                label: "(GMT +04:00) Asia/Nepal"
            }
        ],
        currencies: [
            {
                currency_id: 501,
                currency_name: "EUR",
                currency_code: "eur",
                currency_symbol: "€"
            },
            {
                currency_id: 502,
                currency_name: "USD",
                currency_code: "usd",
                currency_symbol: "$"
            },
            {
                currency_id: 503,
                currency_name: "YUAN",
                currency_code: "yuan",
                currency_symbol: "¥"
            },
            {
                currency_id: 504,
                currency_name: "INR",
                currency_code: "inr",
                currency_symbol: "₹"
            }
        ],
        shopDetailrules: {
            shop_name: [
                {
                    required: true,
                    message: "Please input Shop name",
                    trigger: "blur"
                },
                {
                    min: 3,
                    max: 50,
                    message: "Length should be 3 to 50",
                    trigger: "blur"
                }
            ],
            shop_logo: [
                {required: true, message: "Please upload logo", trigger: "change"},
            ],
            region: [
                {required: true, message: "Please Time Region", trigger: "change"}
            ],
            language: [
                {
                    required: true,
                    message: "Please select any 3 languages",
                    trigger: "change"
                },
                {
                    trigger: "blur",
                    validator: selectAtleast3
                }
            ],
            currency: [
                {
                    required: true,
                    message: "Please select any 3 Currencies",
                    trigger: "change"
                },
                {
                    trigger: "blur",
                    validator: selectAtleast3
                }
            ]
        },
    }
  },
  mounted() {
    this.getAllMasterData();
  },
  computed: {
      shop() {
              return this.$store.state.setting.shop
      }
  },
  methods: {
    submitUpload() {
        console.log('this.$refs.upload',this.$refs.upload.submit);
        this.$refs.upload.submit();
    },
    handleLogoChange(e, b, c) {
      console.log(e, b, c);
    },
    handleSuccess (res, file, fileList) {
        console.log('res', res, 'file', file, 'fileList', fileList);
        this.shopData.shop_logo = 'shop_logo';
        this.$refs.shopData.validateField('shop_logo')
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfer of ${file.name} ?`);
    },
    update(obj){
        var data={
            data:obj
        };
        this.$store.dispatch("",data).then(response => {
            if(response.code==0){
                this.$notify.success({title:"提示",message:response.msg});
            }else{
                this.$notify.error({title:'提示',message:response.msg});
            }
        }).catch(error => {
            console.log(error)
        })
    },
    changeShopName(val) {
      this.update({'shop_name':val})
    },
    changeCurrency(val){
        this.update({'currency' : val})
    },
    changeRegion(val){
        this.update({'region': val})
    },
    changeLanguage(val) {
        this.update({'language': val})
    },
    submitToSave(formData) {
        console.log(this.$refs[formData].validate);
      this.$refs[formData].validate(valid => {
        if (valid) {
          alert("saved successfully!");
        } else {
          console.log("error in saving!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.home-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.mb-0 {
  margin-bottom: 0;
}
.pt-10 {
  padding-top: 10px;
}
.sectionContainer {
  width: 100%;
}
.centerSection {
  margin: 35px;
  .el-form-item {
    display: flex;
    flex-flow: column;
    .el-form-item__label {
      text-align: left;
      font-size: 12px;
      font-weight: 700;
    }
  }
  .el-select {
    display: block;
  }
}
.text-right {
  text-align: right;
}
.chooseRole {
  p {
    font-size: 12px;
  }
}
.el-radio {
  margin-bottom: 10px;
  display: flex !important;
  .el-radio__label {
    font-size: 12px;
    white-space: normal;
  }
}
.memberAddButton {
  position: absolute;
  right: 2px;
  top: 2px;
}
.upload-demo {
  .el-upload {
    width: 100%;
    .el-button {
      width: 100%;
      display: block;
    }
  }
}
</style>