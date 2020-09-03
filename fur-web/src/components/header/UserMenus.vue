<template>
  <div class="user-menus">
    <la-drop-menu :items="userSubMenus" i18n="app.user.menus" dropdown-styles="min-width: 120px;"
                  @input="handleSubMenuClick">
      <span class="nav-icon">
        <el-icon name="user-solid"></el-icon>
      </span>
    </la-drop-menu>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import LaDropMenu from '../base/LaDropMenu.vue';
  import QuickSettings from '../panel/QuickSettings.vue';
  import { translates } from '@/lang/i18n';

  export default Vue.extend({
    name: 'UserMenus',

    components: {
      LaDropMenu,
    },

    computed: {
      userSubMenus() {
        return {
          name: {
            name: '@' + this.$store.state.user.name,
            i18n: false,
            disabled: true,
          },
          settings: {},
          logout: {
            divided: true,
          },
        };
      },

    },

    methods: {
      openSettingsPanel() {
        this.$store.commit('quick/open', {
          title: translates('app.settings.title'),
          content: QuickSettings,
        });
      },
      handleSubMenuClick(menuName: string) {
        switch (menuName) {
          case 'settings':
            this.openSettingsPanel();
            break;
          case 'logout':
            this.logout();
            break;
        }
      },
      logout() {
        this.$store.dispatch('user/logout');
      },
    },
  });
</script>

<style lang="scss" scoped>
  .user-menus {
    display: inline-block;
    float: right;
    line-height: 40px;

    .nav-icon {
      text-align: center;
      width: 40px;
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      color: white;

      &:hover {
        background-color: #fff3;
      }
    }
  }
</style>
