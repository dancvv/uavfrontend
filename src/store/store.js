import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    state:{
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

