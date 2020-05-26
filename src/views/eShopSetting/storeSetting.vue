<template>
  <el-row :gutter="0" type="flex" justify="center" class="centerSection">
    <div class="sectionContainer">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-switch v-model="value1" active-text inactive-text="Store Status"></el-switch>
        <el-tab-pane label="Display" name="display">
          <el-form ref="display" :model="display">
            <el-checkbox :label="1" v-model="quantity_box">Quantity Box</el-checkbox>
            <el-checkbox :label="2" v-model="allow_p_review">Allow Product Reviews</el-checkbox>
            <el-checkbox :label="3" v-model="auto_approve">Auto Approve Reviews</el-checkbox>
            <el-checkbox :label="4" v-model="enable_wishlist">Enable Wishlist</el-checkbox>
            <el-checkbox :label="5" v-model="enable_p_comparison">Enable Product Comparison</el-checkbox>
            <el-checkbox :label="6" v-model="p_thumbnail_images">Enable Product Thumbnail Images</el-checkbox>
            <el-checkbox :label="7" v-model="p_price">Show Product Price</el-checkbox>
            <el-checkbox :label="8" v-model="p_brand">Show Product Brand</el-checkbox>
            <el-checkbox :label="9" v-model="p_shipping_cost">Show Product Shopping Cost</el-checkbox>
            <el-checkbox :label="10" v-model="p_rating">Show Product Rating</el-checkbox>
            <el-checkbox :label="11" v-model="expected_delivery_date">Show Expected Delivery Date</el-checkbox>
            <el-checkbox :label="12" v-model="add_to_cart">Show "Add to Cart" Option</el-checkbox>
            <el-checkbox :label="13" v-model="add_to_cart">Show Product SKU</el-checkbox>

            <p class="bg-gray-header">New Product Parameter Set Up</p>
            <el-form-item label>
              <el-input v-model="display.enterNoOfDay" placeholder="Enter the no. of day"></el-input>
            </el-form-item>

            <p class="bg-gray-header">Best Seller Parameter Set Up</p>
            <el-checkbox :label="13" v-model="checked">Sales Volume</el-checkbox>
            <el-checkbox :label="14">Product Rating</el-checkbox>
            <el-checkbox :label="15">Sales Amount</el-checkbox>
            <el-checkbox :label="16">Top Searched Products</el-checkbox>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Security &amp; Privacy " name="securityPrivacy">
          <p>Complex Password</p>
          <el-checkbox
            :label="securityPrivacy1"
            v-model="complex_pwd"
          >Enforce complexity rule for shoppers password.</el-checkbox>
          <p>Cookie Consent Tracking</p>
          <el-checkbox
            :label="securityPrivacy2"
            v-model="cookie_consent_tracking"
          >Yes, turn on cookie consent banner in my site.</el-checkbox>
          <p>Analytics for my business</p>
          <el-checkbox :label="securityPrivacy3" v-model="analytics_business">
            Track customer on screen behaviour (
            <a href="https://clicky.com/">https://clicky.com/</a>)
          </el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="Notification Settings" name="notificationSettings">
          <p>Product Review Notification</p>
          <el-checkbox
            :label="notificationSettings1"
            v-model="p_review_notification"
          >Send message / emails to customers asking to review the purchased products.</el-checkbox>
          <p>Forward Order Invoice</p>
          <el-checkbox
            :label="notificationSettings2"
            v-model="forward_order_invoice"
          >Send message / emails of their order invoices</el-checkbox>
          <p>Forward Shipping Status</p>
          <el-checkbox
            :label="notificationSettings3"
            v-model="forward_shipping_status"
          >Send message / email whenever there is a change in the shipping status of the product.</el-checkbox>
          <p class="checkboxHeading">
            <el-checkbox :label="notificationSettings4" v-model="abandoned_cart_notification"></el-checkbox>Abandoned Card Notification
          </p>
          <p>Product Page Inventory Level Notification</p>
          <el-checkbox
            :label="notificationSettings5"
            v-model="p_page_inventory.always_notify"
          >Always notify the current inventory level of the product in the product page of the e-shop</el-checkbox>
          <el-checkbox
            :label="notificationSettings6"
            v-model="p_page_inventory.notify_current"
          >Notify the current inventory level if the product in the product page if the e-shop only if it falls below the low inventory level.</el-checkbox>
          <el-checkbox
            :label="notificationSettings7"
            v-model="p_page_inventory.notify_p_low"
          >Notify that the inventory level of this product is low but not the exact inventory level of the product in the product page of the e-shop, if it falls below the low inventory level.</el-checkbox>
          <div class="text-right pt-10">
            <el-button type="primary" size="small">Save</el-button>
          </div>
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
      quantity_box: false,
      allow_p_review: false, //p - product
      auto_approve: false,
      enable_wishlist: false,
      enable_p_comparison: false,
      p_thumbnail_images: false,
      p_price: false,
      p_brand: false,
      p_shipping_cost: false,
      p_rating: false,
      expected_delivery_date: false,
      add_to_cart: false,
      p_sku: false,
      complex_pwd: false,
      cookie_consent_tracking: false,
      analytics_business: false,
      p_review_notification: false,
      forward_order_invoice: false,
      forward_shipping_status: false,
      abandoned_cart_notification: false,
      p_page_inventory: {
        always_notify: false,
        notify_current: false,
        notify_p_low: false
      },
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
  margin-bottom: 15px;
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
.bg-gray-header {
  font-size: 14px;
  background: #eef1f6;
  padding: 10px;
  color: #666;
  font-weight: 700;
  margin-bottom: 5px;
}
</style>