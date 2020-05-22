<template>
  <el-row :gutter="0" type="flex" justify="center" class="centerSection">
    <div class="sectionContainer">
      <el-switch v-model="value1" active-text="" inactive-text="Store Status"></el-switch>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Display" name="display">
          <el-form ref="display" :model="display">
            <el-checkbox :label="1" v-model="checked">Quantity Box</el-checkbox>
            <el-checkbox :label="2">Allow Product Reviews</el-checkbox>
            <el-checkbox :label="3" v-model="checked">Auto Approve Reviews</el-checkbox>
            <el-checkbox :label="4">Enable Wishlist</el-checkbox>
            <el-checkbox :label="5">Enable Product Thumbnail Images</el-checkbox>
            <el-checkbox :label="6" v-model="checked">Show Product Price</el-checkbox>
            <el-checkbox :label="7">Show Product Brand</el-checkbox>
            <el-checkbox :label="8" v-model="checked">Show Product Shopping Cost</el-checkbox>
            <el-checkbox :label="9" v-model="checked">Show Product Rating</el-checkbox>
            <el-checkbox :label="10" v-model="checked">Show Expected Delivery Date</el-checkbox>
            <el-checkbox :label="11" v-model="checked">Show "Add to Cart" Option</el-checkbox>
            <el-checkbox :label="12" v-model="checked">Show Product SKU</el-checkbox>
            <el-form-item label="New Product Parameter Set Up">
              <el-input v-model="display.enterNoOfDay" placeholder="Enter the no. of day"></el-input>
            </el-form-item>

            <p>Best Seller Parameter Set Up</p>
            <el-checkbox :label="13" v-model="checked">Sales Volume</el-checkbox>
            <el-checkbox :label="14">Product Rating</el-checkbox>
            <el-checkbox :label="15">Sales Amount</el-checkbox>
            <el-checkbox :label="16">Top Searched Products</el-checkbox>
            <div class="text-right pt-10">
              <el-button type="primary" size="small">Continue</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Security &amp; Privacy " name="securityPrivacy">
          <p>Complex Password</p>
          <el-checkbox
            :label="securityPrivacy1"
            v-model="checked"
          >Enforce cpmplexity rule for shoppers password.</el-checkbox>
          <p>Cookie Consent Tracking</p>
          <el-checkbox :label="securityPrivacy2">Yes, turn on cookie consent banner in my site.</el-checkbox>
          <p>Analutics for my business</p>
          <el-checkbox :label="securityPrivacy3" v-model="checked">
            Track customer on screen behaviour (
            <a href="https://clicky.com/">https://clicky.com/</a>)
          </el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="Notification Settings" name="notificationSettings">
          <p>Product Review Notification</p>
          <el-checkbox
            :label="notificationSettings1"
          >Send message / emails to customers asking to review the purchased products.</el-checkbox>
          <p>Forward Order Invoice</p>
          <el-checkbox
            :label="notificationSettings2"
            v-model="checked"
          >Send message / emails of their order invoices</el-checkbox>
          <p>Forward Shipping Status</p>
          <el-checkbox
            :label="notificationSettings3"
          >Send message / email whenever there is a change in the shipping status of the product.</el-checkbox>
          <p class="checkboxHeading">
            <el-checkbox :label="notificationSettings4" v-model="checked"></el-checkbox>Abandoned Card Notification
          </p>
          <p>Product Page Inventory Level Notification</p>
          <el-checkbox
            :label="notificationSettings5"
          >Always notify the current inventory level of the product in the product page of the e-shop</el-checkbox>
          <el-checkbox
            :label="notificationSettings6"
          >Notify the current inventory level if the product in the product page if the e-shop only if it falls below the low inventory level.</el-checkbox>
          <el-checkbox
            :label="notificationSettings7"
            v-model="checked"
          >Notify that the inventory level of this product is low but not the exact inventory level of the product in the product page of the e-shop, if it falls below the low inventory level.</el-checkbox>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "storeSetting",
  data() {
    return {
      checked: true,
      value1: false,
      activeName: "display",
      display: {
        enterNoOfDay: null
      }
    };
  }
};
</script>

<style lang="scss">
.pt-10 {
  padding-top: 10px;
}
.sectionContainer {
  width: 100%;
  background: #fff;
  position: relative;
  .el-tabs__content {
    padding: 0 15px 15px;
  }
}
.el-switch {
    position: absolute!important;
    right: 10px;
    top: 10px;
    z-index: 2;
    .el-switch__label--left span {
        font-size: 12px;
    }
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 15px !important;
}
.text-right {
  text-align: right;
}

.el-checkbox {
  margin-bottom: 10px;
  display: flex !important;
  .el-checkbox__label {
    font-size: 12px;
    white-space: normal;
  }
}
.checkboxHeading {
  display: flex;
  .el-checkbox:last-of-type {
    margin-right: 10px;
  }
}
</style>