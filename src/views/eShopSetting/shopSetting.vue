<template>
  <el-row :gutter="0" type="flex" justify="center" class="centerSection">
    <div class="sectionContainer">
      <el-card class="box-card">
        <el-form ref="shopData" :model="shopData" :rules="rules">
          <el-form-item label="E-Shop Name">
            <el-input v-model="shopData.shop_name"></el-input>
          </el-form-item>
          <el-form-item label="E-Shop logo">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :file-list="fileList"
            >
              <el-button size="large"> Upload
                <i class="el-icon-upload2"></i>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="Supported Languages">
            <el-select v-model="languages" multiple multiple-limit="3" placeholder="Select">
              <el-option
                v-for="item in shopData.language"
                :key="item.language_id"
                :label="item.language_name"
                :value="item.language_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Region">
            <el-select v-model="region" placeholder="Select">
              <el-option
                v-for="item in shopData.region"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Members(User Right)">
            <el-input v-model="shopData.members"></el-input>
            <el-button type="primary" size="small" @click="dialogTableVisible = true" class="memberAddButton">+</el-button>
          </el-form-item>
          <el-form-item label="Billing Currency">
            <el-select v-model="currency" multiple multiple-limit="3" placeholder="Select">
              <el-option
                v-for="item in shopData.currency"
                :key="item.currency_id"
                :label="item.currency_name"
                :value="item.currency_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="text-right pt-10">
            <el-button type="primary" size="small" @click="saveDraft('shopData')">Save as Draft</el-button>
          </div>
        </el-form>
      </el-card>
    </div>

    <el-dialog title="Choose Role" style="width: 120%" :visible.sync="dialogTableVisible">
      <div class="chooseRole">
        <el-form ref="chooseRole" :model="chooseRole">
          <el-form-item label="Email / Wechat ID" :rules="[
              { required: true, message: 'Please input email address', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
            ]">
            <el-input v-model="chooseRole.email_wechatID"></el-input>
          </el-form-item>
           <!--<h4 class="mb-0">Choose Role</h4>-->
          <p>Whatever role you choose to assign, only you can transfer, duplicate or delete this site, or access the billing info.</p>
          <el-radio-group v-model="radio" :rules="[
            {required: true, message: 'Please choose role', trigger: 'blur' }]">
            <el-radio :label="1">
                <b>Admin:</b> Has full access to the site but cannot edit the payment info, delete or duplicate the site.</el-radio>
            <el-radio :label="2">
                <b>Back Office Manager:</b> Can access the dashboard to manage site settings and apps but cannot edit the site.</el-radio>
            <el-radio :label="3">
                <b>Website Manager:</b> Can edit the site, manage settings and apps but cannot access inbox, contacts and other sensitive info.</el-radio>
            <el-radio :label="4">
                <b>Bookings Admin:</b> Has full access to your bookings calendar and contacts page, but cannot edit other areas of your site.</el-radio>
            <el-radio :label="5">
                <b>Booking Staff Member:</b> Can book their own clients, access their personal calendar and manage their sessions.</el-radio>
          </el-radio-group>
          <div class="text-right pt-10">
            <el-button type="primary" size="small" @click="inviteMembers('chooseRole')">Invite</el-button>
            <el-button type="primary" size="small" @click="closeDialog">Cancel</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: "eShopSetting",
  data() {
    return {
        fileList: "",
        languages: [],
        region:[],
        currency: [],
        shopData: {
            shop_name : '',
            shop_logo: '',
            language: [{
                "language_id":501,
                "language_name":"Chinese Simplified",
                "language_code":"chinese_simplified",
                "language_symbol":"简体中文"
                },
                {
                    "language_id":502,
                    "language_name":"Chinese Traditional",
                    "language_code":"chinese_traditional",
                    "language_symbol":"中國傳統的"
                },
                {
                    "language_id":503,
                    "language_name":"English",
                    "language_code":"english",
                    "language_symbol":"English"
                },
                {
                    "language_id":504,
                    "language_name":"Tamil",
                    "language_code":"tamil",
                    "language_symbol":"தமிழ்"
                }],
            region: [{
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
                }] ,
            members : [],
            currency: [{
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
                }],
        },
        rules: {
            shop_name: [
                {required: true, message: 'Please input Shop name', trigger: 'blur'},
                {min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur'}
            ],
            shop_logo: [
                {required: true, message: 'Please upload logo', trigger: 'change'}
            ],
            language: [
                {required: true, message: 'Please select any 3 languages', trigger: 'change'}
            ],
        },

      // For Role Dialog
      radio: false,
      dialogTableVisible: false,
      chooseRole: {
        email_wechatID: null
      },
      billing_currency: [],
    };
  },
  computed: {
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    closeDialog(){
      this.dialogTableVisible = false;
    },
    inviteMembers(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('Invited!');
            } else {
                console.log('error in inviting!!');
                return false;
            }
        });
    },
    saveDraft(formData){
        this.$refs[formData].validate((valid) => {
            if (valid) {
                alert('saved successfully!');
            } else {
                console.log('error in saving!!');
                return false;
            }
        });
    },
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
.chooseRole{
    p {
        font-size: 12px;
    }
}
.el-radio {
    margin-bottom: 10px;
    display: flex!important;
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