<template>
  <el-row :gutter="0" type="flex" justify="center" class="centerSection">
    <div class="sectionContainer">
      <el-card class="box-card">
        <el-form ref="shopData" :model="shopData">
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
              <el-button size="large">
                <i class="el-icon-upload2"></i>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="Languages">
            <el-select v-model="language" multiple multiple-limit="3" placeholder="Select">
              <el-option
                v-for="item in lang"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Region">
            <el-select v-model="region" placeholder="Select">
              <el-option
                v-for="item in regions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Members">
            <el-input v-model="shopData.members"></el-input>
            <el-button type="primary" size="small" @click="dialogTableVisible = true" class="memberAddButton">+</el-button>
          </el-form-item>
          <el-form-item label="Billing Currency">
            <el-select v-model="billing_currency" multiple multiple-limit="3" placeholder="Select">
              <el-option
                v-for="item in currency"
                :key="item.currency_id"
                :label="item.currency_name"
                :value="item.currency_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="text-right pt-10">
            <el-button type="primary" size="small">Continue</el-button>
          </div>
        </el-form>
      </el-card>
    </div>

    <el-dialog title="Choose Role" :visible.sync="dialogTableVisible">
      <div class="chooseRole">
        <el-form ref="chooseRole" :model="chooseRole">
          <el-form-item label="Email / Wechat ID">
            <el-input v-model="chooseRole.email_wechatID"></el-input>
          </el-form-item>
          <!-- <h4 class="mb-0">Choose Role</h4> -->
          <p>Whatever role you choose to assign, only you can transfer, duplicate or delete this site, or access the billing info.</p>
          <el-radio-group v-model="radio">
            <el-radio
              :label="1"
            >Admin: Has full access to the site but cannot edit the payment info, delete or duplicate the site.</el-radio>
            <el-radio
              :label="2"
            >Back Office Manager: Can access the dashboard to manage site settings and apps but cannot edit the site.</el-radio>
            <el-radio
              :label="3"
            >Website Manager: Can edit the site, manage settings and apps but cannor access inbox, contacts and other sensitive info.</el-radio>
            <el-radio
              :label="4"
            >Bookings Admin: Has full access to your bookings calendar and contacts page, but cannot edit other areas of your site.</el-radio>
            <el-radio
              :label="5"
            >Booking Staff Member: Can book their own clients, access their personal calendar and manage their sessions.</el-radio>
          </el-radio-group>
          <div class="text-right pt-10">
            <el-button type="primary" size="small">Invite</el-button>
            <el-button type="primary" size="small">Cancel</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: "shopSetting",
  data() {
    return {
      shopData: {
        shop_name: null,
        members: []
      },
      // For Role Dialog
      dialogTableVisible: false,
      chooseRole: {
        email_wechatID: null
      },

      fileList: "",
      language: [],
      region: [],
      billing_currency: [],
      lang: [
        {
          value: "english",
          label: "English"
        },
        {
          value: "chinese",
          label: "Chinese"
        },
        {
          value: "chinese traditional",
          label: "Chinese Traditional"
        },
        {
          value: "chinese cultured",
          label: "Chinese cultured"
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
      currency: [
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
      ]
    };
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
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
  width: 450px;
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
</style>