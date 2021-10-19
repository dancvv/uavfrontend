<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>任务执行</el-breadcrumb-item>
    <el-breadcrumb-item>当前路线</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
    <el-col :span="11">
      <el-card class="cardstate">
        <h3 class="header">状态初始化</h3>


        <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"></el-popover>
        <el-button slot="reference">tanhcud</el-button>
        <p>dfjkejfke</p>
        <el-button>djfkejfek</el-button>
      </el-card>
    </el-col>
    <el-col :span="11">
      <el-card class="cardstate">
        <div>
          <h3 class="header">动作指令</h3>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-card class="cardstop">
        <h3 class="header">停止</h3>
      </el-card>
    </el-col>
  </el-row>



</div>
</template>

<script>
export default {
  name: "controlinstance",
  data(){
    return{
      visible:false
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}

.cardstate{
  margin-left: 30px;
  background-color: #007aff;
  color: white;
  display: flex;
  justify-content: start ;
  margin-bottom: 30px;
}
.el-divider{
  color: white;
}
.header{
  margin-top: -5px;
  color: white;
}
.cardstop{
  margin-left: 30px;
  background-color: #ff3b30;

}
</style>
