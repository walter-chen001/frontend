<template>
  <el-row :gutter="0" type="flex" justify="center" class="centerSection">
    <div class="sectionContainer">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-switch v-model="status" active-text inactive-text="Store Status" @change="changeMode"></el-switch>
        <el-tab-pane label="Display" name="display">
          <el-form ref="display" :model="display" :rules="displayRules">
            <div>
              <el-switch
                v-model="display.is_allow_quantity_box"
                active-text="Quantity Box"
                @change="changeDisplayStatus($event,'is_allow_quantity_box')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_allow_product_reviews"
                active-text="Allow Product Reviews"
                @change="changeDisplayStatus($event,'is_allow_product_reviews')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_auto_approve_reviews"
                active-text="Auto Approve Reviews"
                @change="changeDisplayStatus($event,'is_auto_approve_reviews')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_wishlist"
                active-text="Enable Wishlist"
                @change="changeDisplayStatus($event,'is_enable_wishlist')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_product_comparsion"
                active-text="Enable Product Comparison"
                @change="changeDisplayStatus($event,'is_enable_product_comparsion')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_product_thumbnail_image"
                active-text="Enable Product Thumbnail Images"
                @change="changeDisplayStatus($event,'is_enable_product_thumbnail_image')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_product_price"
                active-text="Show Product Price"
                @change="changeDisplayStatus($event,'is_enable_product_price')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_product_brand"
                active-text="Show Product Brand"
                @change="changeDisplayStatus($event,'is_enable_product_brand')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_product_shipping_price"
                active-text="Show Product Shipping Cost"
                @change="changeDisplayStatus($event,'is_enable_product_shipping_price')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_product_rating"
                active-text="Show Product Rating"
                @change="changeDisplayStatus($event,'is_enable_product_rating')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_expected_delivery_date"
                active-text="Show Expected Delivery Date"
                @change="changeDisplayStatus($event,'is_enable_expected_delivery_date')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_add_to_cart"
                active-text="Show Add to Cart Option"
                @change="changeDisplayStatus($event,'is_enable_add_to_cart')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="display.is_enable_product_sku"
                active-text="Show Product SKU"
                @change="changeDisplayStatus($event,'is_enable_product_sku')"
              >Show Product SKU</el-switch>
            </div>
            <div>
              <el-form-item label="New Product Parameter Set Up" prop="new_product_days">
                <el-input
                  v-model="display.new_product_days"
                  @change="changeDisplayStatus($event,'new_product_days')"
                  placeholder="Enter the no. of day"
                ></el-input>
              </el-form-item>
            </div>

            <p>Best Seller Parameter Set Up</p>

            <el-form-item>
              <el-radio-group
                @change="changeDisplayStatus($event,'best_seller_type')"
                v-model="display.best_seller_type"
              >
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
            <div>
              <el-switch
                v-model="security.is_enable_complex_password"
                active-text="Complex Password"
                @change="changeSecurityStatus($event,'is_allow_quantity_box')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="security.is_enable_cookie_tracking"
                active-text="Cookie Consent Tracking"
                @change="changeSecurityStatus($event,'is_allow_quantity_box')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="security.is_enable_analytics"
                active-text="Analytics for my business"
                @change="changeSecurityStatus($event,'is_allow_quantity_box')"
              ></el-switch>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="Notification Settings" name="notificationSettings">
          <el-form ref="notification" :model="notification">
            <div>
              <el-switch
                v-model="notification.is_product_review_notification"
                active-text="Product Review Notification"
                @change="changeNotificationStatus($event, 'is_product_review_notification')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="notification.is_forward_order_invoice"
                active-text="Forward Order Invoice"
                @change="changeNotificationStatus($event, 'is_forward_order_invoice')"
              >Send message / emails of their order invoices</el-switch>
            </div>
            <div>
              <el-switch
                v-model="notification.is_forward_shipping_status"
                active-text="Forward Shipping Status"
                @change="changeNotificationStatus($event, 'is_forward_shipping_status')"
              ></el-switch>
            </div>
            <div>
              <el-switch
                v-model="notification.is_enable_cart_notification"
                active-text="Abandoned Card Notification"
                @change="changeNotificationStatus($event, 'is_enable_cart_notification')"
              ></el-switch>
            </div>

            <p>Product Page Inventory Level Notification</p>
            <el-form-item>
              <el-radio-group
                v-model="notification.inventory_notification_type"
                @change="changeNotificationStatus($event, 'inventory_notification_type')"
              >
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
import { default as csgShopApi } from "../../cgs_api/eShopSetting/onlineShopSetting";

export default {
  name: "storeSetting",
  data() {
    return {
      status: this.status,
      activeName: "display",
      displayRules: {
        new_product_days: [
          {
            trigger: "input",
            type: "number"
          }
        ]
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
        return this.$store.state.user.user.user_id;
      }
    }
  },
  methods: {
    updateDisplay(obj) {
      var data = { ...obj, user_id: this.user_id };
      csgShopApi
        .updateDisplayData(data)
        .then(response => {
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
      var data = { ...obj, user_id: this.user_id };
      csgShopApi
        .updateSecurityData(data)
        .then(response => {
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
      var data = { ...obj, user_id: this.user_id };
      csgShopApi
        .updateNotificationData(data)
        .then(response => {
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
          this.display.is_enable_product_comparsion =
            data.is_enable_product_comparsion;
          this.display.is_enable_product_thumbnail_image =
            data.is_enable_product_thumbnail_image;
          this.display.is_enable_product_price = data.is_enable_product_price;
          this.display.is_enable_product_brand = data.is_enable_product_brand;
          this.display.is_enable_product_shipping_price =
            data.is_enable_product_shipping_price;
          this.display.is_enable_product_rating = data.is_enable_product_rating;
          this.display.is_enable_expected_delivery_date =
            data.is_enable_expected_delivery_date;
          this.display.is_enable_add_to_cart = data.is_enable_add_to_cart;
          this.display.is_enable_product_sku = data.is_enable_product_sku;
          this.display.new_product_days = data.new_product_days;
          this.display.best_seller_type = data.best_seller_type;
          this.security.is_enable_complex_password =
            data.is_enable_complex_password;
          this.security.is_enable_cookie_tracking =
            data.is_enable_cookie_tracking;
          this.security.is_enable_analytics = data.is_enable_analytics;
          this.notification.is_product_review_notification =
            data.is_product_review_notification;
          this.notification.is_forward_order_invoice =
            data.is_forward_order_invoice;
          this.notification.is_forward_shipping_status =
            data.is_forward_shipping_status;
          this.notification.is_enable_cart_notification =
            data.is_enable_cart_notification;
          this.notification.page_inventory_notification =
            data.page_inventory_notification;
          this.status = data.status;

          // this.shop.
          // this.shop.
        })
        .catch(e => console.log(e));
    },
    changeStatusMode(obj) {
      var data = { ...obj, user_id: this.user_id };
      updateShop.default
        .updateMaintenanceMode(data)
        .then(response => {
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
      this.changeStatusMode({ status: val });
    },
    changeDisplayStatus(val, name) {
      console.log(val, name);
      this.updateDisplay({ [name]: val });
    },

    changeSecurityStatus(val, name) {
      this.updateSecurity({ [name]: val });
    },
    changeNotificationStatus(val, name) {
      this.updateNotification({ [name]: val });
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