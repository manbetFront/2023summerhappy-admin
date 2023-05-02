const dataConfig = {
  namespaced: true,
  state: {
    routerData:[]
  },
  getters: {
    
  },
  mutations: {
    editRouterData( state, payload) {
      state.routerData = [...payload]
    }
  },
  actions: {
    editRouterData({ commit }, payload) {
      commit('editRouterData', payload)
    }

  }
} 

export default dataConfig
