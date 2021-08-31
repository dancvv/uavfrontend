<template>
<div>

  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple">fdfe</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">fdf</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">dfdf</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">dfdfd</div></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</div>



    <!--      <el-col :span="6"><div style="background-color: #304156"> <el-button type="primary">测试3</el-button></div></el-col>-->

    <!--    <el-row>-->
    <!--      <el-col :span="6"><el-button type="primary">测试</el-button></el-col>-->
    <!--    </el-row>-->

</template>

<script>
export default {
  name: "HomePage",
  data(){
    return{
      mapType:''
    }
  }
}
</script>

<style scoped>


.bg-purple-dark {
  background: greenyellow;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
