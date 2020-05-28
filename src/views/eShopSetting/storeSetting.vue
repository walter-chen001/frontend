<template>
  <el-row :gutter="0" type="flex" justify="center" class="centerSection">
    <div class="sectionContainer">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-switch v-model="is_maintenance_mode" active-text inactive-text="Store Status"
                   true-label=1 false-label=0
                   @change="changeMode"></el-switch>
        <el-tab-pane label="Display" name="display">
          <el-form ref="display" :model="display">
            <el-checkbox
              v-model="display.is_allow_quantity_box"
              true-label=1 false-label=0
              @change="changeQuantity"
            >Quantity Box</el-checkbox>
            <el-checkbox
              v-model="display.is_allow_product_reviews"
              true-label=1 false-label=0
              @change="changeProductReview"
            >Allow Product Reviews</el-checkbox>
            <el-checkbox
              v-model="display.is_auto_approve_reviews"
              true-label=1 false-label=0
              @change="changeAutoApproveReview"
            >Auto Approve Reviews</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_wishlist"
              true-label=1 false-label=0v
              @change="changeWishlist"
            >Enable Wishlist</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_product_comparsion"
              true-label=1 false-label=0
              @change="changeProductComparison"
            >Enable Product Comparison</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_product_thumbnail_image"
              true-label=1 false-label=0
              @change="changeProductThumbnail"
            >Enable Product Thumbnail Images</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_product_price"
              true-label=1 false-label=0
              @change="changeProductPrice"
            >Show Product Price</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_product_brand"
              true-label=1 false-label=0
              @change="changeProductBrand"
            >Show Product Brand</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_product_shipping_price"
              true-label=1 false-label=0
              @change="changeShippingCost"
            >Show Product Shipping Cost</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_product_rating"
              true-label=1 false-label=0
              @change="changeProductRating"
            >Show Product Rating</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_expected_delivery_date"
              true-label=1 false-label=0
              @change="changeExpectedDelivery"
            >Show Expected Delivery Date</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_add_to_cart"
              true-label=1 false-label=0
              @change="changeCart"
            >Show "Add to Cart" Option</el-checkbox>
            <el-checkbox
              v-model="display.is_enable_product_sku"
              true-label=1 false-label=0
              @change="changeProductSku"
            >Show Product SKU</el-checkbox>

            <el-form-item label="New Product Parameter Set Up">
              <el-input
                v-model="display.new_product_days"
                @change="changeDays"
                placeholder="Enter the no. of day"
              ></el-input>
            </el-form-item>

            <p>Best Seller Parameter Set Up</p>

            <el-form-item>
              <el-radio-group @change="changeBestSeller" v-model="display.best_seller_type">
                <el-radio label="sales_volume">Sales Volume</el-radio>
                <el-radio label="product_rating">Product Rating</el-radio>
                <el-radio label="sales_amt">Sales Amount</el-radio>
                <el-radio label="top_searched_product">Top Searched Products</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="Security &amp; Privacy " name="securityPrivacy">
          <el-form ref="security" :model="security">
            <p>Complex Password</p>
            <el-checkbox
              v-model="security.is_enable_complex_password"
              @change="changeComplexPwd"
            >Enforce complexity rule for shoppers password.</el-checkbox>
            <p>Cookie Consent Tracking</p>
            <el-checkbox
              v-model="security.is_enable_cookie_tracking"
              @change="changeCookieTracking"
            >Yes, turn on cookie consent banner in my site.</el-checkbox>
            <p>Analytics for my business</p>
            <el-checkbox v-model="security.is_enable_analytics" @change="changeAnalytics">
              Track customer on screen behaviour (
              <a href="https://clicky.com/">https://clicky.com/</a>)
            </el-checkbox>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="Notification Settings" name="notificationSettings">
          <el-form ref="notification" :model="notification">
            <p>Product Review Notification</p>
            <el-checkbox
              v-model="notification.is_product_review_notification"
              true-label=1 false-label=0
              @change="changeReviewNotification"
            >Send message / emails to customers asking to review the purchased products.</el-checkbox>
            <p>Forward Order Invoice</p>
            <el-checkbox
              v-model="notification.is_forward_order_invoice"
              true-label=1 false-label=0
              @change="changeForwardOrder"
            >Send message / emails of their order invoices</el-checkbox>
            <p>Forward Shipping Status</p>
            <el-checkbox
              v-model="notification.is_forward_shipping_status"
              true-label=1 false-label=0
              @change="changeForwardShipping"
            >Send message / email whenever there is a change in the shipping status of the product.</el-checkbox>
            <p class="checkboxHeading">
              <el-checkbox
                v-model="notification.is_enable_cart_notification"
                true-label=1 false-label=0
                @change="changeCartNotification"
              >Abandoned Card Notification</el-checkbox>
            </p>

            <p>Product Page Inventory Level Notification</p>
            <el-form-item>
              <el-radio-group
                v-model="notification.page_inventory_notification"
                @change="changePageInventory">
                <el-radio
                  label="inventory_level_1_notification"
                >Always notify the current inventory level of the product in the product page of the e-shop</el-radio>
                <el-radio label="inventory_level_2_notification">
                  Notify the current inventory level if the product in the product page if the e-shop only if it
                  falls below the low inventory level.
                </el-radio>
                <el-radio label="inventory_level_3_notification">
                  Notify that the inventory level of this product is low but not the exact inventory level of
                  the product in the product page of the e-shop, if it falls below the low inventory level.
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-row>
</template>

<script>

import * as updateShop from "../../cgs_api/eShopSetting/onlineShopSetting"
export default {
  name: "storeSetting",
  data() {
    return {
      is_maintenance_mode: false,
      activeName: "display"
    };
  },
  computed: {
    display() {
      return this.$store.state.setting.stores.display;
    },
    security() {
      return this.$store.state.setting.stores.security;
    },
    notification() {
      return this.$store.state.setting.stores.notification;
    },
    user_id: {
        get() {
            return this.$store.state.user.user.user_id
        }
    }
  },
  methods: {
    updateDisplay(obj) {
        var data={...obj, user_id : this.user_id};
        updateShop.default.updateDisplayData(data).then(response => {
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
    updateSecurity(obj) {
        var data= {...obj, user_id : this.user_id};
        updateShop.default.updateSecurityData(data).then(response => {
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
    updateNotification(obj) {
        var data={...obj, user_id : this.user_id};
        updateShop.default.updateNotificationData(data).then(response => {
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
    changeMaintanenceMode(obj) {
        var data= {
            data : {...obj, user_id : this.user_id}
        };
        updateShop.default.updateMaintenanceMode(data).then(response => {
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
    changeMode(val) {
      this.changeMaintanenceMode({is_maintenance_mode: val});
    },
    changeQuantity(val) {
      this.updateDisplay({ is_allow_quantity_box: val });
    },
    changeProductReview(val) {
      this.updateDisplay({ is_allow_product_reviews: val });
    },
    changeAutoApproveReview(val) {
      this.updateDisplay({ is_auto_approve_reviews: val });
    },
    changeWishlist(val) {
      this.updateDisplay({ is_enable_wishlist: val });
    },
    changeProductComparison(val) {
      this.updateDisplay({ is_enable_product_comparsion: val });
    },
    changeProductThumbnail(val) {
      this.updateDisplay({ is_enable_product_comparsion: val });
    },
    changeProductPrice(val) {
      this.updateDisplay({ is_enable_product_price: val });
    },
    changeProductBrand(val) {
      this.updateDisplay({ is_enable_product_brand: val });
    },
    changeShippingCost(val) {
      this.updateDisplay({ is_enable_product_shipping_price: val });
    },
    changeProductRating(val) {
      this.updateDisplay({ is_enable_product_rating: val });
    },
    changeExpectedDelivery(val) {
      this.uodate({ is_enable_expected_delivery_date: val });
    },
    changeCart(val) {
      this.updateDisplay({ is_enable_add_to_cart: val });
    },
    changeProductSku(val) {
      this.updateDisplay({ is_enable_product_sku: val });
    },
    changeDays(val) {
      this.updateDisplay({ new_product_days: val });
    },
    changeBestSeller(val) {
      this.updateDisplay({ best_seller_product: val });
    },
    changeComplexPwd(val) {
      this.updateSecurity({ is_enable_complex_password: val });
    },
    changeCookieTracking(val) {
      this.updateSecurity({ is_enable_cookie_tracking: val });
    },
    changeAnalytics(val) {
      this.updateSecurity({ is_enable_cookie_tracking: val });
    },
    changeReviewNotification(val) {
      this.updateNotification({ is_product_review_notification: val });
    },
    changeForwardOrder(val) {
      this.updateNotification({ is_forward_order_invoice: val });
    },
    changeForwardShipping(val) {
      this.updateNotification({ is_forward_shipping_status: val });
    },
    changeCartNotification(val) {
      this.updateNotification({ is_forward_shipping_status: val });
    },
    changePageInventory(val) {
      this.updateNotification({ page_inventory_notification: val });
    }
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