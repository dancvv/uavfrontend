import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    state:{
        mapbox:'',
        mapStyle:'',
        testIndex:'string test'
    },
    mutations:{
        initmap(state,pay){
            state.mapbox=pay;
        },
        styleChange(state,payload){
            state.mapStyle=payload
            state.mapbox.setStyle(state.mapStyle)
        }
    },
    getters:{
        getMap(state){
            return state.mapbox;
        }
    }
})

