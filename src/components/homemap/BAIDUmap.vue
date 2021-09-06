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
              <el-button type="success" @click="handler">清除所有规划</el-button>
              <el-button type="primary" @click="toggle('polyline')">{{polyline.editing?'停止绘制':'开始绘制'}}</el-button>
              <el-button type="success" @click="Fconsole">打印</el-button>
              <el-button type="success" @click="uploadData">上传数据</el-button>
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
            <el-button type="primary" @click="getDepot">获取服务规划</el-button>
            <el-button type="primary" @click="clearTable">清除所有结果</el-button>
          </el-row>
          <el-row>
            <el-dropdown >
              <el-button type="primary" size="medium">
                选择无人机<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in opt" :key="item.value" @click.native="changeUav(item.value)">{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </bm-control>
<!--        定位  -->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
<!--        图标区-->
        <bm-marker v-for="path in UavPos.planningRoute" :key="path.id" :position="path" :icon="UavIcon" @click="onHand" :dragging="dragMarker" ></bm-marker>
<!--        服务点位置-->
        <bm-marker v-for="position in depot.positions" :position="position" :key="position.id" :icon="depot" @click="onHand"></bm-marker>
        <bm-marker v-for="(loca) in passRoutes" :position="loca" :key="loca.id" :icon="depot" @click="onHand"></bm-marker>
<!--        <bm-marker v-for="point in polyline.paths" :position="point" :key="point.id" :icon="depot" @click="onHand"></bm-marker>-->
<!--        绘制路线-->
<!--        <bm-polyline stroke-color="#28F" :stroke-opacity="0.5"-->
<!--                     :stroke-weight="6" :path="path" v-for="(path,polyindex) of polyline.paths"-->
<!--                     :key="polyindex" :editing="polyline.editing"></bm-polyline>-->
        <bm-polyline stroke-color="#28F" :stroke-opacity="0.5"
                     :stroke-weight="6" v-for=" (pathIn,pathIndex) in passRoutes" :path="pathIn"
                     :key="pathIndex"></bm-polyline>
<!--        <bm-polyline stroke-color="#28F" :stroke-opacity="0.5" :stroke-weight="6" :path="passRoutes"></bm-polyline>-->
<!--        <bm-polyline stroke-color=" #AF5" :stroke-opacity="0.5"-->
<!--                     :stroke-weight="6" :path="pathline" v-for="pathline of passRoutes" :key="pathline.id"-->
<!--                     ></bm-polyline>-->
      </baidu-map>

</div>


</template>

<script>
import mapstyle from "/src/assets/style/custom_map_config.json"
import qs from "qs";
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
        tempPos:{},
        //规划好的路线
        planningRoute:{}
      },
      // 飞过去的路线
      passRoutes:{},
      //地图中心点
      center:{lat: 39.084716,lng: 121.83206},
      //绘制无人机路线
      polyline:{
        editing:false,
        paths:[]
      },
      //图标区
      UavIcon:{
        url:require('/public/uav48.svg'),
        size: {width: 48, height: 48}
      },
      depot:{
        url:require('/public/depot.svg'),
        size: {width: 48,height: 48},
        positions:[]
      },
    //  地图类型选项
      mapType:"BMAP_NORMAL_MAP",
    //  卡片窗口设置
      cardVisible:false,
    //  图标拖拽
      dragMarker:false,
      //站点位置
      depotPosition:[],
    //  菜单栏参数
      opt:[
        {label:"UAV:1",value:"0"},
        {label:"UAV:2",value:"1"},
        {label:"UAV:3",value:"2"},
        {label:"UAV:4",value:"3"},
      ],
      vehiclePlan:{
        vehicleNumber:4,
        depot:1
      }
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
      this.depot.positions=[]
      console.log(this.pos)
      console.log(this.showMarker)
    },
    //无人机任务
    Fconsole(){
      console.log(this.polyline.paths)
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
      // path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    //绘制新的路线
    paintPolyline (e) {
      if (!this.polyline.editing) {
        return
      }

      this.depot.positions.push(e.point)
      //解构赋值
      const {paths} = this.polyline
      //判断该点
      !paths.length && paths.push([])
      //推入点
      paths[paths.length - 1 ].push(e.point)

    },
    //进行计算并给出规划结果
    async getDepot() {
      //得到结果前，先清除所有结果
      this.polyline.paths=[]
      const {data: res} = await this.$http.post('compute/plan',
          qs.stringify(
              {
                vehicleNumber:this.vehiclePlan.vehicleNumber,
                depot:this.vehiclePlan.depot},))
      // this.depot.positions = res
      console.log(res)
      if(res.status!==200){
        this.$message.error("规划超时")
        return
      }
      this.$message.success("规划求解成功")
    //  得到数据后，从后端取出相应的站点数据
      const {info:listLine} = res
      const mapRoute=new Map
      const mapLocation=new Map
      for(let line in listLine){
        // console.log(listLine[line])
        mapRoute.set(line,listLine[line])
      }
      for(const [key,value] of mapRoute){
        const routeList=[]
        // console.log(key,value)
        for(let i=0;i<value.length;i++){
          // let location={lng:'',lat:''}
          const {data:resData} = await this.$http.get('compute/getLocationByID',{params:{locationId:value[i]+1}})

          console.log(resData)

          delete resData.location.id
          // console.log(resData)
          routeList.push(resData.location)
        }
      mapLocation.set(key,routeList)
      }
      // this.UavPos.planningRoute=mapLocation

      console.log(mapLocation)
      this.UavPos.planningRoute=Array.from(mapLocation)
      console.log(this.UavPos.planningRoute)
      // this.passRoutes=this.UavPos.planningRoute
      console.log(this.passRoutes)

    },
    //上传数据到数据库
    async uploadData() {
      console.log(this.depot.positions)
      const {data: res} = await this.$http.post('compute/depotData', this.depot.positions)
      console.log(res)
      if (res.status === 200) {
        alert("上传数据库成功")
      } else {
        alert("上传数据库失败")
      }
    },
  //  清除后端所有数据
    async clearTable() {
      const {data: res} = await this.$http.get('compute/delete')
      console.log(res)
      if (res.status !== 200) {
        this.$message.error("网络连接超时")
        return
      }
      this.$message.success("成功清除后台数据")
    },
  //  重新赋值,通过传值改变
    changeUav(value){
      this.passRoutes=this.UavPos.planningRoute[value]
      console.log(value)
      console.log(this.passRoutes)
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
/*下来菜单*/
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

</style>
