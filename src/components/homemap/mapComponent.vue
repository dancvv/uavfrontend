<template>
<div>
<!--  <el-button type="primary" @click="add">添加按钮</el-button>-->
<!--  <el-button type="primary" @click="add2">加法</el-button>-->
  <!--  <el-button type="primary" @click="add3">添加按钮</el-button>-->
  <el-button id="card-edit" type="primary" size="mini" @click="showEdit">{{!showCard?'进入设置':'停止编辑'}}</el-button>
  <el-card id="card-box" v-show="showCard">
    <div slot="header">选项设置</div>
    <el-button type="primary" class="mapgroup" size="mini" @click="placePoint">{{poly.edit?'停止绘制':'开始绘制'}}</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="uploadData">上传数据</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="clearBackend">清楚数据</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="showMarker">自定义图标</el-button>
    <el-input class="mapgroup" ></el-input>
  </el-card>
  <img src="url(`+require('/assets/uavIcon.png')+`)" alt="kjf">
</div>
</template>

<script>
import {mapState} from "vuex";
import mapboxgl from "mapbox-gl";

export default {
  name: "mapComponent",
  data(){
    return{
      // map:''
      //展示卡片
      showCard:false,
    //  开始编辑地图
      poly:{
        paths:[],
        edit:false
      },
      img:'url(../../assets/uav48.svg'
    }
  },
  mounted() {
  },
  methods:{
    showEdit(){
      this.showCard=!this.showCard
    },
    placePoint(){
      this.poly.edit=!this.poly.edit
      const mapbox=this.mapbox
      // map.on('click',e=>{
      //   console.log(e)
      // })
      mapbox.on('click',(e)=>{
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
        new mapboxgl.Marker().setLngLat(temp).addTo(mapbox)
      });
    },
    showMarker(){
      // element marker元素
      // const el = document.createElement('div');
      // el.id = 'marker';
      // const marker=new mapboxgl.Marker(el).setLngLat([121.81135905402766, 39.084797545212155]).addTo(map)

      const map=this.mapbox
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = "url('+require('assets/uav48.svg')+')";
      el.style.width = '48px';
      el.style.height = '48px';
      // el.style.backgroundSize = '100%';
// Add markers to the map.
//       const map=new map.Marker(el)
      const marker=new mapboxgl.Marker(el)
          .setLngLat([121.81135905402766, 39.084797545212155])
          .addTo(map);
      //挂载到mapbox对象上
      console.log(marker)
    },
    //上传数据到数据库
    async uploadData() {
      console.log(this.poly.paths)
      const {data: res} = await this.$http.post('compute/depotData', this.poly.paths)
      console.log(res)
      if (res.status === 200) {
        alert("上传数据库成功")
      } else {
        alert("上传数据库失败")
      }
    },
    //  清除后端所有数据
    async clearBackend() {
      const {data: res} = await this.$http.get('compute/delete')
      console.log(res)
      if (res.status !== 200) {
        this.$message.error("网络连接超时")
        return
      }
      console.log(res.msg)
      this.$message.success(res.msg)
    },

  },
  computed:{
    // add3(){
    //   console.log(this.$store.getters.getCount)
    //   return this.$store.getters.getCount
    // }
    ...mapState(['mapbox'])
  }
}
</script>

<style scoped>
#card-edit{
  position: absolute;
  margin-top: 60px;
  margin-left: 20px;
  /*width: 300px;*/
  z-index:1
}
#card-box{
  position: absolute;
  margin-top: 100px;
  margin-left: 20px;
  width: 300px;
  z-index:1
}
.mapgroup{
  margin-bottom: 10px;
}
</style>
