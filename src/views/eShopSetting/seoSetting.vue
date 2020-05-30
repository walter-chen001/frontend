<template>
  <el-card class="box-card centerSection">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Language 1" name="language 1">
          <el-form ref="form" :model="form">
      <el-form-item label="Pages">
        <el-select v-model="seo.pages" @change="changePage">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Title">
        <el-input v-model="seo.title" @change="changeTitle"></el-input>
      </el-form-item>

      <el-form-item label="Description">
        <el-input type="textarea" v-model="seo.description" @change="changeDescrip"></el-input>
      </el-form-item>

      <el-form-item label="Multi tag">
        <el-input v-model="seo.multi_tag" @change="changeMulti"></el-input>
        <!--<el-select v-model="seo.multi_tag" multiple @change="changeMulti">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value"-->
          <!--&gt;</el-option>-->
        <!--</el-select>-->
      </el-form-item>

    </el-form>
      </el-tab-pane>
      <el-tab-pane label="Language 2" name="language 2">
        <el-form ref="form" :model="form">
          <el-form-item label="Pages">
            <el-select v-model="seo.pages" @change="changePage">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Title">
            <el-input v-model="seo.title" @change="changeTitle"></el-input>
          </el-form-item>

          <el-form-item label="Description">
            <el-input type="textarea" v-model="seo.description" @change="changeDescrip"></el-input>
          </el-form-item>

          <el-form-item label="Multi tag">
            <el-select v-model="seo.multi_tag" multiple @change="changeMulti">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Language 3" name="language 3">
        <el-form ref="form" :model="form">
          <el-form-item label="Pages">
            <el-select v-model="seo.pages" @change="changePage">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Title">
            <el-input v-model="seo.title" @change="changeTitle"></el-input>
          </el-form-item>

          <el-form-item label="Description">
            <el-input type="textarea" v-model="seo.description" @change="changeDescrip"></el-input>
          </el-form-item>

          <el-form-item label="Multi tag">
            <el-select v-model="seo.multi_tag" multiple @change="changeMulti">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>

import { default as csgShopApi } from "../../cgs_api/eShopSetting/onlineShopSetting";

export default {
  name: "seoSetting",
  data() {
    return {
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
      lang: [],
      activeName: "language 1",
    };
  },
  mounted() {
      // this.getStoredData();
  },
  computed: {
    seo: {
        get() {
            return this.$store.state.setting.seo;
        },
    },
    user: {
        get(){
            return this.$store.state.user.user.user_id;
        }
    }
  },
  methods: {
      getStoredData() {
          const dataToSend = {
              user_id: this.user_id
          };
          csgShopApi
              .getShopData(dataToSend)
              .then(({ data }) => {
                  this.lang = data.languages || [];
              })
              .catch(e => console.log(e));
      },
      updateSeo(obj) {
          console.log("submit!");
          var data = {...obj, user_id: this.user_id};
          csgShopApi
              .updateSeoData(data).then(response => {
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
      changePage(val) {
          this.updateSeo({'pages': val})
      },
      changeTitle(val) {
          this.updateSeo({'title': val})
      },
      changeDescrip(val) {
          this.updateSeo({'description': val})
      },
      changeMulti(val) {
          this.updateSeo({'multi_tag': val})
      }
  },
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