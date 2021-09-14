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
  <el-card id="card-box2" v-show="cardVisible">
    <h3>参数设置</h3>
    无人机编号：<el-input size="mini"></el-input><br>
    经度(lat)：<el-input v-model="markerEdit.lat" size="mini">{{markerEdit.lat}}</el-input><br>
    纬度(lng)：<el-input v-model="markerEdit.lng" size="mini">{{markerEdit.lng}}</el-input><br>
    <el-button class="el-button" @click="cardVisible = false" size="mini">取 消</el-button>
    <el-button class="el-button" type="primary" @click="editConfirm" size="mini">确 定</el-button>
  </el-card>
</div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import L from "leaflet"

let LeafIcon = L.Icon.extend({
  options: {
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
      showCard:true,
    //  开始编辑地图
      poly:{
        paths:[],
        edit:false
      },
      // 是否展示编辑界面
      cardVisible:false,
      markerEdit:{
        lat:'',
        lng:''
      }


    }
  },
  mounted() {
  },
  methods:{
    ...mapMutations([])
    showEdit(){
      this.showCard=!this.showCard
    },
    placePoint(){
      let depotIcon=new LeafIcon({iconUrl: 'mobile.png'})
      this.poly.edit=!this.poly.edit
      const mapLeaf=this.leafletMap
      // let mobileIcon=L.icon({
      //   iconUrl: 'mobile version (1).svg',
      //   iconSize: [48,48],
      //   iconAnchor: [24,48]
      // })
      mapLeaf.on('click',(e)=>{
        if (!this.poly.edit){
          return
        }
        this.poly.paths.push(e.latlng)
        console.log(this.poly.paths)
        //根据点击位置放置一个图标

        const marker=L.marker((e.latlng),{icon:depotIcon}).addTo(mapLeaf).on('click',(e)=>{
          this.cardVisible=!this.cardVisible
          // this.editConfirm()
          console.log(e)
        })
        // 弹出窗口
        // marker.bindPopup(popup).openPopup()
        // var popup = L.popup().setLatLng(e.latlng).setContent('<p>hello world<p/>').openOn(mapLeaf)
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
    editConfirm(){
      //取消显示
      this.cardVisible=!this.cardVisible
      marker.setLatLng()
      console.log(this.cardVisible)
      /*提交表单数据并进行设置*/
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
#card-box2{
  position: absolute;
  margin-top: 100px;
  margin-left: 20px;
  width: 300px;
  z-index:1
}
.mapgroup{
  margin-bottom: 10px;
}
.el-button{
  margin-top: 20px;
}
</style>
