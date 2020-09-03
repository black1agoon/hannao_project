<template>
  <div class="main-list">

    <!-- News -->
    <single-post v-if="articleId" :article-id="articleId" article-type="news">
    </single-post>

    <!-- Solution -->
    <single-post v-if="sname"
       :show-date="false"
       :article-name="sname"
       article-type="solutions">
    </single-post>

  </div>
</template>

<script>
  import SinglePost from './partials/SinglePost'
  export default {
    name: 'article-page',
    data () {
      return {
        sname: '',
        articleId: 0
      }
    },
    components: {
      SinglePost
    },
    watch: {
      $route: function () {
        this.sname = this.$route.params.name
        this.articleId = this.$route.params.id
      }
    },
    created () {
      this.sname = this.$route.params.name
      this.articleId = this.$route.params.id
    }
  }
</script>

<style scoped>
</style>
