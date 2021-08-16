<template>
<div>
  <div class="content_box">
    <div class="divbox">
      <el-radio-group v-model="mapType" size="small">
        <el-radio-button label="B_NORMAL_MAP">2D地图</el-radio-button>
        <el-radio-button label="B_EARTH_MAP">卫星地图</el-radio-button>
      </el-radio-group>
    </div>
    <div id="Menus">
      <el-card>
        <el-button type="success" @click="removeAll" size="small">清除所有</el-button>
        <el-button type="success" @click="toggle" size="small">{{polyline.enableEditing?'停止绘制':'开始绘制'}}</el-button>
      </el-card>
    </div>
  </div>
<!--地图组件-->

  <el-bmap class="bmap-box" :zoom="zoom" :center="center" :vid="'bmap-vue'" :min-zoom="12"
           :max-zoom="19" :map-type="mapType" :events="polyline.events"
           @click="paintPolyline" @rightclick="newPolyline">
    <el-bmap-marker vid="component-marker" :position="uavIcon.position" :label="uavIcon.label"
                    :raiseOnDrag="true" :icon="uavIcon.icon" @click="paintPolyline"
                    :visible="markerVisible"></el-bmap-marker>
    <el-bmap-polyline stroke-color="#28F" :stroke-opacity="0.5" :stroke-weight="6"
                      :path="polyline.paths" v-if="lineVisible"></el-bmap-polyline>
  </el-bmap>
</div>
</template>

<script>
export default {
  name: "GLmapview",
  data(){
    return{
      zoom: 16,
      center: [121.8320, 39.084716],
      //地图视角类型
      mapType:'B_NORMAL_MAP',
    //  地图icon
      uavIcon:{
        position:[121.8320, 39.084716],
        icon:{
          url:require('/public/uav48.svg'),
          size:[48,48],},
        label:{
          content:'UAV',
          offset:[7,-10]
        }
      },
    //  marker相关的是否可见
      markerVisible:true,
    //  line是否编译
      lineVisible:false,
    //  无人机路线
      polyline:{
        paths:[],
        enableEditing: false,
        events:{
          'click': (e) => {
            if (!this.polyline.enableEditing) {
              return
            }
            alert("get")
            console.log(e)
            //解构赋值
            console.log(this.polyline.enableEditing)
            const {paths} = this.polyline
            console.log(paths.length)
            console.log(e)
            //判断该点
            !paths.length && paths.push([])
            //推入点
            paths[paths.length - 1].push(e.point)
          }
          // click(e){
          //
          //   console.log(e)
          //   if (!this.polyline[1].enableEditing) {
          //     return
          //   }


        },
      },

    }
  },
  methods:{
    removeAll(){
      this.markerVisible=!this.markerVisible
    },
    //是否开始绘制路线
    toggle(){
      this.polyline.enableEditing=!this.polyline.enableEditing
      this.lineVisible=!this.lineVisible

    },
  //  获取坐标点，并进行绘制
    newPolyline () {
      if (!this.polyline.enableEditing) {
        return
      }
      const {paths} = this.polyline
      if(!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    paintPolyline () {
      alert("fdede")

    },
  }
}
</script>

<style scoped>
div{
  background-color: whitesmoke;
  height: 100%;
  width: 100%;
}
.content_box{
  display: flex;
  height: 15%;
  background-color: #ac3dcb;
}
.divbox{
  padding: 10px;
  width: 200px;
  height: 30px;
  border: 2px solid darksalmon;
}
#Menus{
  width: 200px;
  height: 100%;
  align-items: flex-end;
}
.bmap-box{
  height: 85%;
}
.el-button{
  padding: 10px;
}

</style>
