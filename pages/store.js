import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
  
export default new Vuex.Store({
    state: {
        products:[],
        addedItem: [],
    },
    mutations: {
        setProducts(state , products) {
            state.products = products
        },
        
        addToCompare(state , addedItem) {
            state.addedItem.push(addedItem)
        },
    },
    // actions: {
    //     change_n(context) {
    //         context.commit('change_n')
    //     }
    // },
    // getters: {
    //     shortDescriptionGetters: function (state) {
    //         return `${state.shortDescriptionstate.description?.html || ""}`
    //     }
    // }
})