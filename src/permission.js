import router from '@/router'
import store from '@/store'

import { getToken, removeToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
    if (!permissionRoles) return true
    return roles[permissionRoles.r] > permissionRoles.l;
}

const whiteList = ['/404', '/login', '/register', '/auth-redirect', '/retrievePwd','/resetPwd'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    console.log("permission router.beforeEach...")
    if (to.matched.length === 0) {
        /*If no route is matched*/
        console.log('no route is matched');
        next({ path: '/' })
    }
    NProgress.start()
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
            /*if current page is dashboard will not trigger afterEach hook, so manually handle it*/
            NProgress.done() 
        } else {
            /*Determine whether the routing authority list exists*/
            // console.log("store.getters.roles....................",store.getters.roles) /*for debug*/
            if (store.getters.roles === "") {
                /*Get user information*/
                store.dispatch('GetUserInfo').then(res => {
                    const roles = res.data.roles /*note: roles must be a array! such as: ['editor','develop']*/
                    store.dispatch('GenerateRoutes', { roles }).then(() => { 
                        /*Generate accessible routing tables based on roles permissions*/ 
                        router.addRoutes(store.getters.addRouters) /*Dynamically add accessible routing table*/
                        next({...to, replace: true }) // Hacking method to ensure that addRoutes is completed ,set the replace: true so the navigation will not leave a history record
                    })
                }).catch((err) => {
                    console.log('GetUserInfo err', err);
                    store.dispatch('FedLogOut').then(() => {
                        // Message.error(err)
                        next({ path: '/' })
                    })
                })
            } else {
                // There is no need to dynamically change the permission to directly next ()
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next()
                } else {
                    // console.log('No permission for routing');
                    removeToken();
                    next({ path: '/401', replace: true, query: { noGoBack: true } })
                }
            }
        }
    } else {
        console.log("没 token ........................................ ",getToken())
        if (whiteList.indexOf(to.path) !== -1) { /*No login whitelist, enter directly*/
            next()
        } else {
            next(`/login?redirect=${to.path}`) /*Otherwise all redirect to the login page*/
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
