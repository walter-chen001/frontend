<template>
  <div>
    <el-row :gutter="0" type="flex" justify="center" class="centerSection">
      <div class="sectionContainer">
        <el-card class="box-card">
          <el-form :model="shop" ref="shop" :rules="shopDetailrules">
            <el-form-item label="E-Shop Name" prop="shop_name">
              <el-input v-model="shop.name"></el-input>
            </el-form-item>
            <el-form-item label="E-Shop logo" prop="logo" required ref="upl" :onFieldChange="myChange()">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="/"
                :on-remove="deleteAttachment"
                :before-remove="beforeRemove"
                :on-change="addAttachment"
                :file-List="logo"
                :auto-upload="false"
              >
                <el-button native-type="button" size="large">
                  Upload
                  <i class="el-icon-upload2"></i>
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="Supported Languages" prop="language">
              <el-select v-model="shop.languages" multiple multiple-limit="3" placeholder="Select">
                <el-option
                  v-for="item in shopData.languages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Region Parent" prop="region_parent">
              <el-select v-model="shop.region" placeholder="Select">
                <el-option
                  v-for="item in shopData.regionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="Region child" prop="region_child">-->
            <!--<el-select v-model="shop.region.region_child" placeholder="Select">-->
            <!--<el-option-->
            <!--v-for="item in shopData.regionList"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value"-->
            <!--&gt;</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="Region sub child" prop="region_sub_child">-->
            <!--<el-select v-model="shop.region.region_sub_child" placeholder="Select">-->
            <!--<el-option-->
            <!--v-for="item in shopData.regionList"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value"-->
            <!--&gt;</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="Billing Currency" prop="currency">
              <el-select v-model="shop.currency" multiple multiple-limit="3" placeholder="Select">
                <el-option
                  v-for="item in shopData.currency"
                  :key="item.value"
                  :label="item.lang_name + ' ' + item.symbol"
                  :value="item.value"
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
import { default as shopApi } from "../../api/eShopSetting/onlineShopSetting";
import { default as updateShop } from "../../cgs_api/eShopSetting/onlineShopSetting";

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

    let uploadValidation = ({ field }, value, callback) => {
      if (this.logo.length < 1) {
        callback(new Error(`Please upload shop logo`));
      } else {
        callback();
      }
    };

    return {
      action: "",
      uploadData: { user_id: this.user_id },
      shopData: [],
      logo: [],
      DataShop: [],
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
        logo: [
          // {
          //   required: true,
          //   message: "Please upload shop logo 1",
          //   trigger: "change"
          // },
          { trigger: "change", validator: uploadValidation }
        ],
        region: [
          { required: true, message: "Please Time Region", trigger: "change" }
        ],
        language: [
          {
            required: true,
            message: "Please select any 3 languages",
            trigger: "change"
          },
          {
            trigger: "change",
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
      }
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    shop: {
      get() {
        return this.$store.state.setting.shop;
      }
    },
    user_id: {
      get() {
        return this.$store.state.user.user.user_id;
      }
    }
  },
  methods: {
    myChange() {
        console.log('Changed');
        if (this.logo.length !== 0) {
            this.$refs.upl.resetField();
        }
    },
    getData() {
      shopApi
        .getShopData()
        .then(response => {
          if (response.code == 0) {
            this.shopData = response.data;
          } else {
            this.$notify.error({ title: "提示", message: response.msg });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    addAttachment(file, fileList) {
        console.log(file);
      this.logo.push(file);
      this.shop.shop_logo = this.logo;
    },

    deleteAttachment() {
      this.shop.shop_logo = [];
    },
    update(obj) {
      var data = {
        data: { ...obj, user_id: this.user_id }
      };
      updateShop
        .updateData()
        .then(response => {
          if (response.code == 0) {
            this.$notify.success({ title: "提示", message: response.msg });
          } else {
            this.$notify.error({ title: "提示", message: response.msg });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // changeShopName(val) {
    //   this.update({'shop_name':val})
    // },
    // changeCurrency(val){
    //     this.update({'currency' : val})
    // },
    // changeRegion(val){
    //     this.update({'region': val})
    // },
    // changeLanguage(val) {
    //     this.update({'language': val})
    // },
    submitToSave(formData) {
        console.log(this.$refs.upl);
      var data = { ...this.shop, user_id: this.user_id };
      this.$refs[formData].validate(valid => {
        if (valid) {
          updateShop
            .postData(data)
            .then(response => {
              if (response.code == 0) {
                this.DataShop = response.data;
                this.$notify.success({ title: "提示", message: response.msg });
              } else {
                this.$notify.error({ title: "提示", message: response.msg });
              }
            })
            .catch(error => {
              console.log(error);
            });
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