<template>
<div>
  <div class="header-icon">
    <img src="../assets/uavIcon.png" alt="None">
  </div>
  <span class="header-title" @click="backTo">
          <p id="headName">无人机管理系统</p>
  </span>
</div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    backTo(){
      this.$router.push('/welcomepage')
    }
  }
}
</script>

<style scoped>
.header-title{
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.header-icon{
  display: block;
  text-align: center;
  margin-top: 30px;
}
#headName{
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  font-style: revert;
  font-weight: bolder;
  color: rgba(45, 45, 45, 0.99);
  cursor: pointer
}
</style>
