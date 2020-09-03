<template>
  <div>
    <div class="setting-item">
      <label>{{ $t('app.settings.theme') }}</label>
      <la-drop-menu :items="themes" :value="theme" @input="changeTheme" i18n="app.theme"></la-drop-menu>
    </div>

    <div class="setting-item">
      <label>{{ $t('app.settings.language') }}</label>
      <la-drop-menu :items="languages" :value="lang" @input="changeLocale"></la-drop-menu>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import LaDropMenu from '@/components/base/LaDropMenu.vue';
  import config from '@/config';
  import { languages } from '@/lang';
  import { mapState } from 'vuex';

  export default Vue.extend({
    name: 'QuickSettings',

    components: {
      LaDropMenu,
    },

    data() {
      return {
        languages,
        themes: config.themes,
      };
    },

    computed: {
      ...mapState('settings', ['lang', 'theme']),
    },

    methods: {
      changeLocale(locale: string) {
        this.$store.commit('settings/setLang', locale);
        this.$i18n.locale = locale;
      },
      changeTheme(theme: string) {
        this.$store.commit('settings/setTheme', theme);
      },
    },

    mounted(): void {
      this.changeTheme(this.theme);
    },
  });
</script>

<style lang="scss">
  @import "../../theme/index";

  .setting-item {
    width: 100%;
    margin: 20px;
    text-align: left;

    label {
      display: inline-block;
      width: 50%;
    }
  }

  .la-drop-menu {

    &:hover {
      @include theme-prop('color', 'color-primary');
    }
  }

</style>
