<template>
  <div class="main-list">
    <div class="banner">
      <img src="/static/img/contact/banner.jpg" alt="">
    </div>
    <div class="bg-grid">
      <div id="company_map" class="bg-grid-1-2">
        <baidu-map class="map" ak="9ulK3i81gwkMIabFKPbORZzaTY6NRHFx"
                   :zoom="zoom" @ready="onMapReady"
                   :scroll-wheel-zoom="true"
                   @moving="syncCenterAndZoom"
                   @moveend="syncCenterAndZoom"
                   @zoomend="syncCenterAndZoom"
                   :center="center">
          <bm-marker :position="mapCenter" :dragging="true" title="鉴正宝信息技术有限公司">
            <bm-info-window :show="show">
              <span class="marker-title">鉴正宝信息技术有限公司</span>
              <br>
              <span>地址：浙江省平湖市和合路9号汉脑大厦</span>
            </bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>
      <div class="bg-grid-1-2">
        <div id="contact_info">
          <div id="info_wrap">
            <div class="bg-v-middle">
              <p><span class="dashed-title">鉴正宝信息技术有限公司</span></p>
              <p>联系电话: 400-657-3085</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {BaiduMap, BmMarker, BmNavigation, BmInfoWindow} from 'vue-baidu-map'
  export default {
    name: 'contact-page',
    data () {
      return {
        show: false,
        mapCenter: {
          lat: 30.6629329,
          lng: 121.071105
        },
        center: {
          lat: 30.6635,
          lng: 121.071572
        },
        zoom: 18
      }
    },
    components: {
      BaiduMap,
      BmMarker,
      BmNavigation,
      BmInfoWindow
    },
    methods: {
      onMapReady: function (bm) {
        this.show = true
        // PH & HZ
        var pointArr = [{lat: 30.6566700, lng: 121.0646500}, {lng: 120.188287, lat: 30.194381}]
        var convertor = new bm.BMap.Convertor()
        convertor.translate(pointArr, 3, 5, function (data) {
          if (data.status === 0) {
            if (data.points && data.points.length > 0) {
              this.mapCenter = data.points[0]
              this.center = Object.assign({}, data.points[0])
            }
          }
        }.bind(this))
      },
      syncCenterAndZoom (e) {
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()
      }
    }
  }
</script>

<style scoped>
.bg-grid {
  padding: 40px 7%;
  width: 86%;
}
.dashed-title {
  border-bottom: 1px dashed #cccccc;
  font-weight: bold;
}

#company_map .map {
  width: 100%;
  height: 300px;
  font-size: 0.8em;
  background: url('/static/img/contact/map.jpg') no-repeat center;
}
#company_map .map .marker-title {
  font-weight: bold;
  margin: 14px 0;
}

#contact_info {
  padding: 0 80px;
}
#info_wrap {
  height: 300px;
  position: absolute;
}
#info_wrap .bg-v-middle {
  position: relative;
  top: 50%;
  transform: translateY(-56%);
}

.banner {
  text-align: center;
}
.banner img {
  width: 86%;
}
.barcode img {
  width: 200px;
}
</style>
