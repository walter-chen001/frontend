<template>
  <div>
    <el-row :gutter="0" type="flex" justify="center" class="centerSection">
      <div class="sectionContainer">
        <el-card class="box-card">
          <el-form :model="shopData" ref="shopData" :rules="shopDetailrules">
            <el-form-item label="E-Shop Name" prop="shop_name">
              <el-input v-model="shopData.shop_name"></el-input>
            </el-form-item>
            {{shopData.shop_logo}} ------

            <el-form-item label="E-Shop logo" prop="shop_logo">
              <el-upload
                class="upload-demo"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                :data="uploadData"
                :on-change="handleLogoChange"
                action="#"
                :auto-upload="false"
                multiple
                :limit="1"
              >
                <el-button native-type="button" size="large">
                  Upload
                  <i class="el-icon-upload2"></i>
                </el-button>
              </el-upload>
            </el-form-item>
            </el-form-item>

            <el-form-item label="Supported Languages" prop="language">
              <el-select
                v-model="shopData.language"
                multiple
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
              <el-select v-model="shopData.region" placeholder="Select">
                <el-option
                  v-for="item in regions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Members(User Right)" prop="members">
              <el-input @click="openRoleDialog" v-model="shopData.members" readonly></el-input>
              <el-button
                type="primary"
                size="small"
                native-type="button"
                @click="openRoleDialog"
                class="memberAddButton"
              >+</el-button>
            </el-form-item>
            <el-form-item label="Billing Currency" prop="currency">
              <el-select
                v-model="shopData.currency"
                multiple
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
              <el-button type="primary" size="small" @click="submitToSave('shopData')">Save as Draft</el-button>
            </div>
          </el-form>
        </el-card>
      </div>

      <el-dialog title="Choose Role" :visible.sync="dialogTableVisible" :destroy-on-close="true">
        <div class="chooseRole">
          <el-form ref="chooseRole" :model="chooseRole" :rules="chooseRoleRules">
            <el-form-item label="Email / Wechat ID" prop="email_wechatID">
              <el-input v-model="chooseRole.email_wechatID"></el-input>
            </el-form-item>

            <el-form-item label="Whatever role you choose to assign, only you can transfer, duplicate or delete this site, or access the billing info." prop="radio">
              <el-radio-group v-model="chooseRole.radio">
                <el-radio :label="1">
                  <strong>Admin:</strong> Has full access to the site but cannot edit the payment info, delete or duplicate the site.
                </el-radio>
                <el-radio :label="2">
                  <strong>Back Office Manager:</strong> Can access the dashboard to manage site settings and apps but cannot edit the site.
                </el-radio>
                <el-radio :label="3">
                  <strong>Website Manager:</strong> Can edit the site, manage settings and apps but cannot access inbox, contacts and other sensitive info.
                </el-radio>
                <el-radio :label="4">
                  <strong>Bookings Admin:</strong> Has full access to your bookings calendar and contacts page, but cannot edit other areas of your site.
                </el-radio>
                <el-radio :label="5">
                  <strong>Booking Staff Member:</strong> Can book their own clients, access their personal calendar and manage their sessions.
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <div class="text-right pt-10">
              <el-button type="primary" size="small" @click="inviteMembers('chooseRole')">Invite</el-button>
              <el-button type="primary" size="small" @click="closeDialog">Cancel</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
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
    const uploadLogo = ({field}, value, callback) => {
        console.log('file upload',field, value, callback, 'ssjdbbfdjfbmdj');
      if(value.length < 1) {
          callback(new Error(`Please upload logo ${field}`));
      }  else {
          callback();
      }
    };

    return {
      uploadData: {user_id: '', pathName: ''},
      shopData: {
        shop_name: "",
        shop_logo: "",
        language: [],
        region: "",
        members: "",
        currency: [],
        roles: []
      },
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
          { required: true, message: "Please upload logo", trigger: "change" },
        ],
        region: [
          { required: true, message: "Please Time Region", trigger: "change" }
        ],
        members: [
          {
            required: true,
            message: "Please insert Email ID with Role",
            trigger: "change"
          }
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

      // For Role Dialog
      dialogTableVisible: false,
      chooseRole: {
        radio: "",
        email_wechatID: ""
      },
      chooseRoleRules: {
        email_wechatID: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: "blur"
          }
        ],
        radio: [
          {
            required: true,
            message: "Please select any one Role",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    this.getAllMasterData();
  },
  computed: {},
  methods: {
    getAllMasterData() {
      // console.log(ALL);
      // getTableData()
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    handleLogoChange(e, b, c) {
      console.log(e, b, c);
    },
    handleSuccess (res, file, fileList) {
        console.log('res', res, 'file', file, 'fileList', fileList);
        // Here you can write the file after the successful upload, but be sure to remember to assign value to fileUrl
        this.shopData.shop_logo = 'shop_logo';
        // The file form will not be triggered after the file is uploaded. You must manually add the verification.
        this.$refs.shopData.validateField('shop_logo')
    },
    selectRole(val) {
      switch (val) {
        case 1:
          return "Admin";
        case 2:
          return "Back Office Manager";
        case 3:
          return "Website Manager";
        case 4:
          return "Bookings Admin";
        case 5:
          return "Booking Staff Member";
        default:
          return "";
      }
    },
    mapRadioValue() {
      this.shopData.members =
        this.chooseRole.email_wechatID +
        " (" +
        this.selectRole(this.chooseRole.radio) +
        ")";
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfer of ${file.name} ?`);
    },
    closeDialog() {
      this.mapRadioValue();
      this.dialogTableVisible = false;
    },
    openRoleDialog() {
      this.dialogTableVisible = true;
    },
    changeUnDirtyField(formName) {
      console.log(this.$refs[formName]);
    },
    inviteMembers(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("Invited!");
          // this.changeUnDirtyField(formName);
          this.closeDialog();
        } else {
          console.log("error in inviting!!");
          return false;
        }
      });
    },
    submitToSave(formData) {
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