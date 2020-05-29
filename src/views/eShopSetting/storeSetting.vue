<template>
  <el-row :gutter="0" type="flex" justify="center" class="centerSection">
    <div class="sectionContainer">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-switch v-model="status" active-text inactive-text="Store Status"
                   @change="changeMode"></el-switch>
        <el-tab-pane label="Display" name="display">
          <el-form ref="display" :model="display" :rules="display">
            <el-switch
              v-model="display.is_allow_quantity_box"
              active-text inactive-text="Quantity Box"
              @change="changeQuantity"
            ></el-switch>
            <el-switch
              v-model="display.is_allow_product_reviews"
              active-text inactive-text="Allow Product Reviews"
              @change="changeProductReview"
            ></el-switch>
            <el-switch
              v-model="display.is_auto_approve_reviews"
              active-text inactive-text="Auto Approve Reviews"
              @change="changeAutoApproveReview"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_wishlist"
              active-text inactive-text="Enable Wishlist"
              @change="changeWishlist"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_product_comparsion"
              active-text inactive-text="Enable Product Comparison"
              @change="changeProductComparison"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_product_thumbnail_image"
              active-text inactive-text="Enable Product Thumbnail Images"
              @change="changeProductThumbnail"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_product_price"
              active-text inactive-text="Show Product Price"
              @change="changeProductPrice"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_product_brand"
              active-text inactive-text="Show Product Brand"
              @change="changeProductBrand"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_product_shipping_price"
              active-text inactive-text="Show Product Shipping Cost"
              @change="changeShippingCost"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_product_rating"
              active-text inactive-text="Show Product Rating"
              @change="changeProductRating"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_expected_delivery_date"
              active-text inactive-text="Show Expected Delivery Date"
              @change="changeExpectedDelivery"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_add_to_cart"
              active-text inactive-text="Show Add to Cart Option"
              @change="changeCart"
            ></el-switch>
            <el-switch
              v-model="display.is_enable_product_sku"
              active-text inactive-text="Show Product SKU"
              @change="changeProductSku"
            >Show Product SKU</el-switch>

            <el-form-item label="New Product Parameter Set Up" prop="new_product_days">
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
            <el-switch
              v-model="security.is_enable_complex_password"
              active-text inactive-text="Complex Password"
              @change="changeComplexPwd"
            ></el-switch>
            <el-switch
              v-model="security.is_enable_cookie_tracking"
              active-text inactive-text="Cookie Consent Tracking"
              @change="changeCookieTracking"
            ></el-switch>
            <el-switch v-model="security.is_enable_analytics"
                       active-text inactive-text="Analytics for my business"
                       @change="changeAnalytics">
            </el-switch>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="Notification Settings" name="notificationSettings">
          <el-form ref="notification" :model="notification">
            <el-switch
              v-model="notification.is_product_review_notification"
              active-text inactive-text="Product Review Notification"
              @change="changeReviewNotification"></el-switch>
            <el-switch
              v-model="notification.is_forward_order_invoice"
              active-text inactive-text="Forward Order Invoice"
              @change="changeForwardOrder"
            >Send message / emails of their order invoices</el-switch>
            <el-switch
              v-model="notification.is_forward_shipping_status"
              active-text inactive-text="Forward Shipping Status"
              @change="changeForwardShipping"></el-switch>
              <el-switch
                v-model="notification.is_enable_cart_notification"
                active-text inactive-text="Abandoned Card Notification"
                @change="changeCartNotification"
              ></el-switch>

            <p>Product Page Inventory Level Notification</p>
            <el-form-item>
              <el-radio-group
                v-model="notification.inventory_notification_type"
                @change="changePageInventory">
                <el-radio
                  label="level_1"
                >Always notify the current inventory level of the product in the product page of the e-shop</el-radio>
                <el-radio label="level_2">
                  Notify the current inventory level if the product in the product page if the e-shop only if it
                  falls below the low inventory level.
                </el-radio>
                <el-radio label="level_3">
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
import { default as csgShopApi } from "../../cgs_api/eShopSetting/onlineShopSetting";

export default {
  name: "storeSetting",
  data() {
    return {
      status: this.status,
      activeName: "display",
      display : {
          new_product_days: [
          {
              trigger: "input",
              type: "number",
          }]
      }
    };
  },
  mounted() {
    this.getStoredData();
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
    status: {
        get() {
            return this.$store.state.setting.status;
        }
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
    getStoredData() {
          const dataToSend = {
              user_id: this.user_id
          };
          csgShopApi
              .getShopData(dataToSend)
              .then(({ data }) => {
                  console.log(data);
                  this.display.is_allow_quantity_box = data.is_allow_quantity_box;
                  this.display.is_allow_product_reviews = data.is_allow_product_reviews;
                  this.display.is_auto_approve_reviews = data.is_auto_approve_reviews;
                  this.display.is_enable_wishlist = data.is_enable_wishlist;
                  this.display.is_enable_product_comparsion = data.is_enable_product_comparsion;
                  this.display.is_enable_product_thumbnail_image = data.is_enable_product_thumbnail_image;
                  this.display.is_enable_product_price = data.is_enable_product_price;
                  this.display.is_enable_product_brand = data.is_enable_product_brand;
                  this.display.is_enable_product_shipping_price = data.is_enable_product_shipping_price;
                  this.display.is_enable_product_rating = data.is_enable_product_rating;
                  this.display.is_enable_expected_delivery_date = data.is_enable_expected_delivery_date;
                  this.display.is_enable_add_to_cart = data.is_enable_add_to_cart;
                  this.display.is_enable_product_sku = data.is_enable_product_sku;
                  this.display.new_product_days = data.new_product_days;
                  this.display.best_seller_type = data.best_seller_type;
                  this.security.is_enable_complex_password = data.is_enable_complex_password;
                  this.security.is_enable_cookie_tracking = data.is_enable_cookie_tracking;
                  this.security.is_enable_analytics = data.is_enable_analytics;
                  this.notification.is_product_review_notification = data.is_product_review_notification;
                  this.notification.is_forward_order_invoice = data.is_forward_order_invoice;
                  this.notification.is_forward_shipping_status = data.is_forward_shipping_status;
                  this.notification.is_enable_cart_notification = data.is_enable_cart_notification;
                  this.notification.page_inventory_notification = data.page_inventory_notification;
                  this.status = data.status;

                  // this.shop.
                  // this.shop.
              })
              .catch(e => console.log(e));
      },
    changeStatusMode(obj) {
        var data= {...obj, user_id : this.user_id};
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
      this.changeStatusMode({'status': val});
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
      this.updateDisplay({ is_enable_expected_delivery_date: val });
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