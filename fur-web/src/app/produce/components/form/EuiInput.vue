<template>
  <el-select v-if="type === 'select'"
             :value="getSelectValue(value)"
             :size="size"
             :clearable="clearable"
             :disabled="disabled"
             :multiple="multiple"
             :placeholder="placeholder"
             @change="selectChange"
             @input="selectInput">
    <el-option v-for="(item, index) in options"
               :key="index"
               :label="item.label"
               :value="item.value">
    </el-option>
  </el-select>
  <el-date-picker
      v-else-if="type.startsWith('date') || type === 'year' || type === 'month'"
      :clearable="clearable"
      :value="value"
      align="left"
      :type="type"
      :size="size"
      :value-format="getValueFormat"
      :format="getDateFormat"
      :placeholder="placeholder"
      :disabled="disabled"
      :picker-options="options"
      @change="dateChange"
      @input="dateInput">
  </el-date-picker>
  <el-time-picker
      :size="size"
      v-else-if="type === 'timepicker'"
      :value="getTimePickerValue"
      :value-format="getTimeFormat"
      :format="format || 'HH:mm'"
      :clearable="clearable"
      :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
      placeholder="时间选择"
      @change="timepickChange"
      @input="timeChange">
  </el-time-picker>
  <el-radio-group
      v-else-if="type === 'radio'"
      :value="value"
      @input="ratioChange">
    <el-radio v-for="(item, index) in options"
              :key="index"
              :label="item.value">
      {{item.label}}
    </el-radio>
  </el-radio-group>
  <el-cascader
      v-else-if="type === 'cascader'"
      :value="cascaderList"
      :size="size"
      :options="options"
      :show-all-levels="false"
      @active-item-change="cascaderItemChange"
      @change="cascaderChange">
  </el-cascader>
<!--  <treeselect v-else-if="type === 'treeselect'"-->
<!--              :disabled="disabled"-->
<!--              :value="getSelectValue(value)"-->
<!--              :placeholder="placeholder"-->
<!--              :multiple="multiple"-->
<!--              :options="options"-->
<!--              @close="treeselectClose"-->
<!--              @input="treeselectChange"/>-->
  <el-input v-else
            :type="type"
            :value="value"
            :size="size"
            :disabled="disabled"
            :readonly="readonly"
            :autosize="autosize"
            :clearable="clearable"
            :placeholder="placeholder"
            @blur="blur"
            @clear="clear"
            @change="inputChange"
            @input="inputInput">
    <template v-if="unit" slot="suffix">{{unit}}</template>
    <template v-if="prepend" slot="prepend">{{prepend}}</template>
    <template v-if="appendicon && !isSearch" slot="suffix">
      <i v-if="value" class="icon-suffix-close fa fa-close" @click="clear"></i>
      <i class="icon-suffix fa fa-search" @click="appendClick"></i>
    </template>
    <el-button v-if="appendicon && isSearch" slot="append"
               :icon="appendicon"
               @click="appendClick">
      <!--el-icon-search-->
    </el-button>
    <i v-if="suffixIcon" slot="suffix" :class="['el-input__icon', suffixIcon]" @click="suffixClick"></i>
  </el-input>
</template>

<script>
  // import Treeselect from '@riophae/vue-treeselect'
  // import Treeselect from '@riophae/vue-treeselect/src/components/Treeselect'
  // import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'eui-input',
    components: {
      // Treeselect
    },
    props: {
      value: {},
      type: {
        type: String,
        default: 'text'
      },
      size: {
        type: String,
        default: 'small'
      },
      isSearch: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      prepend: {   // 前缀
        type: String,
        default: ''
      },
      options: {
      },
      suffixIcon: {
        type: String,
        default: null
      },
      placeholder: {
        type: String,
        default: ''
      },
      unit: {
        type: String,
        default: ''
      },
      appendicon: {
        type: String,
        default: ''
      },
      cascaderList: {
        type: Array,
        default: () => []
      },
      autosize: [Boolean, Object],
      cascaderItemChange: Function,
      format: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        date: null,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    computed: {
      datePlaceHolder() {
        if (this.type === 'date') {
          return '选择日期'
        } else if (this.type === 'year') {
          return '选择年度'
        } else {
          return '选择日期时间'
        }
      },
      getDateFormat() {
        if (this.type === 'date') {
          return 'yyyy-MM-dd'
        } else if (this.type === 'year') {
          return 'yyyy'
        } else {
          return 'yyyy-MM-dd HH:mm:ss'
        }
      },
      getValueFormat() {
        // return 'yyyy-MM-dd HH:mm:ss'
        if (this.type === 'date') {
          return 'yyyy-MM-dd'
        } else if (this.type === 'year') {
          return 'yyyy'
        } else {
          return 'yyyy-MM-dd HH:mm:ss'
        }
      },
      getTimeFormat() {
        return 'HH:mm:ss'
      },
      getTimePickerValue() {
        return this.value ? new Date(`1970-01-01 ${this.value}`) : null
      }
    },
    methods: {
      clear() {
        this.$emit('clear')
      },
      blur() {
        this.$emit('blur')
      },
      inputChange(val) {
        this.$emit('change', val)
      },
      inputInput(val) {
        this.$emit('input', val)
      },
      selectInput(val) {
        this.$emit('input', val)
      },
      selectChange(val) {
        this.$emit('change', val)
      },
      treeselectChange(val) {
        this.$emit('input', this.multiple ? val.join(',') : val)
        this.$emit('change', this.multiple ? val.join(',') : val)
      },
      dateInput(val) {
        this.$emit('input', val)
      },
      dateChange(val) {
        this.$emit('change', val)
      },
      timeChange(val) {
        this.$emit('input', val)
      },
      timepickChange(val) {
        this.$emit('change', val)
      },
      ratioChange(val) {
        this.$emit('input', val)
      },
      cascaderChange(val) {
        this.$emit('input', val[val.length - 1])
        this.$emit('update:cascaderList', val)
      },
      suffixClick() {
        !this.disabled && this.$emit('suffixClick')
      },
      appendClick() {
        if (this.disabled) {
          return
        }
        this.$emit('appendClick')
      },
      getSelectValue(value) {
        if (this.multiple) {
          // return value ? value.split(',') : []
          return value ? value : []
        } else {
          return value
        }
      },
      treeselectClose(value) {
        if (value === undefined) {
          const parent = this.$parent
          parent.$emit.call(parent, ...['el.form.change'].concat([value]))
        }
      },
      treeselectBlur(value) {
        const parent = this.$parent
        parent.$emit.call(parent, ...['el.form.change'].concat([value]))
      }
    },
    mounted() {
      //
    },
    watch: {
      'value'() {
        if (this.type === 'treeselect' && !this.disabled) {
          this.treeselectBlur(this.value)
        }
      }
    }
  }
</script>
<style lang="sass" scoped>
  .el-input__icon
    cursor: pointer

  .el-select
    width: 100%

  .el-date-editor
    width: 100% !important

  .el-select
    ::v-deep
      .el-select__tags
        white-space: nowrap
        overflow: hidden
      .el-tag
        background-color: #e3f2fd
        color: #039be5
        .el-icon-close
          border-radius: 0
          color: #039be5
          background-color: #e3f2fd
          font-size: 14px
          font-weight: bold
          &:hover
            color: #c53935
            background-color: #e3f2fd
  .icon-suffix
    display: inline-block
    padding: 12px 5px
    cursor: pointer
  .el-input:hover
    .icon-suffix-close
      display: inline-block
  .icon-suffix-close
    display: none
    cursor: pointer
</style>
<style lang="sass" scoped>

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance: none !important
    margin: 0
  .el-textarea__inner
    font: 400 13.3333px Arial

  .el-cascader--mini
    line-height: 40px

  .el-scrollbar__bar.is-horizontal
    overflow: auto !important

  .is-success // el-form中验证成功后绿色变无
    .el-input__inner
      border: 1px solid #dcdfe6 !important
    .el-form-item.is-success
      .el-textarea__inner
        border: 1px solid #dcdfe6 !important

  .el-form-item.is-error
    .vue-treeselect__control
      border-color: #f56c6c
      &:hover
        border-color: #f56c6c !important

  .vue-treeselect--disabled
    .vue-treeselect__control
      background: rgb(245, 247, 250)
      cursor: not-allowed
      .vue-treeselect__single-value
        color: #c0c4cc

  /*.el-input__suffix*/
  /*  line-height: 28px*/
  /*  color: #606266 !important*/

  .vue-treeselect__control
    height: 28px !important
    line-height: 26px
    .vue-treeselect__single-value, .vue-treeselect__placeholder
      line-height: 26px
  .el-input-group--append
    margin-top: 5px
</style>
