import App from './App'
import router from '@/router'
import i18n from '@/lang'

Vue.use(ELEMENT, {
    size: localStorage.getItem('size') || 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
})

// import 'es6-promise/auto'

Vue.config.productionTip = false

import store from '@/store'
// import './errorLog' // error log
import './permission' // permission control
import '@/mock' // simulation data

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'
})
