<template>
  <div id="news_con">
    <div class="sub-section more_info" v-for="p_type in post_types" v-if="posts[p_type.name].length > 0">

      <div class="section-title">
        <h1>{{p_type['title']}}</h1>
      </div>

      <div class="row">
        <router-link v-for="(post, idx) in posts[p_type.name]" :key="post._id" v-if="idx < max_idxs[p_type.name]"
           class="cell cell-left full-bg row-1-2"
           :to="'/news/' + p_type.name + '/' + post['_id']"
           :style="getBackgroundStyle(post)">
          <div class="sub-title hover-in">{{ post.title }}</div>
          <div class="sub-date hidden">{{ date('Y年m月d日', post['custom_date'] || post['_created']) }}</div>
        </router-link>
      </div>

      <div v-if="all_listed" class="show-less" @click="showMore(p_type.name, false)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
      <div v-else class="show-more" @click="showMore(p_type.name, true)">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>

      <pagination v-if="false"
                  :total="posts[p_type.name].length"
                  :init-page="1" :page-size="page_size"
                  @page-changed="changePage">
      </pagination>

    </div>

  </div>
</template>

<script>
  import AppService from '@/app.service'
  import AppConfig from '@/app.config'
  import Pagination from './partials/Pagination'
  export default {
    name: 'news-page',
    props: ['postType'],
    components: {
      Pagination
    },
    data () {
      var pageSize = 4
      return {
        all_listed: false,
        max_idxs: {
          movement: pageSize,
          report: pageSize,
          event: pageSize
        },
        post_types: [
          {
            'name': 'movement',
            'title': '企业动态'
          },
          {
            'name': 'report',
            'title': '政府报道'
          },
          {
            'name': 'event',
            'title': '行业趋势'
          }
        ],
        posts: {
          movement: [],
          report: [],
          event: []
        },
        page: 1,
        page_size: pageSize
      }
    },
    methods: {
      date: function (fmt, seconds) {
        return AppService.date(fmt, seconds)
      },
      checkCount: function (type) {
        if (this.posts[type].length <= this.max_idxs[type]) {
          this.all_listed = true
        } else {
          this.all_listed = false
        }
      },
      showMore: function (type, more) {
        if (more) {
          this.max_idxs[type] += this.page_size
        } else {
          this.max_idxs[type] = this.page_size
        }
        this.checkCount(type)
      },
      changePage: function (p) {
        this.page = p
      },
      fetchPosts: function (type, onePage) {
        var options = onePage ? {
          limit: this.page_size,
          skip: (this.page - 1) * this.page_size
        } : null
        AppService.news(type, options)
          .then(function (data) {
            this.posts[type] = data.entries || []
            this.checkCount(type)
          }.bind(this))
      },
      getBackgroundStyle: function (post) {
        var url = '/static/img/other/img5.jpg'
        if (post['image'] && post['image']['path']) {
          url = AppConfig.uploads(post['image']['path'])
        }
        return 'background-image: url(' + url + ')'
      }
    },
    mounted () {
      var _type = this.$route.params.type || this.postType
      this.page = this.$route.query.page || 1
      if (_type) {
        this.fetchPosts(_type)
      }
    }
  }
</script>

<style scoped>
.more_info {
  min-width: 1024px;
  width: 80%;
  margin: 0 auto;
}
.main-list .more_info {
  width: 100%;
}
.more_info .row .cell {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 30%;
  display: inline-block;
  float: left;
  margin: 0.5%;
  transition: all 0.5 ease;
}
.more_info .row .cell:before {
  content: "";
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  background: rgba(0,0,0,0.5);
}
.more_info .row .cell:hover:before {
  background: rgba(0,0,0,0.3);
}
.more_info .row-2-3 {
  width: 58.3%;
  background-image: url("/static/img/other/img5.jpg");
  position: relative;
}
.more_info .row-1-3 {
  width: 39.7%;
  background-image: url("/static/img/other/img6.jpg");
  position: relative;
}
.more_info .row-1-2 {
  width: 49%;
  background-image: url("/static/img/other/img5.jpg");
  position: relative;
}
.more_info .row .cell.cell-right {
  float: right;
}
.more_info:after {
  clear: both;
  content: "";
  display: table;
}
.more_info .sub-title {
  opacity: 1;
  position: absolute;
  left: 40px;
  bottom: 60px;
  color: white;
  font-size: 28px;
  max-width: 84%;
  text-shadow: 1px 1px 1px black;
}
.more_info .sub-date {
  position: absolute;
  right: 40px;
  bottom: 20px;
  color: white;
  font-size: 14px;
  max-width: 84%;
  text-shadow: 1px 1px 1px black;
}
#app>#news_con {
  padding-bottom: 326px;
}
.more_info .show-more,
.more_info .show-less {
  display: inherit;
  clear: both;
}
.more_info .show-more p,
.more_info .show-less p {
  font-size: 14px;
  padding: 20px;
}
</style>
