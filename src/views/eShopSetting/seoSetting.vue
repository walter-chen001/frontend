<template>
  <el-card class="box-card centerSection">
    <el-form ref="form" :model="form">
      <el-form-item label="Title">
        <el-select v-model="value1">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Pages">
        <el-input v-model="form.page"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="Multi tag">
        <el-select v-model="value2" multiple>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="text-right pt-10">
        <el-button type="primary" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "seoSetting",
  data() {
    return {
      form: {
        page: "",
        desc: ""
      },
      methods: {
        onSubmit() {
          console.log("submit!");
        }
      },
      options: [
        {
          value: "Option1",
          label: "Option1"
        },
        {
          value: "Option2",
          label: "Option2"
        },
        {
          value: "Option3",
          label: "Option3"
        },
        {
          value: "Option4",
          label: "Option4"
        },
        {
          value: "Option5",
          label: "Option5"
        }
      ],
      value1: [],
      value2: []
    };
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