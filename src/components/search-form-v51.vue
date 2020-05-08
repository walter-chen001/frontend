<template lang="html">
  <HeadSearch @toSearch="toSearch" :data="searchData" :advancedSearch='false' :placeholder="'销售单编码'">
    <el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="状态" prop="status">
            <el-select
            clearable
            v-model="searchData.status"
            class="flex-group-auto"
            style="width: 100%;">
            <el-option v-for="(item,key) in options.statusDownLis" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货币" prop="currency">
            <el-select clearable v-model="searchData.currency" class="flex-group-auto" style="width: 100%;">
              <el-option v-for="(item,key) in options.currencyDownLis" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="付款期限" prop="payment_term">
            <el-select clearable v-model="searchData.payment_term" class="flex-group-auto" style="width: 100%;">
              <el-option v-for="(item,key) in options.payment_term" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计到货日期" prop="receiving_date">
            <el-select clearable v-model="searchData.receiving_date" class="flex-group-auto" style="width: 100%;">
              <el-option v-for="(item,key) in options.receiving_date" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="完成日期" prop="finish_date">
            <el-select clearable v-model="searchData.finish_date" class="flex-group-auto" style="width: 100%;">
              <el-option v-for="(item,key) in options.finish_date" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-row>
  </HeadSearch>
</template>
<script>

  import HeadSearch from "@/components/head-search-v1.vue"

  export default {
    components: {
      HeadSearch
    },
    props:['options',],
    data() {
      return {
        searchData: {
          tags: [],
          // search_date: "",
          status:"",
          currency:"",
        },
      }
    },
    methods: {
      toSearch(data) {
        console.log("index tosearch ....", data)
        /*更新搜索条件*/
        this.$emit("toSearch",data)
        // this.$store.commit("itemMaster/SET_SEARCH_OBJ", data)
      }
    }

  }
</script>
