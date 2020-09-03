<template>
  <div class="light-box">
    <div class="light-wrap">
      <div :class="['pic', getTypeClass]"></div>
      <div class="lights">
        <div class="big-lamp">
          <div class="lamp"></div>
          <div class="name">大灯</div>
          <move-bar v-model="value.bigPeriodIntensity"
                    @trigger="trigger">
          </move-bar>
        </div>
        <el-switch class="switch"
                   v-model="value.bigPeriodStatus"
                   active-text="启用"
                   @change="trigger"
                   inactive-text="禁用"
                   :active-value="1"
                   :inactive-value="0">
        </el-switch>
        <div class="small-lamp">
          <div class="lamp"></div>
          <div class="name">小灯</div>
          <move-bar v-model="value.smallPeriodIntensity"
                    @trigger="trigger">
          </move-bar>
        </div>
        <el-switch class="switch"
                   v-model="value.smallPeriodStatus"
                   @change="trigger"
                   active-text="启用"
                   inactive-text="禁用"
                   :active-value="1"
                   :inactive-value="0">
        </el-switch>
      </div>
      <check-box
          v-model="value.allCheck"
          ref="check"
          class="master-switch">
      </check-box>
      <div v-show="deleteAble" @click="deleteLight" class="delete fa fa-close"></div>
    </div>
    <div class="light-name">
      {{value.name}}
    </div>
  </div>
</template>

<script>
  import CheckBox from './../CheckBox'
  import MoveBar from './../MoveBar'
  export default {
    name: 'light-select',
    components: {
      CheckBox,
      MoveBar
    },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      deleteAble: {
        type: Boolean,
        default: true
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
        value1: 1
      }
    },
    methods: {
      deleteLight() {
        this.$emit('deleteLight', this.value)
      },
      trigger() {
        this.$emit('singleTrigger', this.value.id)
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
          background-image: url("../../../../../assets/img/light1.png")
        &.type2
          background-image: url("../../../../../assets/img/light2.png")
        &.type3
          background-image: url("../../../../../assets/img/light3.png")
        &.type4
          background-image: url("../../../../../assets/img/light4.png")
      .lights
        flex: 1
        .big-lamp, .small-lamp
          display: flex
          margin-top: 20px
          .lamp
            width: 10px
            height: 13px
            margin: 3px 5px 0 0
            background-image: url("../../../../../assets/img/lamp.png")
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
        .switch
          margin-top: 5px
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