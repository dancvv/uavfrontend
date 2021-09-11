<template>
<div class="mapbox">
  <el-radio-group class="mapStyle" v-model="map.style" @change="changeStyle" size="mini">
    <el-radio-button label="mapbox://styles/mapbox/streets-v9" size="mini" >平面地图</el-radio-button>
    <el-radio-button label="mapbox://styles/mapbox/satellite-v9" size="mini" >卫星地图</el-radio-button>
    <el-radio-button label="mapbox://styles/mapbox/outdoors-v10" size="mini" >户外地图</el-radio-button>
  </el-radio-group>
  <el-card class="card-box">
    <div slot="header">选项设置</div>
    <el-button type="primary" class="mapgroup" size="mini" @click="placePoint">{{poly.edit?'停止绘制':'开始绘制'}}</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="uploadData">上传数据</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="showMarker">自定义图标</el-button>
    <el-input class="mapgroup" >{{location}}</el-input>
    <map-component></map-component>
  </el-card>

  <div id="map-view">
    <div class="marker"></div>
  </div>
</div>


</template>

<script>
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import {mapMutations, mapState} from "vuex";
import MapComponent from "@/components/homemap/mapComponent";
let map=null
export default {
  name: "mapboxView",
  components: {MapComponent},
  data(){
    return{
      map:{
        center:[121.81135905402766, 39.084797545212155],
        zoom:14,
        style:"mapbox://styles/mapbox/streets-v9"
      },
      location:[121.81135905402766, 39.084797545212155],
      poly:{
        paths:[],
        edit:false
      },
    }
  },
  computed:{
    ...mapState({maps:'mapbox'})
  },
  mounted() {
    // this.init()
    this.first()
  },
  methods:{
    //更改方向
    ...mapMutations(['initmap']),
    first(){
      // const map=new mapboxgl.Map({
      //   container: 'map-view',
      //   style: this.map.style,
      //   center: this.map.center,
      //   zoom: this.map.zoom,
      // });
      this.initmap(new mapboxgl.Map({
                      container: 'map-view',
                      style: this.map.style,
                      center: this.map.center,
                      zoom: this.map.zoom,
      }))
      // console.log(mapx)
      // mapx.addControl(new map.NavigationControl)
    },
    init(){
      // const map=new mapboxgl.Map({
      //   container: 'map-view',
      //   style: this.map.style,
      //   center: this.map.center,
      //   zoom: this.map.zoom,
      // });
      // map.addControl(new mapboxgl.NavigationControl())
      // return map;
    },
    //改变地图样式
    changeStyle(){
      map.setStyle(this.map.style)
      console.log(this.map.style)
    },
    //上传数据
    async uploadData() {
      // const map=this.init()
      const {data: res} = await this.$http.post('compute/depotData', this.poly.paths)
      console.log(res)

    },
    placePoint(){
      this.poly.edit=!this.poly.edit
      map.on('click',(e)=>{
        if (!this.poly.edit){
          return
        }
        //临时位置数组
        let temp=[]
        temp[0]=e.lngLat.lng
        temp[1]=e.lngLat.lat
        console.log(temp)
        this.poly.paths.push(e.lngLat)
        console.log(this.poly.paths)
        //根据点击位置放置一个图标
        new mapboxgl.Marker().setLngLat(temp).addTo(map)
      });
    },
    showMarker(){
      // element marker元素
      // const el = document.createElement('div');
      // el.id = 'marker';
      // const marker=new mapboxgl.Marker(el).setLngLat([121.81135905402766, 39.084797545212155]).addTo(map)


//       const el = document.createElement('div');
//       el.className = 'marker';
//       // el.style.backgroundImage = "url(https://placekitten.com/g/50/50)";
//       // el.style.width = '48px';
//       // el.style.height = '48px';
//       // el.style.backgroundSize = '100%';
// // Add markers to the map.
//       const marker=new mapboxgl.Marker(el)
//           .setLngLat([121.81135905402766, 39.084797545212155])
//           .addTo(map);
//       console.log(marker)
    }
  },
}
</script>

<style scoped>
.mapbox{
  height: 100%;
}
#map-view{

  height: 100%;
  z-index: 0;
}
.card-box{
  position: absolute;
  margin-top: 60px;
  margin-left: 20px;
  width: 300px;
  z-index:1
}
.mapgroup{
  margin-bottom: 10px;
}
.mapStyle{
  position: absolute;
  z-index: 1;
  margin-top: 20px;
  margin-left: 20px;
}
#marker{
  background-image: url('https://placekitten.com/g/50/50');
  background-size: 100%;
  width: 48px;
  height: 48px;

}
</style>
