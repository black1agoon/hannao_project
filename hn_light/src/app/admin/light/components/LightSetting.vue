<template>
  <div class="light-box">
    <div class="light-wrap">
      <div :class="['pic', getTypeClass]"></div>
      <div class="lights">
        <div class="big-lamp">
          <div class="lamp"></div>
          <div class="name">大灯</div>
          <switch-on-off
              @trigger="trigger"
              v-model="value.bigStatus">
          </switch-on-off>
          <check-box
              @change="changeBig"
              class="lamp-check"
              v-model="value.bigCheck">
          </check-box>
        </div>
        <move-bar class="move-bar" v-model="value.bigIntensity"
                  @trigger="trigger">
        </move-bar>
        <div class="small-lamp">
          <div class="lamp"></div>
          <div class="name">小灯</div>
          <switch-on-off
              @trigger="trigger"
              v-model="value.smallStatus">
          </switch-on-off>
          <check-box
              @change="changeSmall"
              class="lamp-check"
              v-model="value.smallCheck">
          </check-box>
        </div>
        <move-bar v-model="value.smallIntensity"
                  @trigger="trigger">
        </move-bar>
      </div>
      <check-box
          @change="changeAll"
          class="master-switch"
          v-model="value.allCheck">
      </check-box>
      <div @click="deleteLight" class="delete fa fa-close"></div>
    </div>
    <div class="light-name">
      {{value.name}}
    </div>
  </div>
</template>

<script>
  import CheckBox from './CheckBox'
  import SwitchOnOff from './SwitchOnOff'
  import MoveBar from './MoveBar'
  export default {
    name: 'light-setting',
    components: {
      CheckBox,
      SwitchOnOff,
      MoveBar
    },
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      getTypeClass() {
        if (this.value.bigStatus === '1' && this.value.smallStatus === '1') {
          return 'type1'
        } else if (this.value.bigStatus === '1' && this.value.smallStatus === '0') {
          return 'type2'
        } else if (this.value.bigStatus === '0' && this.value.smallStatus === '1') {
          return 'type3'
        } else {
          return 'type4'
        }
      }
    },
    data() {
      return {
      }
    },
    methods: {
      changeAll(val) {
        this.value.bigCheck = val
        this.value.smallCheck = val
      },
      changeBig(val) {
        if (val === 1 && this.value.smallCheck) {
          this.value.allCheck = 1
        } else {
          this.value.allCheck = 0
        }
      },
      changeSmall(val) {
        if (val === 1 && this.value.bigCheck) {
          this.value.allCheck = 1
        } else {
          this.value.allCheck = 0
        }
      },
      trigger() {
        this.$emit('singleTrigger', this.value.id)
      },
      deleteLight() {
        this.$emit('deleteLight', this.value)
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.light-box
  width: 220px
  height: 180px
  margin: 10px 8px
  .light-wrap
    width: 220px
    height: 160px
    border: 1px solid rgba(63, 66, 69, 1)
    position: relative
    display: flex
    &:hover
      .delete
        display: block
    .pic
      flex: 0 0 50px
      height: 124px
      margin: 18px 15px 18px 6px
      background-size: 50px 124px
      background-repeat: no-repeat
      &.type1
        background-image: url("../../../../assets/img/light1.png")
      &.type2
        background-image: url("../../../../assets/img/light2.png")
      &.type3
        background-image: url("../../../../assets/img/light3.png")
      &.type4
        background-image: url("../../../../assets/img/light4.png")
    .lights
      flex: 1
      .big-lamp, .small-lamp
        display: flex
        margin-top: 20px
        .lamp
          width: 10px
          height: 13px
          margin: 3px 5px 0 0
          background-image: url("../../../../assets/img/lamp.png")
          background-size: 10px 13px
          background-repeat: no-repeat
        .name
          width: 30px
          font-size: 14px
          color: #000
          line-height: 20px
          margin-right: 7px
        .lamp-check
          margin-left: 8px
      .move-bar
        margin-top: 10px
    .master-switch
      position: absolute
      bottom: 0
      right: 0
    .delete
      position: absolute
      top: 0
      right: 0
      display: none
      cursor: pointer
  .light-name
    font-size: 14px
    color: #000
    text-align: center
    padding-top: 8px
</style>