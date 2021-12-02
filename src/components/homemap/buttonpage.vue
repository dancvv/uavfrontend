<template>
<div>
  <el-button id="card-edit" type="primary" size="mini" @click="showEdit">{{!showCard?'进入设置':'停止编辑'}}</el-button>
  <el-tabs class="card-box" v-model="activeTab" type="border-card" v-show="showCard">
    <el-tab-pane label="任务设置" name="missionManage">
      <el-button type="primary" size="mini" @click="placeUserPoint">{{!editFtButton.placeUserPoint ?'用户位置初始化':'完成'}}</el-button>
      <el-button type="primary" size="mini" @click="placeDepotPoint">{{!editFtButton.placeDepotPoint ?'起始位置初始化':'完成'}}</el-button><br>
      <el-button type="primary" size="mini" @click="resetAll">重置</el-button>
      <el-button type="primary" size="mini" @click="pushAll">{{ !editFtButton.uploadStatus?'确认提交':'已提交' }}</el-button>
    </el-tab-pane>
    <el-tab-pane label="路线规划" name="uncertain">
      <el-form ref="uavpane" >
        <el-form-item label="无人机数量：" label-width="100px"><div class="inputBox"><el-input type="primary" size="mini" placeholder="至少大于1" v-model="editFtButton.vehicleNumber"></el-input></div></el-form-item>
        <el-form-item><el-button type="success" size="mini" @click="planRoute">路线规划</el-button><el-button type="success" size="mini" @click="drawLine">路线轨迹</el-button></el-form-item>
      </el-form>
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
      this.showCard=!this.showCardz
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
    planRoute(){
      this.$emit("planRoute")
    },
    drawLine(){
      this.$emit("drawLine")
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
.inputBox{
  width: 80px;
  /*margin-right: 60px;*/
}

</style>
