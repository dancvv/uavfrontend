<template>
  <div>
    de
    <el-amap :center="center" :zoom="zoom">
    </el-amap>
  </div>

</template>

<script>
export default {
  name: "amap",
  data(){
    return{
      center: [  121.83206, 39.084716],
      zoom:15
    }
  }
}
</script>

<style scoped>

</style>
