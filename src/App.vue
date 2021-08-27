<template>
<!--    <el-button type="primary" @click="sendMessage('hello')">Send message</el-button>-->
    <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
      //websocket连接
      connection:null,
      ws:{}
    }
  },

  created() {
    //初始化websocket方法
    this.createSocket()
  },
  methods:{
    sendMessage(message){
      console.log(this.connection)
      this.connection.send(message)
    },
  //  socket方法
    createSocket(){
      //定义这个that=this，可以让变量定型，让变量活动域局限于that中
      let that=this;
      if ("WebSocket" in window){
        that.ws=new WebSocket("ws://localhost:8085/myws");
        that.global.setWs(that.ws)
        that.ws.onopen=()=>{
          console.log("websocket链接成功")
        }
        that.ws.onclose=()=>{
          console.log("websocket链接已关闭")
          //断线重连后端
          setTimeout(()=>{
            that.createSocket();
          },2000)
        }
      }else {
        console.log("浏览器不支持websocket")
      }
    },
  //  心跳机制，防止后端无法检测无故中段
    keepAlive(){
      let that=this;
      setTimeout(()=>{
        if (that.global.ws.readyState==1){
          console.log('发送keeplive')
          that.global.sendMsg({
            "type":"keeplive"
          })
          that.keepAlive()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
