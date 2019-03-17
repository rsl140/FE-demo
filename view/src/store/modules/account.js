import { addAccount, getShop, getAcountList, searchAcountList, delAccount } from '@/api/account'

const user = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 获取门店
    GetShop ({ commit }) {
      return new Promise((resolve, reject) => {
        getShop().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 写入日报
    AddAccount ({ commit }, addInfo) {
      return new Promise((resolve, reject) => {
        addAccount(addInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取所有日报
    GetAcountList ({ commit }) {
      return new Promise((resolve, reject) => {
        getAcountList().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 搜索日报
    SearchAcountList ({ commit }, id) {
      return new Promise((resolve, reject) => {
        searchAcountList(id).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除日报
    DelAccount ({ commit }, id) {
      return new Promise((resolve, reject) => {
        delAccount(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
