<template>
  <component :is="tplname"></component>
</template>

<script>
  import MainTemplate from '@/components/main-template'

  export default {
    name: 'public_template',
    components: {
      MainTemplate
    },
    data() {
      return {}
    },
    created() {
      let obj = {}

      /*获取页面基础数据*/
      this.$store.dispatch("common/getBaseData",this.$route).then(res => {
         // console.log("getBaseData xxxxxxxxxxxxx...",res.data,JSON.stringify(res.data))
        this.$store.commit('SET_BASE_DATA', res.data, { root: true })
        if (this.$route.path != "/") {
          this.$store.commit("INIT_TAB", this.$route)
        }
      })

      if (document.body.clientWidth <= 1024) {
        this.$store.commit("SET_ISPAD")
      }

    },
    watch: {
      $route(to, from) {}
    },
    computed: {
      tplname() {
        return this.$store.state.app.tplname
      },
      isCollapse: {
        get() {
          return this.$store.state['app'].rightsidecollapse
        },
        set(v) {
          this.$store.state['app'].rightsidecollapse = v
        }
      }
    },
    mounted() {
      // console.log("public_template mounted....");
      let self = this
      $("body").on('click', function (event) {
        // event.preventDefault(); /*会影响下载*/
        let isTr = $(event.target).parents("tr").hasClass('el-table__row')
        let isModal = $(event.target).parents(".el-dialog__wrapper").hasClass('el-dialog__wrapper')
        if ($(event.target).hasClass('el-dialog__wrapper')) {
          isModal = true
        }
        if (!isTr && !isModal) {
          console.log("hide rightside......");
          self.$store.commit("TOGGLE_RIGHTSIDE_COLLAPSE")
        }
      });
    },
    methods: {}
  }
</script>