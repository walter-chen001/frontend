<template>
  <el-card class="box-card centerSection">
    <el-form ref="form" :model="form">
      <el-form-item label="Pages">
        <el-select v-model="value1">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Title">
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
          label: "Home Page"
        },
        {
          value: "Option2",
          label: "Tag 1"
        },
        {
          value: "Option3",
          label: "Tag 2"
        },
        {
          value: "Option4",
          label: "Tag 3"
        },
        {
          value: "Option5",
          label: "Tag 4"
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