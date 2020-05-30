<template>
  <div>
    <el-row :gutter="0" type="flex" justify="center" class="centerSection">
      <div class="sectionContainer">
        <el-card class="box-card">
          <el-form :model="shop" ref="shop" :rules="shopDetailrules">
            <el-form-item label="E-Shop Name" prop="name">
              <el-input v-model="shop.name"></el-input>
            </el-form-item>
            <el-form-item label="Supported Languages" prop="languages">
              <el-select v-model="shop.languages" multiple multiple-limit="3" placeholder="Select">
                <el-option
                  v-for="lang in langData"
                  :key="lang.value"
                  :label="lang.label"
                  :value="lang.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Region" prop="region">
              <el-cascader v-model="shop.region" :options="regionData"></el-cascader>
            </el-form-item>

            <el-form-item label="Billing Currency" prop="currency">
              <el-select v-model="shop.currency" multiple multiple-limit="3" placeholder="Select">
                <el-option
                  v-for="item in currencyData"
                  :key="item.value"
                  :label="item.attributes.name + ' ' + item.attributes.symbol"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="text-right pt-10">
              <el-button :loading="loading" :disabled="loading" type="primary" size="small" @click="submitToSave('shop')">{{loading ? "Saving.." : "Save"}}</el-button>
            </div>
          </el-form>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
import { default as shopApi } from "../../api/eShopSetting/onlineShopSetting";
import { default as csgShopApi } from "../../cgs_api/eShopSetting/onlineShopSetting";
import { getCompanyId } from "@/utils/auth";

export default {
  name: "shopSetting",
  data() {
    return {
      langData: [],
      currencyData: [],
      regionData: [],
      loading: false,
      shopDetailrules: {
        name: [
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
        region: [
          { required: true, message: "Please select Region", trigger: "change" }
        ],
        languages: [
          {
            required: true,
            message: "Please select atleast 1 Language",
            trigger: "change"
          }
        ],
        currency: [
          {
            required: true,
            message: "Please select atleast 1 Currency",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.getLangData();
    this.getCurrencyData();
    this.getRegionData();
    this.getStoredData();
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
    getLangData() {
      shopApi
        .getLanguageData()
        .then(response => {
          if (response.code == 0) {
            this.langData = response.data;
          } else {
            this.$notify.error({ title: "提示", message: response.msg });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getCurrencyData() {
      shopApi
        .getCurrencyList()
        .then(response => {
          if (response.code == 0) {
            this.currencyData = response.data;
          } else {
            this.$notify.error({ title: "提示", message: response.msg });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getRegionData() {
      shopApi
        .getRegionList()
        .then(response => {
          if (response.code == 0) {
            this.regionData = response.data;
          } else {
            this.$notify.error({ title: "提示", message: response.msg });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getStoredData() {
      const dataToSend = {
        user_id: this.user_id
      };
      csgShopApi
        .getShopData(dataToSend)
        .then(({ data }) => {
          console.log(data);
          this.shop.name = data.name || "";
          this.shop.languages = data.languages || [];
          this.shop.region = data.region || [];
          this.shop.currency = data.currency || [];
          console.log("shop name", this.shop.name);
          // this.shop.
          // this.shop.
        })
        .catch(e => console.log(e));
    },

    submitToSave(formData) {
      var data = {
        ...this.shop,
        region: JSON.stringify(this.shop.region.map(data => data)),
        languages: JSON.stringify(this.shop.languages.map(data => data)),
        currency: JSON.stringify(this.shop.currency.map(data => data)),
        user_id: this.user_id,
        company_id: getCompanyId()
      };
      console.log(data);

      delete data.shop_logo;

      this.$refs[formData].validate(valid => {
        if (valid) {
          this.loading = true;
          csgShopApi
            .postData(data)
            .then(response => {
              if (response.code == 0) {
                this.$notify.success({ title: "提示", message: response.msg });
              } else {
                this.$notify.error({ title: "提示", message: response.msg });
              }
              this.loading = false;
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