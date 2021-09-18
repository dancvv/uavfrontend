import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    state:{
    //    leaflet
        leafletMap:'',
    //    存储全局marker
        leafMarker:'',
    //    当前marker位置，存储点击的序号
        markersLocate:'',
        // 服务点所在位置
        depotLocations:[{lat:'',lng:''}],
        vehiclePlan:{vehicleNumber:'', depot:''},
    },
    mutations:{
        initleaflet(state,payload){
            state.leafletMap=payload;
        },
        initmarker(state,payload){
            state.leafMarker=payload
        },
        // 设置marker的坐标
        markerChangeLocation(state,payload){
            state.leafMarker.setLatLng(payload)
        },
        //存储点击的marker是哪一个
        recordLocate(state,payload){
            state.markersLocate=payload
        },
        // 改变默认当前的用户坐标点
        changeLocations(state,payload){
            state.depotLocations=payload
        },
    //    改变无人机参数
        changeVehicles(state,payload){
            state.vehiclePlan=payload
        }

    },
    getters:{
        getMap(state){
            return state.mapbox;
        }
    }
})

