<template>
  <status-box :title="title">
    <div class="camera-grid" :style="gridStyles">
      <div class="camera-cell" v-for="n in 4" :key="n">
        <!--<span class="cell-index">{{ n }}</span>-->
        <video autoplay muted :id="'camera_' + n"></video>
      </div>
    </div>
  </status-box>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import StatusBox from './StatusBox.vue';
  import Hls from 'hls.js';
  import CityData, { cameraShot } from '@/demo/city-data';

  @Component({
    components: {
      StatusBox,
    },
  })
  export default class CameraBox extends Vue {
    public title: string = '智慧监控';

    public mounted() {
      this.playVideo();
    }

    public get gridStyles() {
      return {
        background: `url(${cameraShot}) no-repeat center`,
      };
    }

    private playVideo() {
      CityData.videoUrls.slice(0, 4).forEach((url, idx) => {
        const video = document.getElementById('camera_' + (idx + 1)) as HTMLVideoElement;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);
        }
      });
    }
  }
</script>

<style scoped lang="scss">
  $dash-border: 1px dashed rgba(128, 128, 128, 0.68);
  .camera-grid {
    height: calc(100% - 8px);
    margin-top: 8px;
    border-top: $dash-border;
    border-left: $dash-border;

    .camera-cell {
      border-right: $dash-border;
      border-bottom: $dash-border;
      width: 50%;
      height: 50%;
      float: left;
      overflow: hidden;
      position: relative;

      .cell-index {
        position: absolute;
        top: 10px;
        left: 10px;
        text-shadow: 1px 1px 1px #00000088;
      }

      video {
        height: 100%;
      }
    }
  }
</style>
