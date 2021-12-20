<template>
  <div>
    <div class="header-icon">
      <img src="../assets/icon/uavIcon.svg" alt="None">
    </div>
    <div v-show="!isAsideCollapse">
      <span class="header-title" @click="backTo">
            <p class="headName">实时信息处理与</p>
            <p class="headName">态势感知平台</p>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['isAsideCollapse'],
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
.headName{
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  font-style: revert;
  font-weight: bolder;
  margin: 5px;
  color: rgba(45, 45, 45, 0.99);
  cursor: pointer
}
</style>
