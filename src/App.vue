<template>
<el-container direction="vertical">
  <elheader></elheader>
  <el-container>
    <elaside></elaside>
    <elmain></elmain>
  </el-container>
</el-container>
</template>

<script>
import Elheader from "@/components/elheader";
import Elaside from "@/components/elaside";
import Elmain from "@/components/elmain";
export default {
  name: "App",
  components: {Elmain, Elaside, Elheader}
}
</script>

<style scoped>
.el-container{
  height: 100%;
}
</style>
