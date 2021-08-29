<template>
<div id="local">


<!--地图类型选项存在导入位图  :map-style="style"-->
      <baidu-map class="map" :center="center" :zoom="zoomLevel" :scroll-wheel-zoom="true" :map-type="mapType"  @mousemove="syncPolyline"
                 @click="paintPolyline"
                 @rightclick="newPolyline">
        <bm-control>
          <el-row type="flex" class="row-bg">
            <el-col>
              <el-radio-group v-model="mapType">
                <el-radio-button label="BMAP_NORMAL_MAP" size="medium">2D地图</el-radio-button>
                <el-radio-button label="BMAP_SATELLITE_MAP" size="medium">卫星地图</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>

            <el-col>
              <el-button type="success" @click="handler">清除路线</el-button>
              <el-button type="primary" @click="toggle('polyline')">{{polyline.editing?'停止绘制':'开始绘制'}}</el-button>
              <el-button type="success" @click="uavmission">无人机任务匹配</el-button>
              <el-button type="success" @click="startMove">起飞</el-button>
            </el-col>
            <el-card v-show="cardVisible">
              <h3>参数设置</h3>
              无人机编号：<el-input v-model="uavConfig.serialNum"></el-input><br>
              经度：<el-input v-model="uavConfig.lng">{{uavConfig.lng}}</el-input><br>
              纬度：<el-input v-model="uavConfig.lat">{{uavConfig.lat}}</el-input><br>
              <el-button @click="cardVisible = false">取 消</el-button>
              <el-button type="primary" @click="editConfirm">确 定</el-button>
            </el-card>
          </el-row>
          <el-row>
            <el-button type="primary" @click="show">add route</el-button>
            <el-input v-model="i">{{i}}</el-input>
          </el-row>
        </bm-control>
<!--        定位  -->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
<!--        图标区-->
        <bm-marker :position="UavPos.tempPos" :icon="UavIcon" @click="onHand" :dragging="dragMarker" v-if="showMarker"></bm-marker>
<!--        <bm-marker v-for="item in UavPos.localPos" :key="item.id" :position="item" :dragging="dragMarker" :icon="UavIcon" @click="onHand"></bm-marker>-->
<!--        绘制路线-->
        <bm-polyline stroke-color="#28F" :stroke-opacity="0.5"
                     :stroke-weight="6" :path="path" v-for="(path,polyindex) of polyline.paths"
                     :key="polyindex" :editing="polyline.editing"></bm-polyline>
        <bm-polyline stroke-color=" #AF5" :stroke-opacity="0.5"
                     :stroke-weight="6" :path="pathline" v-for="pathline of passRoutes" :key="pathline.id"
                     ></bm-polyline>
      </baidu-map>

</div>


</template>

<script>
import mapstyle from "/src/assets/style/custom_map_config.json"
export default {
  name: "BAIDUmap",
  data(){
    return{
      //百度地图样式
      editing:true,
      //是否展示marker
      showMarker:false,
      baiduMapstyle:{
        featrues:Array,
        style:mapstyle,
      },
      zoomLevel:18,
      //无人机参数设置
      uavConfig:{
        serialNum:'',
        lng:'',
        lat:''
      },
      //无人机位置
      UavPos:{
        localPos:[],
        tempPos:{}
      },
      // 飞过去的路线
      passRoutes:[

      ],
      //地图中心点
      center:{lng: 121.83206, lat: 39.084716},
      //绘制无人机路线
      polyline:{
        editing:false,
        paths:[]
      },
      UavIcon:{
        url:require('/public/uav48.svg'),
        size: {width: 48, height: 48}
      },
    //  地图类型选项
      mapType:"BMAP_NORMAL_MAP",
    //  卡片窗口设置
      cardVisible:false,
    //  图标拖拽
      dragMarker:false,
      i:0,
      showline:true,
    }
  },
  created() {

  },
  methods:{
    //获取无人机的位置
    onHand(e){
      this.cardVisible=true
      this.dragMarker=true
      const{lng,lat}=e.target.point
      this.uavConfig.lng=lng
      this.uavConfig.lat=lat
      this.$message.success("成功推送")
    },
    //确定更改无人机位置
    editConfirm(){
      this.pos.lng=this.uavConfig.lng
      this.pos.lat=this.uavConfig.lat
      this.dragMarker=false
      this.cardVisible=false
    },
    //清除路线
    handler(){
      // let point = new BMap.Point(121.81606, 39.08516);
      // var marker=new BMap.marker(point)
      // map.addOverlay(marker)
      console.log("清除成功")
      this.pos={}
      this.polyline.paths=[]
      this.showMarker=false
      console.log(this.pos)
      console.log(this.showMarker)
    },
    //无人机任务
    uavmission(){
      if (!this.polyline.paths.length){
        return
      }
      this.UavPos.localPos=this.polyline.paths[0]
      this.UavPos.tempPos=this.UavPos.localPos[0]
      this.showMarker=true
    },
  //  toggle button 按钮事件，是否开始绘制路线
    toggle(name){
      this[name].editing=!this[name].editing
    },
    syncPolyline () {
    },
    //右键，新建一条新的路线
    newPolyline () {
      if (!this.polyline.editing) {
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
    //绘制新的路线
    paintPolyline (e) {
      this.UavPos.tempPos=e.point
      if (!this.polyline.editing) {
        return
      }
      //解构赋值
      const {paths} = this.polyline
      //判断该点
      !paths.length && paths.push([])
      //推入点
      paths[paths.length - 1 ].push(e.point)
    },
    show(){
      this.passRoutes[this.i]=this.UavPos.localPos[this.i]
      console.log(this.passRoutes)
      console.log(this.UavPos.localPos)
      this.i=this.i+1
    },
    async startMove() {
      const {data: res} = await this.$http.post('compute/depotData', this.polyline.paths[0])
      console.log(res)
      if (res.status === 200) {
        alert("上传数据库成功")
      } else {
        alert("上传数据库失败")
      }
    }
  }
}
</script>

<style scoped>
#local{
  height: 100%;
  background-color: palevioletred;
}
.map {
  width: 100%;
  height: 100%;
}
.el-row{
  padding: 10px;
}
.el-card{
  width: 300px;
  margin-top: 10px;
}

</style>
