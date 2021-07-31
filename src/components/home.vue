<template>
<div>
  <h1>我是主页</h1>
<router-link to="/books">图书</router-link>
  <a href="/">空白</a>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style scoped>

</style>
