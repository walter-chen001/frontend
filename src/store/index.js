import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import errorLog from './modules/errorLog'
import user from './modules/user'
import common from './modules/common'
import order from './modules/sales/order'
import parameter from './modules/system/parameter'


const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    errorLog,
    common,
    order,
	parameter
  },
  getters
})

export default store
