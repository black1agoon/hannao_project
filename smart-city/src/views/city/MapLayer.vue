<template>
  <div id="map_container"></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import mapConfig, { buildingsLayerConfig, trafficLayerConfig } from '@/config/map-config';
  import Markers from '@/config/markers';
  import CityData from '@/demo/city-data';
  import { MarkPoint } from '@/types/interfaces';
  import echarts from 'echarts/lib/echarts';
  import 'echarts-extension-amap';
  import EChartOption = echarts.EChartOption;
  import RoadsData from '@/demo/road-data';

  @Component
  export default class MapLayer extends Vue {
    private chart!: echarts.ECharts;
    private map!: AMap.Map;
    private spotInterval!: number;

    public stopMove() {
      if (this.spotInterval) {
        window.clearInterval(this.spotInterval);
      }
    }

    public startMove() {
      if (!this.spotInterval) {
        this.spotMove();
      }
    }

    public toggleSpot() {
      if (this.spotInterval) {
        this.stopMove();
      } else {
        this.startMove();
      }
    }

    private mounted() {
      this.initChart();
    }

    private beforeDestory() {
      this.stopMove();
    }

    /**
     * Initialize AMap with echarts
     */
    private initChart() {
      this.chart = echarts.init(this.$el as HTMLDivElement);
      this.chart.setOption({
        amap: mapConfig,
        series: RoadsData.roadSeries,
      } as EChartOption);
      this.map = (this.chart as any).getModel().getComponent('amap').getAMap();
      this.map.add(new AMap.Buildings(buildingsLayerConfig) as any);
      this.map.add(new AMap.TileLayer.Traffic(trafficLayerConfig) as any);
      this.loadMarkers();
    }

    /**
     * Load custom markers
     */
    private loadMarkers() {
      CityData.markPoints.concat(CityData.markWindows).forEach((point: MarkPoint) => {
        this.addMarker(point);
      });
    }

    /**
     * Log clicked position [for debugging]
     */
    private logPosition() {
      this.map.on('click', (e: any) => {
        // tslint:disable-next-line no-console
        console.log([e.lnglat.lng, e.lnglat.lat].toString());
      });
    }

    /**
     * Add a marker on map
     * @param point
     */
    private addMarker(point: MarkPoint) {
      const markerConfig = Markers.getMarker(point);
      const marker = new AMap.Marker(markerConfig);
      this.map.add(marker);
    }

    /**
     * [Deprecated] Add info window
     * @param position
     * @param content
     */
    private addInfoWindows({ position, content }: MarkPoint) {
      const infoWindow = new AMap.InfoWindow({ isCustom: true, content } as { isCustom: boolean; content: string; });
      infoWindow.open(this.map, position as LngLat2);
    }

    /**
     * Move to next view spot
     */
    private spotMove() {
      const getNextSpot = function*() {
        const total = CityData.markWindows.length;
        let spotIdx = 0;
        while (total) {
          yield CityData.markWindows[spotIdx].position;
          spotIdx = (spotIdx + 1) % total;
        }
      };

      const pos = getNextSpot();
      this.map.zoomIn();
      this.spotInterval = window.setInterval(() => {
        this.map.zoomOut();
        this.map.zoomOut();
        window.setTimeout(() => {
          const ll = pos.next().value;
          if (ll) {
            this.map.panTo(ll as LngLat2);
            window.setTimeout(() => {
              this.map.zoomIn();
              this.map.zoomIn();
            }, 500);
          }
        }, 500);
      }, 5000);
    }
  }
</script>

<style lang="scss" scoped>
  #map_container {
    width: 2560px;
    height: 1080px;
    background: url("../../assets/img/dev-bg.png") no-repeat center;
  }
</style>
