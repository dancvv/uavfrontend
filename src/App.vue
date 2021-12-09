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
      ws:{},
    //  websocket链接次数
      webI:0
    }
  },

  mounted() {
    //初始化websocket方法
    this.linkTest()
    this.createSocket()
  },
  methods:{
    async linkTest() {
      let that = this
      that.$http.get('/test').then(function (res) {
        console.log(res)
        if (res.data.status===200){
          console.log(res.data.msg)
          that.$message.success(res.data.msg)
        }else{
          that.$message.error("检查连接")
        }
      }).catch(
          function (err){
            that.$message.error("检查连接")
            console.log(err)
          }
      )
      // const {data:res} = await this.$http.get('/test')
      // console.log(res)
      // if(res.status===200){
      //   this.$message.success(res.msg)
      // }else {
      //   this.$message.error("检查连接")
      //   setTimeout(function(){
      //     this.$message.error("检查连接")
      //   },500)
      // }
    },
    sendMessage(message){
      console.log(this.connection)
      this.connection.send(message)
    },
  //  socket方法
    createSocket(){
      //定义这个that=this，可以让变量定型，让变量活动域局限于that中
      let that=this;
      if ("WebSocket" in window){
        that.ws=new WebSocket("ws://49.233.56.74:8085/myws" );
        // that.ws = new WebSocket("ws://localhost:8085/myws");
        that.global.setWs(that.ws)
        that.ws.onopen=()=>{
          console.log("websocket链接成功")
        }
        that.ws.onclose=()=>{
          //判断机制，如果一旦超过阈值，停止
          console.log(this.webI)
          if (this.webI<3){
            this.webI++;
            console.log("websocket链接已关闭")
            //断线重连后端
            setTimeout(()=>{
              //延时两秒后重启socket
              that.createSocket();
            },500)
          }else {
            console.log("超过链接阈值"+this.webI)
          }
        }
      }else {
        console.log("浏览器不支持websocket")
      }
    },
  //  心跳机制，防止后端无法检测无故中段
    keepAlive(){
      let that=this;
      console.log("没有信息")
      setTimeout(()=>{
        if (that.global.ws.readyState==1){
          console.log('发送keeplive')
          that.global.sendMsg({
            "type":"keeplive"
          })
          that.keepAlive()
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
