import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    state:{
        mapbox:''
    },
    mutations:{
        initmap(state,pay){
            state.mapbox=pay;
        }
    },
    getters:{
        getMap(state){
            return state.mapbox;
        }
    }
})

