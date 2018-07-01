import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPlanDatas: []
  },
  mutations: {
    addTodoList (state, list) {
      state.allPlanDatas.push(list)
    },
    updateToDoList (state, modifiedData) {
      state.allPlanDatas.splice(modifiedData.index, 1, modifiedData.text)
    },
    deleteToDoList (state, index) {
      state.allPlanDatas.splice(index, 1)
    }
  },
  actions: {

  }
})
