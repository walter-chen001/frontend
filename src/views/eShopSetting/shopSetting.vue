<template>
  <div>
    <el-row :gutter="0" type="flex" justify="center" class="centerSection">
      <div class="sectionContainer">
        <el-card class="box-card">
          <el-form :model="shop" ref="shop" :rules="shopDetailrules">
            <el-form-item label="E-Shop Name" prop="shop_name">
              <el-input v-model="shop.shop_name" @change="changeShopName"></el-input>
            </el-form-item>
            {{shop.shop_logo}}
            <el-form-item label="E-Shop logo" prop="logo">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="/"
                :on-remove="deleteAttachment"
                :on-change="addAttachment"
                :file-List="logo"
                :auto-upload="false"
              >
                <!-- :data="uploadData" -->
                <!-- v-model="shop.shop_logo" -->

                <el-button native-type="button" size="large">
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
                  v-for="item in shopData.languages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Region" prop="region">
              <el-select v-model="shop.region" placeholder="Select" @change="changeRegion">
                <el-option
                  v-for="item in shopData.regionList"
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
import * as ALL from "../../api/eShopSetting/onlineShopSetting";

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

    console.log(shopApi, "shopApishopApishopApi");

    function uploadValidation(rule, value, callback) {
      console.log(rule, value);

      if (!this.logo) {
        callback(new Error(`Please upload shop logo`));
      } else if (this.logo.length < 1) {
        callback(new Error(`Please upload shop logo`));
      } else {
        callback();
      }
    }

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
          // { validator: uploadValidation, trigger: "change" }
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
      }
    };
  },
  mounted() {
    this.getData();
  },
  // watch: {
  //   logo: function() {
  //     this.uploadValidation;
  //   }
  // },
  // created() {
  //   this.getData();
  // },
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
    submitUpload() {
      console.log("this.$refs.upload", this.$refs.upload.submit);
      this.$refs.upload.submit();
    },
    addAttachment(file, fileList) {
      // this.attachments.push(file);

      console.log("sdhbsjdbjb ");

      console.log(this.$refs["shop"]);
      this.logo.push(file);
      console.log(this.logo, "logooooooooooooooooooooooooooooooooo");
      this.shop.shop_logo = this.logo;
      console.log(this.logo.length);
      this.uploadValidation();
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
            console.log("successssssssssssss", response.data);
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
      var data = { ...this.shop, user_id: this.user_id };
      console.log(data, "jsgdsjhdgsajhdsjhdvsfhmsavafsmfvsmfhvsmhjfvh");
      console.log(this.$refs[formData].validate);
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