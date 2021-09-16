<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>飞行器位置</el-breadcrumb-item>
    <el-breadcrumb-item>批量上传坐标</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="boxCard">
    <el-table class="table-group" :data="locations" highlight-current-row @row-click="currentChange">
      <el-table-column type="selection" width="60px"></el-table-column>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column label="纬度(Lat)" width="300" property="lat" ></el-table-column>
      <el-table-column label="经度(Lng)" width="300" property="lng" ></el-table-column>
      <el-table-column label="操作" width="100" property="lng" ><el-button type="danger" size="mini" @click="rowDelete" >删除</el-button></el-table-column>
    </el-table>
    <el-button class="buttonGroup" type="danger" @click="deleteAll">删除选中项</el-button>
    <el-button class="buttonGroup" type="success" @click="upload">提交</el-button>
  </el-card>
</div>
</template>

<script>
export default {
  name: "locationTable",
  data(){
    return{
      locations:[
        {lat:'12',
        lng:'12'},
        {lat:'12',
          lng:'12'},
      ]
    }
  },
  methods:{
    rowDelete(){
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.boxCard{
  margin: 10px;
}
.buttonGroup{
  margin-top: 10px;
}
</style>
