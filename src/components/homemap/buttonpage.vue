<template>
<div>
  <el-button id="card-edit" type="primary" size="mini" @click="showEdit">{{!showCard?'进入设置':'停止编辑'}}</el-button>
  <el-tabs class="card-box" v-model="activeTab" type="border-card" v-show="showCard">
    <el-tab-pane label="任务设置" name="missionManage">
      <el-button type="primary" size="mini" @click="placeUserPoint">{{!editFtButton.placeUserPoint ?'用户位置初始化':'完成'}}</el-button>
      <el-button type="primary" size="mini" @click="placeDepotPoint">{{!editFtButton.placeDepotPoint ?'起始位置初始化':'完成'}}</el-button>
      <el-button type="primary" size="mini" @click="resetAll">重置</el-button>
      <el-button type="primary" size="mini" @click="pushAll">确认提交</el-button>
    </el-tab-pane>
    <el-tab-pane label="路线规划" name="uncertain">

    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
export default {
  name: "buttonpage",
  props:['editFtButton'],
  data(){
    return{
      showCard:true,
      activeTab:'missionManage',
      // editButton:{
      //   placeUserPoint:false
      // }

    }
  },
  methods:{
    showEdit(){
      this.showCard=!this.showCard
    },
    placeUserPoint(){
      this.$emit('placeUser')
    },
    placeDepotPoint(){
      this.$emit('placeDepot')
    },
    resetAll(){
      this.$emit("resetAllMarker")
    },
    pushAll(){
      this.$emit("pushAll")
    },
  }
}
</script>

<style scoped>
#card-edit{
  position: absolute;
  margin-top: 60px;
  margin-left: 20px;
  /*width: 300px;*/
  z-index:1
}
.card-box{
  position: absolute;
  margin-top: 100px;
  margin-left: 20px;
  width: 300px;
  z-index:1
}
.mapgroup{
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 0px;
  margin-bottom: 10px;
}
.el-button{
  margin-bottom: 10px;
}
.inputSetting{
  margin-bottom: 10px;
  width: 60px;
}
.editBox{
  margin: 10px;
  display: block;
  flex-wrap: wrap;
  align-content: center;
}

</style>
