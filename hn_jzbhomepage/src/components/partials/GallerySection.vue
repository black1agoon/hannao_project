<template>
  <div class="sub-section">
    <div class="section-title">
      <h1>鉴真宝对外交流活动</h1>
    </div>
    <div class="gallery-container">
      <div class="pure-g">
        <div class="pure-u-1-3" v-for="(photo, idx) in photos">
          <div class="half-bg"
               :class="{'left-side': idx % 3 === 0, 'right-side': idx % 3 === 2}"
               :style="'background-image: url(' + uploads(photo['image']['path']) + ')'">
            <div class="bg-title-md bg-item">{{ photo['title'] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppService from '@/app.service'
  import AppConfig from '@/app.config'
  export default {
    name: 'gallery-section',
    methods: {
      uploads: function (path) {
        return AppConfig.uploads(path)
      },
      fetchEvents: function () {
        var options = {
          limit: 9,
          filter: {
            published: true
          }
        }
        AppService.collection('gallery', options)
          .then(function (data) {
            this.photos = data.entries || []
          }.bind(this))
      }
    },
    data () {
      return {
        photos: []
      }
    },
    mounted () {
      this.fetchEvents()
    }
  }
</script>

<style scoped>
  /* Gallery */

  .pure-g .half-bg.left-side {
    margin-left: 0;
  }
  .pure-g .half-bg.right-side {
    margin-right: 0;
  }

  .half-bg {
    padding-bottom: 64%;
    margin: 5px;
    transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
  }
  .half-bg:hover {
    background-size: 103%;
  }

  .half-bg::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    background: rgba(0,0,0,0.3);
  }
  .half-bg:hover::before {
    background: rgba(0,0,0,0);
  }

  .gallery-container .bg-title-md {
    color: white;
    margin-bottom: 0;
    bottom: 0;
    padding: 5%;
    left: 0;
    font-size: 1em;
    background: rgba(0, 0, 0, 0.5);
    width: 90%;
  }
</style>
