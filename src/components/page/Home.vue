<template>
<div>
  <h1>统计页面</h1><br>
  <el-button @click="open">点击</el-button>
</div>
</template>

<script>
export default {
  name: "Home",
  methods:{
    open(){
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      });
      this.$notify.error({
        title: '检查连接',
        message: "检查连接"
      })
    }
  }
}
</script>

<style scoped>

</style>
