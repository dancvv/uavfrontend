import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    state:{
        mapbox:'',
        mapStyle:'',
        mapMarker:'',
        testIndex:'string test'
    },
    mutations:{
        initmap(state,payload){
            state.mapbox=payload;
        },
        styleChange(state,payload){
            state.mapStyle=payload
            state.mapbox.setStyle(state.mapStyle)
        },
        // markerChange(state,payload){
        //     const map = new state.mapbox.Map
        //     // const map=new state.
        // }
    },
    getters:{
        getMap(state){
            return state.mapbox;
        }
    }
})

