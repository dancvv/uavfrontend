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
        // 无人机的路线规划信息
        uavRouteInfo:{},
        fenceParam:{
            points:[{lat:'',lng:''}],
            fenceType:''
        },
        // 无人机路线规划
        uavPlanningRoutes:{
            drawMultiLine:'',
            routeMapLocation:'',
            // 数组路线
            originLine:[],
        },
        // 存储规划值
        planValue:{
            objectiveValue:'',
            routeDistance:''
        },
        // 存储路线的leaflet状态
        leafletLine:{
            // 原始路线
            originLine:'',
            decoratorLine:'',
            layer:'',
        },
    //    12.28
        syncstatus:{
            isAsideCollapse:true,
        }
    },
    mutations:{
        initleaflet(state,payload){
            state.leafletMap=payload;
        },
        storeUavRouteInfo(state,payload){
            state.uavRouteInfo=payload;
        },
        initmarker(state,payload){
            state.leafMarker=payload
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
        },
    //    改变地理围栏参数
        changeFenceParams(state,payload){
            state.fenceParam.points=payload
        },
        storeLineResults(state,payload){
            state.uavPlanningRoutes.drawMultiLine=payload
        },
        // 获取路线值
        uavRoutesMapSetting(state,payload){
            state.uavPlanningRoutes.routeMapLocation=payload
        },
        // 获取规划值
        storeObjectiveValue(state,payload){
            const {objectiveValue,routeDistance}=payload
            state.planValue.objectiveValue=objectiveValue
            state.planValue.routeDistance=routeDistance
        },
        // 存储leaflet路线状态
        storeDecoratorLine(state,payload){
            state.leafletLine.decoratorLine=payload
        },
    //    存储无人机路线数组
        storeOriginLine(state,payload){
            state.uavPlanningRoutes.originLine=payload
        },
    //    改变全局aside，是否展示
        isShowAside(state,payload){
            state.syncstatus.isAsideCollapse=payload
        }



    },
    getters:{
        getMap(state){
            return state.mapbox;
        }
    }
})

