import { computed, onMounted, ref } from 'vue'

export interface Article {
  id: number
  title: string
  body: string
}
export function useArticles() {
  const articles = ref<Article[]>([])
  const searchQuery = ref<string>('')
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchArticles = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      const data = await response.json()
      articles.value = data.slice(0, 20)
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const filteredArticles = computed<Article[]>(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) {
      return articles.value
    }
    return articles.value.filter(
      (article) =>
        article.title.toLowerCase().includes(query) || article.body.toLowerCase().includes(query),
    )
  })

  // Highlight search term
  const highlighTerm = (text: string) => {
    if (!searchQuery.value) {
      return text
    }
    return text.replace(new RegExp(searchQuery.value, 'gi'), (match) => `<mark>${match}</mark>`)
  }

  onMounted(() => {
    fetchArticles()
  })

  return {
    articles: filteredArticles,
    searchQuery,
    loading,
    error,
    highlighTerm,
  }
}
