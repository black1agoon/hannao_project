<template>
  <eui-layout :regions="REGIONS">
    <div slot="west">
      <div class="points">
        <div class="point">
          <map-point :status="0">
          </map-point>
          大灯关 小灯开
        </div>
        <div class="point">
          <map-point :status="1">
          </map-point>
          大灯开 小灯关
        </div>
        <div class="point">
          <map-point :status="2">
          </map-point>
          全开
        </div>
        <div class="point">
          <map-point :status="3">
          </map-point>
          全关
        </div>
        <div class="point">
          <map-point :status="4">
          </map-point>
          离线
        </div>
      </div>
    </div>
    <div class="map-wrap" slot="center">
      <div class="map" ref="map">
        <img @load="loadImage" src="../../../assets/img/lightmap.jpg"/>
        <template v-for="(point, index) in points">
          <map-point class="light"
                     :key="index"
                     @click.native.stop="pointClick(index)"
                     :style="getPosition(point.x, point.y)"
                     :status="point.state">
          </map-point>
          <map-setting ref="setting"
                       @reload="getMapPoints"
                       :value="point"
                       :map="map"
                       :pos-x="point.x"
                       :pos-y="point.y"
                       :key="point.id">
          </map-setting>
        </template>
      </div>
    </div>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {MAP} from './light.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import MapPoint from './components/MapPoint'
  import MapSetting from './components/MapSetting'
  export default {
    name: 'light-map',
    _meta: {
      path: '/light/map',
      title: 'GIS地图'
    },
    components: {
      EuiLayout,
      MapPoint,
      MapSetting
    },
    data() {
      return {
        helper,
        REGIONS: MAP.REGIONS,
        buttons: helper.getMainButtons(),
        points: [],
        map: {
          width: 0,
          height: 0
        },
        lightId: this.$route.query.id
      }
    },
    methods: {
      getMapPoints() {
        api.light.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data) {
            this.points = data.records
            if (this.lightId) {
              this.$nextTick(() => {
                let index = this.points.findIndex(p => p.id === this.lightId)
                this.pointClick(index)
              })
            }
          } else {
            this.points = []
          }
        })
      },
      getPosition(x, y) {
        return {
          // left: x * 100 + '%',
          // top: y * 100 + '%'
          left: x * this.map.width - 5 + 'px',
          top: y * this.map.height - 5 + 'px'
        }
      },
      loadImage() {
        let map = this.$refs.map
        this.map.width = map.offsetWidth
        this.map.height = map.offsetHeight
      },
      pointClick(index) {
        for (let set of this.$refs.setting) {
          set.hideSetting()
        }
        this.$refs.setting[index].showSetting()
      }
    },
    mounted() {
      window.onresize = () => {
        let map = this.$refs.map
        this.map.width = map.offsetWidth
        this.map.height = map.offsetHeight
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getMapPoints()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .points
    margin-top: 50px
    margin-left: 20px
    .point
      margin-top: 15px
      font-size: 16px
      font-weight: bold

  .map-wrap
    position: absolute
    width: 100%
    height: 100%
    font-size: 0
    .map
      position: relative
      height: auto
      img
        width: 100%
      .light
        position: absolute
        cursor: pointer
</style>

