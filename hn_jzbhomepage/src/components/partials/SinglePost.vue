<template>
  <div>
    <div class="header-image" v-if="article['himage']">
      <img :src="uploads(article['himage']['path'])" alt="">
    </div>
    <div class="article-con" v-if="article['title']">
      <h2 class="article-title">{{ article['title'] }}</h2>
      <div class="article-time" v-if="showDate">发布日期：{{ date("Y年m月d日", article['custom_date'] || article['_modified']) }}</div>
      <div class="featured-image" v-if="article['image']">
        <img :src="uploads(article['image']['path'])" alt="">
      </div>
      <div class="article-content" v-html="article['content']">
      </div>
    </div>
    <div v-if="isEmpty" class="coming-con">
      <h2>敬请期待</h2>
    </div>
  </div>
</template>

<script>
  import AppService from '@/app.service'
  import AppConfig from '@/app.config'
  export default {
    name: 'single-post',
    props: {
      articleType: {
        type: String,
        default: 'news'
      },
      articleId: {
        type: String,
        default: '0'
      },
      articleName: {
        type: String,
        default: ''
      },
      showDate: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        isEmpty: false,
        article: {
          title: '',
          _modified: '',
          content: ''
        }
      }
    },
    methods: {
      uploads: function (path) {
        return AppConfig.uploads(path)
      },
      date: function (fmt, seconds) {
        return AppService.date(fmt, seconds)
      },
      update: function () {
        var _id = this.articleId
        if (_id) {
          _id = this.$route.params.id
        }
        if (_id || this.articleName) {
          AppService.article(_id, this.articleType, this.articleName)
          .then(function (post) {
            if (post && post.title) {
              this.article = post
            } else {
              this.isEmpty = true
              this.article = {
                title: '',
                _modified: '',
                content: ''
              }
            }
          }.bind(this))
        }
      }
    },
    watch: {
      articleId: function () {
        this.update()
      },
      articleName: function () {
        this.update()
      }
    },
    mounted () {
      this.update()
    }
  }
</script>

<style>
  .header-image img {
    width: 100%;
  }
  .article-con {
    width: 70%;
    margin: 0 auto;
    padding-top: 40px;
  }
  .article-title {
    color: black;
    text-align: center;
  }
  .article-time {
    font-size: 12px;
    color: gray;
    text-align: center;
  }
  .article-content {
    margin: 0 auto;
    padding: 40px 0;
    line-height: 1.5em;
  }
  .article-content p {
    text-indent: 2em;
  }
  .featured-image {
    padding-top: 40px;
    text-align: center;
  }
  .featured-image img {
    max-width: 100%;
  }

  .coming-con {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
