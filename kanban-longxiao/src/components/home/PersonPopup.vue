<template>
  <div class="person-popup pos" :class="status" :style="posStyles">
    <div v-if="person.status" class="msg pos">{{ person.msg }}</div>
    <div class="photo pos" :style="photoStyles"></div>
    <div class="name pos">{{ person.name }}</div>
    <div class="title pos">{{ person.title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'PersonPopup',
    props: {
      person: {
        default: () => ({}),
      },
    },
    computed: {
      status () {
        return this.person.status && 'warning'
      },
      photoStyles () {
        return this.person.photo ? { backgroundImage: 'url(' + this.person.photo + ')' } : null
      },
      posStyles () {
        return {
          left: (this.person.position[0] || 0) + 'px',
          top: (this.person.position[1] || 0) + 'px',
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .person-popup {
    width: 64px;
    height: 117px;
    background: url("../../assets/img/home/group 463.png") no-repeat center;
    transform: translate(-50%, -100%);
    color: #00FFF5;

    .photo {
      bottom: 61px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 36px;
      height: 45px;
      background: url("../../assets/img/home/default-avatar.png") no-repeat center;
      background-size: cover;
    }

    .name {
      font-size: 10px;
      bottom: 46px;
      left: 0;
      right: 0;
    }

    .title {
      font-size: 8px;
      bottom: 34px;
      left: 0;
      right: 0;
    }

    &.warning {
      height: 137px;
      background: url("../../assets/img/home/group 464.png") no-repeat center;

      .msg {
        top: 4px;
        left: 0;
        right: 0;
        font-size: 11px;
        color: #FF9A9A;
        text-shadow: #FF3355 0 0 6px;
      }

      color: #FFCCCC;
      font-size: 10px;
    }
  }
</style>
