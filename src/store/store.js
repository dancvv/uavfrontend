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
    //    存储全局marker
        leafMarker:'',
    //    当前marker存储位置
        markersLocate:'',
    },
    mutations:{
        initleaflet(state,payload){
            state.leafletMap=payload;
        },
        initmarker(state,payload){
            state.leafMarker=payload
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
        markerChangeLocation(state,payload){
            state.leafMarker.setLatLng(payload)
        },
        //存储点击的marker是哪一个
        recordLocate(state,payload){
            state.markersLocate=payload
        }

    },
    getters:{
        getMap(state){
            return state.mapbox;
        }
    }
})

