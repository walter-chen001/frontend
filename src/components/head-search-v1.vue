<template>
  <el-row :gutter="10" style="padding:0;padding-top: 0px;margin-left:0;margin-right:0;">
    <div class="search-bar">
      <div class="search-item search-tags">
        <div class="features">
          <vue-tags-input
            :placeholder="placeholder"
            v-model="tag"
            :tags="data.tags"
            :allow-edit-tags="true"
            style="max-width:none"
            @tags-changed="newTags => data.tags = newTags"
            @keyup.enter.native="toSearch"
          >
          </vue-tags-input>
        </div>
      </div>
      <!-- <div v-if="searchDateDisplay" class="search-item search-date">
        <el-date-picker
          v-model="data.search_date"
          type="daterange"
          align="right"
          unlink-panels
          :range-separator="'~'"
          :start-placeholder="$t('system.startDate')"
          :end-placeholder="$t('system.endDate')"
          :picker-options="pickerOptions"
          style="width: 100%;min-width: 250px;"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          class="eb-date"
        ></el-date-picker>
      </div> -->
      <div class="search-item search-btns">
        <el-button :disabled="false" type="primary"  @click="toSearch" :title="$t('system.search')">
          <div v-if="false">
            <i class="el-icon-loading"></i>
          </div>
          <div v-else>
          <!-- {{$t('system.search')}} -->
          <i class="fa fa-search"></i>
          </div>
        </el-button>
        <!-- <el-button
          class="btn-light"
          v-if="advancedSearch"
          @click="openSearhModal"
        >{{$t('system.advancedSearch')}}
      </el-button> -->
      </div>
    </div>

    <el-dialog :title="$t('system.advancedSearch')" :visible.sync="isopen" append-to-body>
      <el-form label-position="top" :model="data" ref="search_form" label-width="100px">
        <slot></slot>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: 200px">
        <el-button class="pull-left" @click="reset">{{$t('system.reset')}}</el-button>
        <el-button @click="isopen = false">{{$t('system.close')}}</el-button>
        <el-button
          type="primary"
          @click="toSearch"
        >
        <!-- {{$t('system.search')}} -->
        <i class="fa fa-search"></i>
        </el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
// import VueTagsInput from "@/components/vue-tags-input/vue-tags-input.vue";
export default {
  // components: { VueTagsInput },
  props: {
    data: {
      type: Object,
      default: function() {
        return { tags: [], search_date: "" };
      }
    },
    placeholder: { default: "关键字搜索" },
    searchData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    advancedSearch: {
      default: true
    },
    searchDateDisplay: { default: true }
  },
  data() {
    return {
      isopen: false,
      tag: "",
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('system.lastWeek'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t('system.lastMonth'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t('system.lastThreeMonths'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    isSerchBtnLoading: {
      get: function() {
        return this.$store.state.app.searchBtnLoading;
      },
      set: function(v) {
        this.$store.state.app.searchBtnLoading = v;
      }
    }
  },
  mounted() {
    console.log("search-form mounted...", this.data);
  },
  methods: {
    toSearch() {
      this.$store.state.app.searchBtnLoading = true;
      this.isopen = false;
      let that = this;
      /*解決多关键字输入时直接按搜索时获取不到关键字的问题*/
      let timeout = setTimeout(function() {
        clearTimeout(timeout);
        that.$emit("toSearch", that.data);
      }, 100);
    },
    openSearhModal() {
      this.isopen = true;
      console.log(this.searchData)
      this.$emit("openSearhModals", this.searchData);
    },
    reset() {
      this.$refs.search_form.resetFields();
      this.$emit("reset");
    }
  }
};
</script>
