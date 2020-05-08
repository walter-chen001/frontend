import api from '@/api/login'
import { getToken, setToken, removeToken, getIMPass, setIMPass, removeIMPass } from '@/utils/auth'

const user = {
    state: {
        user: {
            staffID: '',
            name: '',
        },
        company_info: {
            logo: "",
            name: ""
        },
        status: '',
        code: '',
        token: getToken(),
        im_pass: getIMPass(),
        // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9lYml4c3lzdGVtdjNhcGkuZWJpeGRldi5jblwvYXV0aFwvZ2V0VG9rZW4iLCJpYXQiOjE1ODQ0MzI2NTgsImV4cCI6MTU4NDQzNjI1OCwibmJmIjoxNTg0NDMyNjU4LCJqdGkiOiJ2M2tUUFZEdFRqaUpKWmEyIiwic3ViIjo5LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.hF38FFG4iCkPIt9Ow8auWpcaBpg_ROZn608w4CY7c4A",
        name: '',
        avatar: '',
        roles: '',
        introduction: '',
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            console.log("SET_TOKEN..............",token)
            state.token = token
        },
        SET_IMPASS: (state, im_pass) => {
            console.log("SET_IMPASS..", state, im_pass)
            state.im_pass = im_pass
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_COMPANYiNFO: (state, user) => {
            state.company_info = user
        },

    },

    actions: {
        RefreshToken({ commit }, token) {
            return new Promise(function (resolve, reject) {
                console.log("RefreshToken....................................",token)
                commit('SET_TOKEN', token)
                setToken(token)
            })
        },

        // 用户登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                api.loginByUsername(username, userInfo.password).then(response => {
                    const data = response.data
                    if (data) {
                        commit('SET_TOKEN', data.token)
                        commit('SET_IMPASS', data.im_pass)
                        setToken(data.token)
                        setIMPass(data.im_pass)
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.getUserInfo().then(response => {
                    // 由于mockjs 不支持自定义状态码只能这样hack
                    console.log("store GetUserInfo ............", response)
                    if (!response.data) {
                        reject('Verification failed, please login again.')
                    }
                    const data = response.data

                    if (data.roles || Array.isArray(data.roles)) { // 验证返回的roles是否是一个非空数组&& data.roles.length > 0
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array!')
                    }

                    commit('SET_USER', data.user)
                    commit('SET_COMPANYiNFO', data.company_info)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.logout(state.token).then(() => {
                    console.log("LogOut...");
                    commit('SET_TOKEN', '');
                    commit('SET_IMPASS', '');
                    commit('SET_ROLES', '');
                    removeToken();
                    removeIMPass();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit,state }) {
            return new Promise(resolve => {
                console.log("FedLogOut...............................................",state.token);
                commit('SET_TOKEN', '');
                commit('SET_IMPASS', '');
                removeToken();
                removeIMPass();
                resolve()
            })
        },

        //账号注册
        register({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                api.register(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        createCompany({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                api.createCompany(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        sendSMS({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                api.sendSMS(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },

        // 动态修改权限
        ChangeRoles({ commit, dispatch }, role) {
            return new Promise(resolve => {
                console.log("ChangeRoles...");
                commit('SET_TOKEN', role)
                setToken(role)
                api.getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        },

        checkUser({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                api.checkUser(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
    }
}

export default user
