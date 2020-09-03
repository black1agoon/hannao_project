<template>
  <div class="map-layer">
    <div class="door1 pos"></div>
    <div class="door2 pos"></div>
    <div class="door3 pos"></div>
    <div class="door4 pos"></div>
    <door-popup v-for="(door, idx) in doors" :key="'d' + idx" :action="door"></door-popup>
    <person-popup v-for="(person, idx) in persons" :key="'p' + idx" :person="person"></person-popup>
  </div>
</template>

<script>
  import DoorPopup from './DoorPopup'
  import PersonPopup from './PersonPopup'
  import { mapState } from 'vuex'

  export default {
    name: 'MapLayer',
    components: {
      DoorPopup,
      PersonPopup,
    },
    computed: mapState('overviewModule', ['doors', 'persons']),
  }
</script>

<style scoped lang="scss">
  .map-layer {
    left: 580px;
    top: 296px;
    width: 1417px;
    height: 562px;
    background: url("../../assets/img/home/group 399.png") no-repeat center;
  }

  .door1 {
    left: 643px;
    top: 341px;
    width: 79px;
    height: 63px;
    background: url("../../assets/img/home/group 400.png") no-repeat center;
  }

  .door2 {
    left: 609px;
    top: 309px;
    width: 84px;
    height: 45px;
    background: url("../../assets/img/home/maskgroup 72.png") no-repeat center;
  }

  .door3 {
    left: 1118px;
    top: 232px;
    width: 79px;
    height: 63px;
    background: url("../../assets/img/home/group 400.png") no-repeat center;
  }

  .door4 {
    left: 1061px;
    top: 208px;
    width: 93px;
    height: 45px;
    background: url("../../assets/img/home/maskgroup 71.png") no-repeat center;
  }
</style>
