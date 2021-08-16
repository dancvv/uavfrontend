<template>
<div>
<!--  <div class="content_box">-->
<!--    <div class="el-button-group">-->
<!--      <el-button-group>-->
<!--        <el-button type="primary">上一页</el-button>-->
<!--        <el-button type="primary">下一页</el-button>-->
<!--      </el-button-group>-->
<!--    </div>-->


    <el-row class="content_box" :gutter="20">
      <el-col :span="6">frrfr</el-col>
      <el-col :span="6"><p>fefe</p></el-col>

    </el-row>





<!--    <el-row :gutter="20">-->
<!--      <el-col :span="5">-->
<!--        <el-radio-group v-model="mapType">-->
<!--          <el-radio-button label="B_NORMAL_MAP" size="medium">2D地图</el-radio-button>-->
<!--          <el-radio-button label="B_EARTH_MAP" size="medium">卫星地图</el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </el-col>-->
<!--&lt;!&ndash;      <el-col :span="5"><div style="background-color: aqua"></div></el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :span="5"><div style="background-color: aqua"></div></el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :span="5"><div style="background-color: aqua"></div></el-col>&ndash;&gt;-->
<!--    </el-row>-->



<!--      <el-col :span="6"><div style="background-color: #304156"> <el-button type="primary">测试3</el-button></div></el-col>-->

<!--    <el-row>-->
<!--      <el-col :span="6"><el-button type="primary">测试</el-button></el-col>-->
<!--    </el-row>-->
<!--  </div>-->

    <el-bmap class="bmap-box" :zoom="zoom" :center="center" :vid="'bmap-vue'" :min-zoom="12" :max-zoom="19" :map-type="mapType">
    </el-bmap>

</div>



</template>

<script>
export default {
  name: "GLmapview",
  data(){
    return{
      zoom: 16,
      center: [121.8320, 39.084716],
      //地图视角类型
      mapType:'B_NORMAL_MAP',
    }
  }
}
</script>

<style scoped>
div{
  background-color: whitesmoke;
  height: 100%;
  width: 100%;
}
.content_box{
  height: 15%;
  background-color: #ac3dcb;
}
.bmap-box{
  height: 85%;
}
.el-row{
  padding: 10px;
  background-color: greenyellow;
  height: 60px;
}
.el-col{
  background-color: tomato;
}
.content_button{
  background-color: teal;
  padding: 10px;
}
.el-button-group{
  padding: 10px;
  width: 200px;
  height: 40px;
}
</style>
