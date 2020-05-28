<template>
  <el-card class="box-card centerSection">
    <el-form ref="domain" :model="domain" :rules="domainRules">
      <el-form-item label="Domain Name" prop="domain_name">
        <el-input v-model="domain.domain_name" @change="changeName"></el-input>
      </el-form-item>

      <el-form-item label="Fav Icon" prop="fav_icon" ref="upl" :onFieldChange="myChange()">
        <el-upload
                class="upload-demo"
                ref="upload"
                action="/"
                :on-remove="deleteAttachment"
                :before-remove="beforeRemove"
                :on-change="addAttachment"
                :file-List="fav_icon"
                :auto-upload="false"
        >
          <el-button native-type="button" size="large">
            Upload
            <i class="el-icon-upload2"></i>
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import * as updateShop from "../../cgs_api/eShopSetting/onlineShopSetting"

export default {
  name: "domainSetting",
  data() {

    const uploadFavIcon = ({ field }, value, callback) => {
        if (this.fav_icon.length < 1) {
            callback(new Error(`Please upload Fav Icon`));
        } else {
            callback();
        }
    };

    const nameValidation = ({field}, value, callback) => {
        // /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
        console.log(this.domain.domain_name, 'nameeeeeeeeeeeeeeeeee');
        if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(this.domain.domain_name)) {
            callback();
        } else {
            callback(new Error(`Please Enter Valid Domain Name`));
        }
    };
    return {
      fav_icon: [],
      domainRules : {
          domain_name: [
              {trigger: "change", validator: nameValidation}
          ],
          fav_icon: [
              { trigger: "blur", validator: uploadFavIcon }
          ]
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
        this.updateDomain({'domain_name': val})
    },
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
    myChange() {
        console.log('Changed.... fav icon');
        if (this.fav_icon.length !== 0) {
            this.$refs.upl.resetField();
        }
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    addAttachment(file, fileList) {
        this.fav_icon.push(file);
        this.domain.fav_icon = this.fav_icon;
    },
    deleteAttachment() {
        this.domain.fav_icon = [];
    },
    onSubmit() {
      console.log("submit!");
    }
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