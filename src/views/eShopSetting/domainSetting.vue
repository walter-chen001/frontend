<template>
  <el-card class="box-card centerSection">
    <el-form ref="domain" :model="domain" :rules="domainRules">
        <el-form-item label="Name">
            <el-radio-group @change="changeBestSeller" v-model="domain.domain">
                <el-radio label="main_domain">Main Domain</el-radio>
                <el-radio label="sub_domain">Sub Domain</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item v-if="domain.domain === 'main_domain'">
            <p>The process will be redirect to the Shop-Owners domain to our sub-domain: 1.Login to provider backend: 2.Redirect the domain to our IP (A record) 123,123,123,123 3.After connected our server, we have individual to verify if this domain is our shop owner domain. www.frankie.com & frankie.com-> A record "xxx.xxx.xxx.xxxx</p>
        </el-form-item>

        <!--<el-form-item v-if="domain.domain === 'main_domain'" label="Main Domain Name" prop="main_domain_name">-->
            <!--<el-input v-model="domain.main_domain_name" @change="changeName"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item v-if="domain.domain === 'sub_domain'" label="Sub Domain Name" prop="sub_domain_name">
            <el-input v-model="domain.sub_domain_name" @change="changeName"></el-input>
        </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
import * as updateShop from "../../cgs_api/eShopSetting/onlineShopSetting"

export default {
  name: "domainSetting",
  data() {

    const mainValidation = ({field}, value, callback) => {
        // /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
        console.log(this.domain.main_domain_name, 'mainnnnnn');
        // /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
        // /^[a-z0-9]+([-.][a-z0-9]+)*\.[a-z]{2,}$/i
        if (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(this.domain.main_domain_name)) {
            callback();
        } else {
            callback(new Error(`Please Enter Valid Main Domain Name`));
        }
    };

    const subValidation = ({field}, value, callback) => {
          // /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
          console.log(this.domain.sub_domain_name, 'Subbbbbbbbb');
          if (/[^a-zA-Z0-9\-]/.test(this.domain.sub_domain_name)) {
              callback(new Error(`Please Enter Valid Sub Domain Name`));
          } else {
              callback();
          }
    };
    return {
      fav_icon: [],
      domainRules : {
          main_domain_name: [
              {trigger: "change", validator: mainValidation}
          ],
          sub_domain_name: [
              {trigger: "change", validator: subValidation}
          ],
      }
    };
  },
  computed: {
    domain: {
        get() {
            return this.$store.state.setting.domain;
        }
    },
    user_id: {
        get() {
            return this.$store.state.user.user.user_id;
        }
    }
  },
  methods: {
    // changeName(val) {
    //     this.updateDomain({'domain_name': val})
    // },
    updateDomain(obj) {
        var data= {...obj, user_id : this.user_id};
        updateShop.default.updateDomainData(data).then(response => {
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
  }
};
</script>

<style lang="scss">
.pt-10 {
  padding-top: 10px;
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
    display: block !important;
  }
}
.text-right {
  text-align: right;
}
</style>