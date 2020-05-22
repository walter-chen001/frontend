<template>
  <div class="eShopEditor">
    <el-row :gutter="20" type="flex">
      <el-col :span="16">
        <div class="editorTopSection">
          <el-row type="flex" justify="space-between">
            <div class="equalSizeRadioButton ml-40">
              <el-radio-group v-model="radio1" size="medium">
                <el-radio-button label="Tv">
                  <i class="fa fa-tv"></i>
                </el-radio-button>
                <el-radio-button label="Mobile">
                  <i class="el-icon-mobile"></i>
                </el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <el-row>
                <el-button type="primary" size="small">Save Draft</el-button>
                <el-button type="primary" size="small" icon="el-icon-refresh-left" circle></el-button>
                <el-button type="primary" size="small" icon="el-icon-refresh-right" circle></el-button>
                <el-button type="primary" size="small">Preview</el-button>
                <el-button type="primary" size="small">Publish</el-button>
              </el-row>
            </div>
          </el-row>
        </div>
        <el-row :gutter="0" type="flex">
          <div class="editorLeftSection">
            <div class="equalSizeRadioButton blockRadionButton">
              <el-radio-group v-model="radio3" size="medium">
                <el-radio-button label="Layout Settings">
                  <i class="fa fa-tv"></i>
                </el-radio-button>
                <el-radio-button label="Sidebar Settings">
                  <i class="el-icon-mobile"></i>
                </el-radio-button>
                <el-radio-button label="Colour Settings">
                  <i class="el-icon-mobile"></i>
                </el-radio-button>
                <el-radio-button label="LTR/RTL Settings">
                  <i class="el-icon-mobile"></i>
                </el-radio-button>
                <el-radio-button label="Dark / Light Mode Settings">
                  <i class="el-icon-mobile"></i>
                </el-radio-button>
                <el-radio-button label="Upload Background Image / Pattern / Plain Colour Settings">
                  <i class="el-icon-mobile"></i>
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <el-col class="h-100">
            <div class="editorPreviewSection">
              <i class="fa fa-search"></i>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-select v-model="value" placeholder="Select" class="mb-15">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <h1 class="mt-0">Home Page Controller</h1>
        <el-collapse class="pageSettings" v-model="activeNames" @change="handleChange">
          <div class="dragCheckCollapse">
            <div class="titleCheckbox">
              <el-checkbox v-model="checked"></el-checkbox>
            </div>
            <el-collapse-item title="Home Slider" name="1">
              <el-row :gutter="0" type="flex" justify="end">
                <el-radio-group v-model="radio2" size="mini">
                  <el-radio-button label="Eng"></el-radio-button>
                  <el-radio-button label="T-Chi"></el-radio-button>
                  <el-radio-button label="S-Chi"></el-radio-button>
                </el-radio-group>
              </el-row>
              <div class="p-15">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img :src="dialogImageUrl" alt />
                </el-dialog>
              </div>
            </el-collapse-item>
          </div>
          <div class="dragCheckCollapse">
            <div class="titleCheckbox">
              <el-checkbox></el-checkbox>
            </div>
            <el-collapse-item title="Collection Banner" name="2">
              <el-row :gutter="0" type="flex" justify="end">
                <el-radio-group v-model="radio2" size="mini">
                  <el-radio-button label="Eng"></el-radio-button>
                  <el-radio-button label="T-Chi"></el-radio-button>
                  <el-radio-button label="S-Chi"></el-radio-button>
                </el-radio-group>
              </el-row>
              <div class="p-15">
                <div class="collectionBannerSection">
                  <h4 class="m-0">Mens Shirt Red</h4>
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>

                <div class="collectionBannerSection">
                  <h4 class="m-0">Woman Shirt Red</h4>
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "Home Page",
          label: "Home Page"
        },
        {
          value: "About Us",
          label: "About Us"
        },
        {
          value: "Shop",
          label: "Shop"
        },
        {
          value: "Product",
          label: "Product"
        },
        {
          value: "Manage Pages",
          label: "Manage Pages"
        }
      ],
      value: "",
      activeNames: ["1"],

      checked: true,
      radio: "1",

      radio1: "Tv",
      radio2: "Eng",
      radio3: "",

      // ImageUpoad
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleChange(val) {
      console.log(val);
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
.m-0 {
  margin: 0;
}
.mt-0 {
  margin-top: 0;
}
.ml-40 {
  margin-left: 40px;
}
.p-15 {
  padding: 15px;
}
.eShopEditor {
  padding: 15px;
}
.mb-15 {
  margin-bottom: 15px;
}
.equalSizeRadioButton {
  .el-radio-button--medium {
    .el-radio-button__inner {
      padding: 10px;
    }
  }
}
.editorTopSection {
  background: #fff;
  padding: 5px;
}
.blockRadionButton {
  .el-radio-button {
    display: block;
  }
}
.editorLeftSection {
  background: #fff;
  width: 45px;
  .el-radio-group {
    width: 100%;
    .el-radio-button__inner {
      width: 100%;
      border-radius: 0 !important;
      border: 0;
    }
  }
}
.editorPreviewSection {
  height: 100%;
  background: #f0f0f0;
  position: relative;
  &:before {
    content: "Live Preview";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  i {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.pageSettings {
  .dragCheckCollapse {
    position: relative;
    .titleCheckbox {
      position: absolute;
      top: 13px;
      left: 10px;
      z-index: 1;
    }
  }
  .el-collapse-item {
    position: relative;
    .el-collapse-item__header {
      padding-left: 30px;
    }
    .el-collapse-item__content {
      padding: 0;
    }
  }
}
.collectionBannerSection:not(:last-child) {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #c0ccda;
}
</style>