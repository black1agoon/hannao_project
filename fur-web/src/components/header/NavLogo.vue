<template>
  <div class="nav-logo">
    <div class="navbar-icon-wrapper" :style="{ width: collapsed ? '64px' : '200px' }">
      <span @click="goHome" :class="['navbar-icon', {collapsed}]"></span>
    </div>
    <div class="toggle-icon" @click="toggleMenu" :title="$t('app.nav.toggle')">
      <el-icon name="s-fold" :class="{'rotate': collapsed}"></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';

  export default Vue.extend({
    name: 'NavLogo',
    computed: mapState('menus', ['collapsed']),
    methods: {
      goHome() {
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      },
      toggleMenu() {
        this.$store.dispatch('menus/toggle');
      },
    },
  });
</script>

<style lang="scss" scoped>
  .navbar-icon-wrapper {
    float: left;
    width: 200px;
    height: 40px;
    text-align: center;
    transition: width 0.5s;

    .navbar-icon {
      transition: all 0.2s;
      display: inline-block;
      width: 200px;
      height: 100%;
      cursor: pointer;
      background-image: url("../../assets/img/hn1.png");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;

      &.collapsed {
        width: 64px;
        background-image: url("../../assets/img/hn2.png");
        background-size: 36px 36px;
      }
    }
  }

  .toggle-icon {
    float: left;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffffff;

    i {
      font-size: 20px;
      transition: all .3s;
    }

    &:hover {
      background: #fff3;
    }

    .rotate {
      transform: rotate(180deg);
    }
  }
</style>
