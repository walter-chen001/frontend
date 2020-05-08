import api from '@/api/system/parameter'

const parameter = {
    namespaced: true,
    state: {
      name:""
    },
    mutations: {

    },
    actions: {
        getData() {
            return new Promise((resolve, reject) => {
                api.getData().then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        update({ commit },data) {
            return new Promise((resolve, reject) => {
                api.update(data).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                    console.log(err)
                })
            })
        },
        
    }
}

export default parameter