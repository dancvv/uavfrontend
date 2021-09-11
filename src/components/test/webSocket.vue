<template>
<div>
  <h3 class="h3">测试内容</h3>
  <span class="span">

    <el-input class="span" v-model="wsmsg" placeholder="输入"  ></el-input>
    <el-button type="primary" @click="connect">按钮</el-button>
  </span>
  <div class="input">
    <el-input type="textarea" :rows="4" placeholder="连接成功将会更新" v-model="connectText"></el-input>
    <el-input v-model="inputText" placeholder="输入内容"></el-input>
    <el-button type="success" @click="send">发送</el-button>
  </div>
  <div class="input">
    <p>{{count}}</p>
    <span>{{string}}</span><br>
    <el-button type="primary" @click="getfount">加法</el-button>
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
      inputText:"",
      voidvalue:"dwede"
    }
  },
  computed:{
    //通过计算属性获取对象中的值
    count(){
      // voidvalue=this.$store.state.count
      return this.$store.state.count
    },
    string(){
      return this.$store.state.map
    }
  },
  methods:{
    connect(){
      alert("success")
    },
    send(){
      console.log("send")
    },
    getfount() {
      this.voidvalue=this.$store.state.count
      this.voidvalue+=1
      console.log(this.voidvalue)
    },
    testAdd(){
      // this.$store.commit('addmethod')
      console.log(this.$store.state.count)
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
.input{
  width: 500px;
  background-color: tomato;
}
</style>
