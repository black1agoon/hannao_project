<template>
  <div class="btn-wrapper">
    <div class="input-wrapper" v-for="(btn, index) in buttons" :key="index">
      <slot name="prev"></slot>
      <el-input v-if="btn.btnKey === 'btnSingleSearch'"
                :placeholder="btn.memo"
                v-model="searchword"
                class="input-with-select searchbox"
                :clearable="true"
                @clear="onBtnClick(btn.btnKey+'Clear')">
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="onBtnClick(btn.btnKey, searchword)">
        </el-button>
      </el-input>
      <el-button
        v-else
        :type="btnType(btn).type"
        :size="btnType(btn).size"
        @click="onBtnClick(btn.btnKey)">
        <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
      </el-button>
    </div>
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'MainToolbar',
    components: {
    },
    props: {
      buttons: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        searchword: null
      }
    },
    methods: {
      onBtnClick (btnKey, data) {
        this.$emit('click', btnKey, data)
      },
      btnType(btn) {
        if (btn.btnKey.indexOf('Add') !== -1) {
          return {
            size: 'mini',
            type: 'primary'
          }
        } else {
          return {
            btnAdd: {
              size: 'mini',
              type: 'primary'
            },
            btnEdit: {
              size: 'mini',
              type: 'primary'
            },
            btnDelete: {
              size: 'mini',
              type: 'primary'
            },
            btnDefault: {
              size: 'mini',
              type: 'primary'
            },
            btnSubAdd: {
              size: 'mini',
              type: 'primary'
            },
            btnSubEdit: {
              size: 'mini',
              type: 'primary'
            },
            btnSubDelete: {
              size: 'mini',
              type: 'primary'
            }
          }[btn.btnKey] || {
            size: 'mini',
            type: 'default'
          }
        }
      }
    },
    mounted() {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-wrapper
    padding-left: 10px
    white-space: nowrap
    .input-wrapper
      display: inline-block
      margin-right: 10px
      /deep/ .el-input__inner
        height: 28px
    .el-button--mini, .el-button--mini.is-round
      padding: 7px 12px
    .btn-icon
      padding-right: 5px
</style>

