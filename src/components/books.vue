<template>
  <div>

  <ul>
    <li v-for="book in books" :key="book.id"><router-link :to="'/sbook/'+book.id">{{ book.title }}</router-link> </li>
  </ul>
  <router-view></router-view>
  </div>
</template>

<script>
import Books from './content/books'
export default {
  name: "books",
  data(){
    return{
      books:Books
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
