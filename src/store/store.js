import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    state:{
        mapbox:'',
        count:0
    },
    mutations:{
        initmap(state,pay){
            state.mapbox=pay;
        },
        addmethod(state){
            state.count++
        }
    },
    getters:{
        getMap(state){
            return state.mapbox;
        },
        getCount(state){
            return state.count;
        }
    }
})

