<script lang="ts" setup>
import { useArticles } from '@/composables/useArticles'
const { searchQuery, articles, highlighTerm, loading, error } = useArticles()
</script>
<template>
  <div class="search-box">
    <h2>Search Articles</h2>
    <input type="text" placeholder="Search Articles..." v-model="searchQuery" />

    <p v-if="loading">Loading Articles...</p>
    <p v-if="error">Error loading articles: {{ error }}</p>
    <p v-if="articles.length === 0 && !loading">No articles found</p>
    <p v-else>Found {{ articles.length }} articles</p>
    <div v-for="article in articles" :key="article.id" class="article">
      <h3 v-html="highlighTerm(article.title)"></h3>
      <p v-html="highlighTerm(article.body)"></p>
      <hr />
    </div>
  </div>
</template>
<style scoped>
.search-box {
  background-color: #fff;
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.article h3 {
  font-size: 18px;
  margin: 5px 0;
  font-weight: bold;
}
mark {
  background-color: yellow;
  color: #000;
  padding: 0 2px;
}
.error {
  color: red;
}
hr {
  margin: 15px 0;
  border: 0;
  border-top: 1px solid #eee;
}
</style>
