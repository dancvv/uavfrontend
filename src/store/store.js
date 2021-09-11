import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
    //严格模式，用于调试，发布环境应当取消
    strict:true,
    state:{
        mapbox:'',
        map:'hsdkfjhds',
        count:2323
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

