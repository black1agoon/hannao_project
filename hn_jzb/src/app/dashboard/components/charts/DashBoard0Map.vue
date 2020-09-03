<template>
  <div class="map-wrapper">
    <div id="board0map"></div>
    <div class="showinfo"
      v-show="showinfo">
      <p v-if="equipmentMsg.name">产品名称:{{equipmentMsg.name}}</p>
      <p v-if="equipmentMsg.comanyName">所属企业:{{equipmentMsg.comanyName}}</p>
      <p v-if="equipmentMsg.barCode">资产条码:{{equipmentMsg.barCode}}</p>
      <p v-if="equipmentMsg.equipmentCode">设备条码:{{equipmentMsg.equipmentCode}}</p>
      <p v-if="equipmentMsg.status">状态:{{equipmentMsg.status}}</p>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import AMap from 'AMap'

  export default {
    name: 'dash-board0-map',
    data() {
      return {
        map: null,
        arrayBounds: null,
        showinfo: false,
        query: {
          northEast: null,
          southWest: null
        },
        equipmentMsg: {
          name: null,
          comanyName: null,
          barCode: null,
          equipmentCode: null,
          status: null
        }
      }
    },
    methods: {
      getMakers() {
        this.arrayBounds = this.map.getBounds()
        let southwest = this.arrayBounds.getSouthWest()
        let northeast = this.arrayBounds.getNorthEast()
        this.query.northEast = northeast.lng + ',' + northeast.lat
        this.query.southWest = southwest.lng + ',' + southwest.lat
        api.board0.getdb20(this.query).then(data => {
          if (data && data.length > 0) {
            for (let i = 0; i < data.length; i += 1) {
              let circleMarker = new AMap.CircleMarker({
                center: [data[i].lon, [data[i].lat]],
                radius: 10,
                strokeColor: 'white',
                strokeWeight: 2,
                strokeOpacity: 0.5,
                fillColor: '#1890FF',
                // fillOpacity: 0.5,
                zIndex: 10,
                bubble: true,
                cursor: 'pointer',
                clickable: true,
                extData: {...data[i]}
              })
              circleMarker.on('mouseover', () => {
                this.showinfo = true
                this.equipmentMsg.name = circleMarker.getOptions().extData.name
                this.equipmentMsg.comanyName = circleMarker.getOptions().extData.comanyName
                this.equipmentMsg.barCode = circleMarker.getOptions().extData.barCode
                this.equipmentMsg.equipmentCode = circleMarker.getOptions().extData.equipmentCode
                this.equipmentMsg.status = circleMarker.getOptions().extData.status
              })
              circleMarker.on('mouseout', () => {
                this.showinfo = false
              })
              circleMarker.setMap(this.map)
            }
          }
        })
      }
    },
    mounted() {
      this.map = new AMap.Map('board0map', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 11, // 初始化地图层级
        center: [121.029681, 30.70484], // 初始化地图中心点
        mapStyle: 'amap://styles/a306660c40b4ade27a730156d3f25836'
      })
      this.getMakers()
      this.map.on('zoomend', () => {
        this.getMakers()
      })
      this.map.on('moveend', () => {
        this.getMakers()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .map-wrapper
    width: 100%
    height: 100%
    position: relative
    #board0map
      width: 100%
      height: 100%
      border: 1px solid #eeeeee
    .showinfo
      padding: 10px 10px
      border-radius: 3px
      position: absolute
      top: 10px
      background-color: white
      border-width: 0
      right: 10px
      box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5)
      p
        font-size: 14px
        color: #4a4a4a
        line-height: 20px
  .amap-logo
    right: 0 !important
    left: auto !important
    display: none

  .amap-copyright
    display: none !important
</style>
