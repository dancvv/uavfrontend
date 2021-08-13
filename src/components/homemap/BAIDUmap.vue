<template>
<div id="local">


<!--地图类型选项存在导入位图  :map-style="style"-->
      <baidu-map class="map" :center="center" :zoom="zoomLevel" :scroll-wheel-zoom="true" :map-type="mapType">
        <bm-control>
          <el-row type="flex" class="row-bg">
            <el-col>
              <el-radio-group v-model="mapType">
                <el-radio-button label="BMAP_NORMAL_MAP" size="medium">2D地图</el-radio-button>
                <el-radio-button label="BMAP_SATELLITE_MAP" size="medium">卫星地图</el-radio-button>
<!--                <el-radio-button label="3D地图" size="medium"></el-radio-button>-->
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="success" @click="clickChange">改变icon</el-button>
            <el-button type="success" @click="clickDraw($event)">开始绘制</el-button>
            <el-button type="success" @click="handler">清除路线</el-button>
            <el-card v-show="cardVisible">
              <h3>参数设置</h3>
              无人机编号：<el-input v-model="uavConfig.serialNum"></el-input><br>
              经度：<el-input v-model="uavConfig.lng">{{uavConfig.lng}}</el-input><br>
              纬度：<el-input v-model="uavConfig.lat">{{uavConfig.lat}}</el-input><br>
              <el-button @click="cardVisible = false">取 消</el-button>
              <el-button type="primary" @click="editConfirm">确 定</el-button>
            </el-card>
          </el-row>
        </bm-control>
<!--        定位  -->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
<!--        图标区-->
        <bm-marker :position="pos" :icon="UavIcon" @click="onHand" dragging v-if="showMarker"></bm-marker>
        <bm-marker v-for="(item,index) in pos1" :key="index" :position="item" :dragging="true" :icon="UavIcon" @click="onHand"></bm-marker>
<!--        绘制路线-->
        <bm-polyline :path="pos1" stroke-color="#28F" :stroke-opacity="0.5" :stroke-weight="6" :editing="editing" ref="polyRouteline"></bm-polyline>

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
      showMarker:true,
      baiduMapstyle:{
        featrues:Array,
        style:mapstyle,
      },
      zoomLevel:16,
      centerPos:{},
      //无人机参数设置
      uavConfig:{
        serialNum:'',
        lng:'',
        lat:''
      },
      pos:{lng: 121.83206, lat: 39.084716},
      center:{lng: 121.83206, lat: 39.084716},
      //绘制无人机路线
      polyline:{
        editing:false,
        paths:[]
      },
      pos1:[
        {lng: 121.81206, lat: 39.084716},
        {lng: 121.83065, lat: 39.084616},
        {lng: 121.85406, lat: 39.084516},
        {lng: 121.81506, lat: 39.084416},
      ],
      // pos1:{lng: 116.657, lat: 39.915},
      UavIcon:{
        url:require('/public/uav48.svg'),
        size: {width: 48, height: 48}
      },
    //  地图类型选项
      mapType:"BMAP_NORMAL_MAP",
    //  卡片窗口设置
      cardVisible:false,
    }
  },
  created() {

  },
  methods:{
    //获取无人机的位置
    onHand(e){
      this.cardVisible=true
      const{lng,lat}=e.target.point
      this.uavConfig.lng=lng
      this.uavConfig.lat=lat
      this.$message.success("成功推送")
    },
    editConfirm(){
      this.pos.lng=this.uavConfig.lng
      this.pos.lat=this.uavConfig.lat
      this.cardVisible=false
    },
    clickChange(){
      for(let i=0; i<20; i++){

        setTimeout(()=>{
          this.pos.lng=this.pos.lng+0.0001
          this.pos.lat=this.pos.lat+0.0001
        },1000)
      }
    },
    removeLine(){
      console.log("remove")
    },
    handler(){
      // let point = new BMap.Point(121.81606, 39.08516);
      // var marker=new BMap.marker(point)
      // map.addOverlay(marker)
      console.log("清除成功")
      this.pos={}
      this.pos1=[]
      this.showMarker=false
      console.log(this.pos)
      console.log(this.showMarker)
    },
    clickDraw(){
      this.pos1.pop()
      this.showMarker=true
      this.pos={lng: 121.81206, lat: 39.084716}
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
  margin-top: 10px;
  padding: 20px;
}
</style>
