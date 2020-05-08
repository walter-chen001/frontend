/**
 * 注册全局组件
 */

/*
表格操作栏
<template v-slot:editRow>
  	<ColumnControl @delete="delitem"></ColumnControl>
</template>
*/
import ColumnControl from "@/components/column-control.vue"
Vue.component('ColumnControl', ColumnControl)

import ColumnStatusV1 from "@/components/column-status-v1.vue"
Vue.component('ColumnStatusV1', ColumnStatusV1)
