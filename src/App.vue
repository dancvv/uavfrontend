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

/*取消显示层的边界,*/
/*要是目标生效，需要去html文件更改源文件样式*/
/**{*/
/*  padding: 0;*/
/*  margin: 0;*/
/*  border: 0;*/
/*}*/
/*body{*/
/*  margin: 0;*/
/*}*/
</style>
