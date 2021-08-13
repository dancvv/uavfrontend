<template>
  <div>
    <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">
      <el-button @click="clickfalse">点击事件</el-button>
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!--点-->
      <bm-marker :position="map.center" :dragging="map.dragging" animation="BMAP_ANIMATION_DROP">
        <!--提示信息-->
        <bm-info-window :show="map.show">Hello~</bm-info-window>
      </bm-marker>
      <bm-marker :position="local" :massClear="false"></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: "demo",
  data: () => ({
    local:{lng: 121.4573640000, lat: 31.3235200000},
    listenClick:true,
    map:{
      center: {lng: 121.4472540000, lat: 31.3236200000},
      zoom: 15,
      show: true,
      dragging: true
    },
  }),
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      setTimeout(1000)
      map.addEventListener('click', function (e) {
        if (this.listenClick){
        console.log(e.point.lng, e.point.lat)
        map.clearOverlays()}
      })
      // map.addEventListener('dbclick',function (e){
      //   console.log(e.point)
      //   map.clearOverlays()
      // })
    },
    clickfalse(){
      console.log("before: "+this.listenClick)
      this.listenClick=!this.listenClick
      console.log("after: "+this.listenClick)
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>