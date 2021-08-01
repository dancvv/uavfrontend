<template>
<div>
  <elheader></elheader>
  <el-container>
    <elaside></elaside>
    <elmain></elmain>
  </el-container>
</div>
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

</style>
