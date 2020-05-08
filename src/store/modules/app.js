// import Cookies from 'js-cookie'

const app = {
    // namespaced: true,
    state: {
        rightsidewidth: localStorage.getItem('rightsidewidth') || 0.3, /*右边栏是否隐藏*/
        rightsidecollapse: true, /*右边栏是否隐藏*/
        rightside_embed: localStorage.getItem('rightsideembed') ? localStorage.getItem('rightsideembed') : "unembed", /*右边栏是否嵌入*/
        menucollapse: localStorage.getItem('menucollapse') ? localStorage.getItem('menucollapse') : "uncollapse",
        ispad: false, /*是否是小尺寸显示器*/
        tplname: "MainTemplate",
        currentRuterID: "",
        menuCount: [],
        moduleID: 3,
        tablist: [],
        tableArr: [],
        leftNav: [],
        showLeftNav: false,
        moduleNav: {},
        baseData: [],
        leftSubMenu: true,
        timeOne: {},
        isCloseTab: false,
        currentProcess: "",
        searchBtnLoading: false,
        exclude:[], //数组页面的组件不会被缓存
        theme: localStorage.getItem('ebixtheme') || 'theme-hyper',
        language: localStorage.getItem('lang') || 'zh_cn',
        companyLanguage:[],
        // size: Cookies.get('size') || 'medium'
        topMenu: {
            children:[]
        },
        allNav: []
    },
    mutations: {
          SET_BASE_DATA: (state, obj) => {
            state.baseData = obj;
            // state.currentProcess == "" ? state.currentProcess = obj.currentFlow : "" //获取初始流程/
            state.currentProcess = obj.currentFlow  //获取初始流程/
            console.log("SET_BASE_DATA!!!!!!!!!!!!")
            // console.log(state.tablist,state.tablist.length);
            // if(state.tablist.length > 0){
            //     state.currentProcess = state.tablist.type
            // }else{
            //     state.currentProcess = obj.currentFlow
            // }
 
            state.allNav  = obj.allNav //获取默认流程下的nav
            state.leftNav = obj.allNav[state.currentProcess] //获取默认流程下的nav
            state.topMenu = obj.topMenu
            state.companyLanguage = obj.companyLanguage
          console.log("SET_ISPAD xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        },
        SET_ISPAD(state) {
            console.log("SET_ISPAD xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
            state.ispad = true;
        },

        TOGGLE_LEFT_NAV(state) {
            state.showLeftNav = !state.showLeftNav;
        },
        TOGGLE_RIGHTSIDE_COLLAPSE(state, bool) {
            state.rightsidecollapse = bool == undefined ? true : bool;
        },
        INIT_TAB(state, router) {
            /*根据 link 找到匹配的路由*/
            console.log("INIT_TAB.........")
            function getlayout(menulist, obj, link) {
                if (Array.isArray(menulist) && menulist.length > 0) {
                    for (var i = 0; i < menulist.length; i++) {
                        let item = menulist[i]
                        if (item.link == link) {
                            obj.itemID = item.itemID;
                            obj.link = item.link;
                            obj.type = item.type;
                            obj.moduleName = item.moduleName;
                            obj.name = item.name;
                            break
                        } else {
                            if (Array.isArray(item.children)) {
                                var sobj = {};
                                getlayout(item.children, sobj, link);
                                if (sobj.itemID) {
                                    obj.itemID = sobj.itemID;
                                    obj.link = sobj.link;
                                    obj.type = sobj.type;
                                    obj.moduleName = sobj.moduleName;
                                    obj.name = sobj.name;
                                    break
                                }
                            }
                        }
                    }

                }
            }
            let tempobj = {}
            for(var key in state.allNav){
                let temp = state.allNav[key]
               getlayout(temp, tempobj, router.path)
               if(tempobj.link){
                    break
               }
            }

            if(tempobj.itemID){
                state.currentRuterID = tempobj.itemID;
                state.currentProcess = tempobj.type
                state.tablist.push(tempobj);
                state.leftNav = state.allNav[tempobj.type] //获取默认流程下的nav
            }
            
            //当tablist有tab时刷新页面,将tab缓存
            if(state.tablist.length == 1){
                state.exclude.forEach((item,index,array) => {
                    if(array[index] == state.tablist[0].name){
                        array.splice(index,1)
                    }
                });
            }
            console.log("INIT_TAB.........", router.path, tempobj)
        },
        ADD_TAB(state, obj) {
            console.log("ADD_TAB...", obj);
            //state.exclude = [];
            let isNull = true;
            if (state.tablist != undefined && state.tablist.length > 0) {
                for (var i = 0; i < state.tablist.length; i++) {
                    let item = state.tablist[i]
                    if (obj.link == item.link) {
                        isNull = false
                        break
                    }
                }
            } else {
                isNull = true
            }
            if (isNull) {
                state.tablist.push(obj);
                //新增的tab要缓存
                state.exclude.forEach((item,index,array) => {
                    if(array[index] == obj.name){
                        array.splice(index,1)
                    }
                });
                //state.exclude = arr.toString();
                console.log("exclude!!!!!!!!!!!!!!!!!!!!!",state.exclude)
            }
            state.currentRuterID = obj.itemID
        },
        REMOVE_TAB(state, itemID) {
            console.log("REMOVE_TAB.......", state.tablist)
            state.tablist = state.tablist.filter(function (event) {
                let bool = true
                console.log("item.......", event.itemID)
                if (event.itemID == itemID) {
                    bool = false
                }
                return bool;
            });
            console.log("REMOVE_TAB.......", state.tablist)
        },
        changeTab(state, obj) {
            console.log("changeTab...", obj, state.tablist);
            let isNull = true;
            if (state.tablist != undefined && state.tablist.length > 0) {
                for (var i = 0; i < state.tablist.length; i++) {
                    let item = state.tablist[i]
                    if (obj.link == item.link) {
                        isNull = false
                        break
                    }
                }
            } else {
                isNull = true
            }
            if (isNull) {
                state.isCloseTab = true
                state.tablist.push(obj);
            }
        },

        CHANGE_LEFT_NAV(state, val) {
            state.leftNav = state.allNav[val]
            state.currentProcess = val
            localStorage.setItem("liucheng", val)
        },

      

        SET_CURRENT_PROCESS: (state, val) => {
            state.currentProcess = val
        },

        SET_MENU_COUNT: (state, arr) => {
            state.menuCount = arr
        },

        SET_CLOSETAB: (state, str) => {
            state.isCloseTab = str == "close" ? true : false
        },
 
    },
    actions: {
        changeLeftNav({ commit, dispatch }, id) {
            return new Promise((resolve, reject) => {
                dispatch('common/getFormTaskCount').then(response => {
                    console.log(response.data);
                    let arr = response.data;
                    commit('SET_MENU_COUNT', arr)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getFormTaskCount({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                dispatch('common/getFormTaskCount').then(response => {
                    console.log(response.data);
                    let arr = response.data;
                    commit('SET_MENU_COUNT', arr)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // toggleSideBar({ commit }) {
        //     commit('TOGGLE_SIDEBAR')
        // },
        // closeSideBar({ commit }, { withoutAnimation }) {
        //     commit('CLOSE_SIDEBAR', withoutAnimation)
        // },
        // toggleDevice({ commit }, device) {
        //     commit('TOGGLE_DEVICE', device)
        // },
        // setLanguage({ commit }, language) {
        //     commit('SET_LANGUAGE', language)
        // },
        // setSize({ commit }, size) {
        //     commit('SET_SIZE', size)
        // }
    }
}

export default app
