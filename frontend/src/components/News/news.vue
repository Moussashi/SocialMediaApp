<template>
    <the-header></the-header>
    <p>latest News</p>
    <ul>
      <li 
        v-for="vhu in news"
        :key="vhu.id"> {{ vhu.title }} </li>
    </ul>
</template>

<script>
import TheHeader from '../interface/TheHeader.vue'
export default {
  components: { TheHeader },
  data() {
    return {
      news: []
    }
  },
  methods: {
    async getNews() {

      const news = await fetch('https://newsapi.org/v2/everything?q=Apple&from=2021-12-26&sortBy=popularity&apiKey=99a940e7327e4be7bccbdf507eb0df2e')
      const News = news.json()

      for (let i = 0; i < News.length; i++ ) {
        this.news.push(News.article[i])
      }
    }
  },
  mounted() {
    this.getNews()
  }
    
}
</script>

<style scoped>

</style>