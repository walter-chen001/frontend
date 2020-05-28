<template>
  <el-card class="box-card centerSection">
    <el-form ref="form" :model="form">
      <el-form-item label="Domain Name">
        <el-input v-model="form.domainName"></el-input>
      </el-form-item>
      <el-form-item label="Fav Icon">
        <el-upload
          class="upload-demo"
          ref="upload"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          @on-success="handleSuccess"
          :http-request="uploadLogo"
          :data="uploadData"
          :file-List="logo"
          :auto-upload="false"
          multiple
          :limit="1"
        >
          <el-button native-type="button" size="large" @click="submitUpload">
            Upload
            <i class="el-icon-upload2"></i>
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item class="text-right pt-10">
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "domainSetting",
  data() {
    return {
      form: {
        domainName: ""
      }
    };
  },
  methods: {
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