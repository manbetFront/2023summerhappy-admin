import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import common from './modules/common'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import dataConfig from './modules/dataConfig'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
    settings,
    dataConfig,
    common
  },
  getters
})

export default store
