<template>
<div id="mission-group">
  <el-button type="success" @click="startUav">无人机起飞</el-button>
</div>
</template>

<script>
import {mapState} from "vuex";
import L from 'leaflet'
let UavIcon = L.Icon.extend({
  options: {
    iconSize:     [48, 48],
    shadowSize:   [0, 0],
    iconAnchor:   [24, 48],
    // popupAnchor:  [24, 48]
  }
});
export default {
  name: "missionStart",
  data(){
    return{
      mapLeaf:null,
      data:null
    }
  },
  computed:{
    ...mapState(['leafletMap'])
  },

  methods:{
    startUav(){
      let uavIcon=new UavIcon({iconUrl: '/leaflet/uav48.svg'})
      const mapLeaf=this.leafletMap
      mapLeaf.on('click',(e)=>{
        console.log(e.latlng)
        L.marker((e.latlng),{icon:uavIcon}).addTo(mapLeaf)
      })
    }
  }
}
</script>

<style scoped>
#mission-group{
  position: absolute;
  z-index: 1;
  right: 5%;
  bottom: 25px;
}

</style>
