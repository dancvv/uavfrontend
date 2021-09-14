import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    state:{
        mapbox:'',
        mapStyle:'',
        mapMarker:'',
        gmap:'',
        //高德地图
        map_gd:'',
        testIndex:'string test',
    //    leaflet
        leafletMap:'',
    },
    mutations:{
        initleaflet(state,payload){
            state.leafletMap=payload;
        },
        initmap(state,payload){
            state.mapbox=payload;
        },
        initGmap(state,payload){
            state.mapbox=payload
        },
        styleChange(state,payload){
            state.mapStyle=payload
            state.mapbox.setStyle(state.mapStyle)
        },

    },
    getters:{
        getMap(state){
            return state.mapbox;
        }
    }
})

