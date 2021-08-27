<template>
<div>
  <h3 class="h3">测试内容</h3>
  <span class="span">

    <el-input class="span" v-model="wsmsg" placeholder="输入"  ></el-input>
    <el-button type="primary" @click="connect">按钮</el-button>
  </span>
  <div id="input">
    <el-input type="textarea" :rows="4" placeholder="连接成功将会更新" v-model="connectText"></el-input>
    <el-input v-model="inputText" placeholder="输入内容"></el-input>
    <el-button type="success" @click="send">发送</el-button>
  </div>

</div>
</template>

<script>
export default {
  name: "webSocket",
  data(){
    return{
      wsmsg:"",
      connectText:"",
      inputText:""
    }
  },
  methods:{
    connect(){
      alert("success")
    },
    send(){
      console.log("send")
    }
  }
}
</script>

<style scoped>
.h3{
  align-content: center;
  text-align: center;
}
.span{
  width: 300px;
  text-align: center;
}
#input{
  width: 500px;
  background-color: tomato;
}
</style>
