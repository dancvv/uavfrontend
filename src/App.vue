<template>
  <div>
    <elhead></elhead>
    <el-container>
      <elaside></elaside>
      <elmain></elmain>
    </el-container>
  </div>
</template>

<script>



import Elaside from "./components/elaside";
import Elhead from "./components/elhead";
import Elmain from "./components/elmain";
export default {
  name: 'App',
  components: {Elmain, Elhead, Elaside},
}
</script>

<style>

</style>
