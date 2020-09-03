<template>
  <div id="map_container_demo"></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import mapConfig from '@/config/map-config';
  import Markers from '@/config/markers';
  import CityData from '@/demo/city-data';
  import { MarkPoint } from '@/types/interfaces';
  import echarts from 'echarts/lib/echarts';
  import 'echarts-extension-amap';
  import EChartOption = echarts.EChartOption;

  @Component
  export default class DemoMapLayer extends Vue {
    private chart!: echarts.ECharts;
    private map!: AMap.Map;
    private spotInterval!: number;
    private buildingLayer: any;

    private markers: any[] = [];
    private areas: any[] = [];

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

    private drawArea() {
      let idx = 0;
      let areaPath: any[] = [];
      this.map.on('click', (e: any) => {
        const pos: [number, number] = [e.lnglat.lng, e.lnglat.lat];
        const marker = new AMap.Marker({ position: pos });
        this.map.add(marker);
        this.markers.push(marker);
        areaPath.push(pos);
      });
      this.map.on('contextmenu', (e: any) => {
        if (areaPath && areaPath.length > 2) {

          const centerPoint = areaPath.reduce((r, p) => [r[0] + p[0], r[1] + p[1]], [0, 0])
            .map((x: number) => +(x / areaPath.length).toFixed(5));
          const styl = 'width: 20px; height: 20px; border-radius: 50%; line-height: 20px; background: red;';
          const markerIcon = `<div style="${styl}">${idx}</div>`;
          this.map.add(new AMap.Marker({ position: centerPoint, content: markerIcon }));

          this.areas.push({ id: idx, path: areaPath });
          const options = {
            areas: this.areas.map((ap) => ({
              color1: 'aa00ff00', // 楼顶颜色
              color2: 'aa00ff00', // 楼面颜色
              path: ap.path,
            })),
          };
          // tslint:disable-next-line no-console
          console.log(this.areas);

          this.buildingLayer.setStyle(options);
          this.markers.forEach((marker) => {
            this.map.remove(marker);
          });

          idx += 1;
          areaPath = [];
        }
      });
    }

    /**
     * Initialize amap with echarts
     */
    private initChart() {
      this.chart = echarts.init(this.$el as HTMLDivElement);
      this.chart.setOption({
        amap: mapConfig,
      } as EChartOption);
      this.map = (this.chart as any).getModel().getComponent('amap').getAMap();
      this.buildingLayer = new AMap.Buildings({ heightFactor: 1, merge: false, zooms: [14, 18], zIndex: 10 });
      this.map.add(this.buildingLayer);
      this.drawArea();
    }

    /**
     * Log clicked position [for Debugging]
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
      const infoWindow = new AMap.InfoWindow({ isCustom: true, content } as { isCustom: boolean, content: string });
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
  #map_container_demo {
    width: 2560px;
    height: 1080px;
  }
</style>
