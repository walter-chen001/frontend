<template>
  <el-card class="box-card centerSection">
    <el-form ref="domain" :model="domain" :rules="domainRules">
        <el-form-item>
            <el-radio-group v-model="domain.domain_type">
                <el-radio :label="1">Main Domain</el-radio>
                <el-radio :label="0">Sub Domain</el-radio>
            </el-radio-group>
        </el-form-item>
        <div v-if="domain.domain_type === 1">
            <el-form-item  label="Multiple Domain Name" prop="main_domain_name">
                <el-input v-model="domain.domain_name" @change="changeName(domain)"></el-input>
            </el-form-item>

            <el-form-item>
                <p>The process will be redirect to the Shop-Owners domain to our sub-domain: 1.Login to provider backend: 2.Redirect the domain to our IP (A record) 123,123,123,123 3.After connected our server, we have individual to verify if this domain is our shop owner domain. www.frankie.com & frankie.com-> A record "xxx.xxx.xxx.xxxx</p>
            </el-form-item>
        </div>
        <div v-else>
            <el-form-item label="Sub Domain Name" prop="sub_domain_name">
                <el-input v-model="domain.domain_name" @change="changeName(domain)"></el-input>
            </el-form-item>
        </div>

    </el-form>
  </el-card>
</template>

<script>
import * as updateShop from "../../cgs_api/eShopSetting/onlineShopSetting"

export default {
  name: "domainSetting",
  data() {

    const mainValidation = ({field}, value, callback) => {
        if (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(this.domain.domain_name)) {
            callback();
        } else {
            callback(new Error(`Please Enter Valid Main Domain Name`));
        }
    };

    const subValidation = ({field}, value, callback) => {
          if (/[^a-zA-Z0-9\-]/.test(this.domain.domain_name)) {
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
    changeName(val) {
        console.log(val.domain_name, 'domain....', val.domain_type);
        this.updateDomain({'domain_name': val.domain_name, 'domain_type': val.domain_type})
    },
    // changeDomainType(val){
    //     console.log(val, 'vallllllllll');
    //     this.updateDomain({'domain_type': val})
    // },
    updateDomain(obj) {
        var data= {...obj, user_id : this.user_id};
        // this.$refs[obj].validate(valid => {
        //     if (valid) {
                updateShop.default.updateDomainData(data).then(response => {
                    if (response.code == 0) {
                        this.$notify.success({title: "提示", message: response.msg});
                    } else {
                        this.$notify.error({title: "提示", message: response.msg});
                    }
                })
                    .catch(error => {
                        console.log(error);
                    });
        //     }
        // })
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

.el-radio-group {
    display: flex !important;
}



.text-right {
  text-align: right;
}
</style>