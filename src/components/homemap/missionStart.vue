<template>
<div id="mission-group">
  <el-button type="success" @click="startUav">无人机起飞</el-button>
</div>
</template>

<script>
export default {
  name: "missionStart",
  data(){
    return{
      data:null
    }
  },
  methods:{
    startUav(){
      const mapLeaf=this.leafletMap
      mapLeaf.on('click',(e)=>{
        console.log(e)
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
