<template>
<div>

  <el-button id="card-edit" type="primary" size="mini" @click="showEdit">{{!showCard?'进入设置':'停止编辑'}}</el-button>
  <el-card id="card-box" v-show="showCard">
    <div slot="header">选项设置</div>
    <el-button type="primary" class="mapgroup" size="mini" @click="placePoint">{{poly.edit?'停止绘制':'开始绘制'}}</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="uploadData">上传数据</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="clearBackend">清楚数据</el-button>
    <el-button type="primary" class="mapgroup" size="mini" @click="showMarker">自定义图标</el-button>
    <el-input class="mapgroup" ></el-input>
  </el-card>
</div>
</template>

<script>
import {mapState} from "vuex";
import L from "leaflet"

var LeafIcon = L.Icon.extend({
  options: {
    iconUrl:'mobile.svg',
    iconSize:     [48, 48],
    shadowSize:   [0, 0],
    iconAnchor:   [24, 48],
    // popupAnchor:  [24, 48]
  }
});
export default {
  name: "mapComponent",
  data(){
    return{
      // map:''
      center: [ 39.082324815761126,121.81149363525782],
      //展示卡片
      showCard:false,
    //  开始编辑地图
      poly:{
        paths:[],
        edit:false
      },

    }
  },
  mounted() {
  },
  methods:{

    showEdit(){
      this.showCard=!this.showCard
    },
    placePoint(){
      let depotIcon=new LeafIcon({iconUrl: 'depot.svg'})
      this.poly.edit=!this.poly.edit
      const mapLeaf=this.leafletMap
      mapLeaf.on('click',(e)=>{
        if (!this.poly.edit){
          return
        }
        console.log(e)
        this.poly.paths.push(e.latlng)
        console.log(this.poly.paths)
        //根据点击位置放置一个图标
        const marker=L.marker((e.latlng),{icon:depotIcon}).addTo(mapLeaf)
        console.log(marker)
      });
    },
    newMethod(){
      console.log("test success")
    },
    showMarker(){
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
    changeStyle(){

    }

  },
  computed:{
    // add3(){
    //   console.log(this.$store.getters.getCount)
    //   return this.$store.getters.getCount
    // }
    ...mapState(['leafletMap'])
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
.mapStyle{
  position: absolute;
  z-index: 1;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
