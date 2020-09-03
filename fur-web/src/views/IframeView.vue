<template>
  <div ref="framesContainer" class="frames">
    <iframe v-for="frame in frames" :key="frame.name"
            v-show="frame === current"
            :src="frame.url">
    </iframe>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';

  interface FrameConfig {
    name: string;
    path: string;
    html?: string;
  }

  export default Vue.extend({
    name: 'IframeView',
    data() {
      return {
        currentFrame: '',
      };
    },
    computed: mapState('router', ['frames', 'current']),
    methods: {
      add(frame: FrameConfig) {
        this.frames.push(frame);
        this.currentFrame = frame.name;
        this.$store.dispatch('router/active', frame);
      },
      remove(idx: number) {
        this.frames.splice(idx, 1);
      },
    },
  });
</script>

<style scoped lang="scss">
  .frames {
    position: relative;
    height: 100%;
    width: 100%;

    iframe {
      height: 100%;
      width: 100%;
      border: none;
    }
  }
</style>
