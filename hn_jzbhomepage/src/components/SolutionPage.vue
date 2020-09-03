<template>
  <div class="main-list">

    <div class="sub-section" :class="{expanded: expanded}">
      <h1 class="section-title">解决方案</h1>
      <div class="bg-grid">
        <router-link v-for="(solution, index) in solutions"
                     :key="solution['name']"
                     :to="'/solution/' + solution['name']"
                     :style="getBackgroundStyle(solution)"
                     :class="{'hidden-cell': index > 3}"
                     class="bg-grid-1-2 full-bg">
          <div class="overlay">
            <div class="titles-con">
              <h2>{{solution['title']}}</h2>
              <p></p>
            </div>
          </div>
        </router-link>
      </div>

      <div class="show-more" @click="showMore(true)">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>
      <div class="show-less" @click="showMore(false)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
    </div>

  </div>
</template>

<script>
  import AppService from '@/app.service'
  import AppConfig from '@/app.config'
  export default {
    name: 'solution-page',
    data () {
      return {
        solutions: [],
        expanded: false
      }
    },
    methods: {
      getBackgroundStyle: function (solution) {
        var url = '/static/img/other/img5.jpg'
        if (solution) {
          if (solution['himage']) {
            url = this.uploads(solution['himage']['path'])
          } else if (solution['image']) {
            url = this.uploads(solution['image']['path'])
          }
        }
        return 'background-image: url(' + url + ')'
      },
      uploads: function (path) {
        return AppConfig.uploads(path)
      },
      showMore: function (stat) {
        this.expanded = stat
      }
    },
    created () {
      var options = {
        filter: { published: true }
      }
      AppService.collection('solutions', options)
      .then(function (data) {
        this.solutions = data['entries'] || []
      }.bind(this))
    }
  }
</script>

<style scoped>
  .sub-section {
    width: 80%;
    margin: 0 auto;
  }
  .section-title {
    margin-top: 0;
    padding-top: 40px;
  }

  .sub-section .bg-grid-1-2 {
    position: relative;
    cursor: pointer;
    background-size: cover;
    padding-bottom: 30%;
    width: 48%;
    margin: 1%;
  }
  .sub-section .bg-grid-1-2 .overlay {
    background-color: rgba(20, 20, 20, 0.5);
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .sub-section .bg-grid-1-2 .titles-con {
    color: white;
    margin: 0 auto;
    text-align: left;
    text-shadow: 1px 1px 1px black;
    position: absolute;
    bottom: 20px;
    left: 40px;
  }
  .sub-section .bg-grid-1-2:hover .overlay {
    background-color: rgba(20, 20, 20, 0.2);
  }

  .show-more {
    display: inherit;
  }
  .expanded .show-more {
    display: none;
  }
  .show-less {
    display: none;
  }
  .expanded .show-less {
    display: inherit;
  }
  .hidden-cell {
    display: none;
  }
  .expanded .hidden-cell {
    display: inherit;
  }
</style>
