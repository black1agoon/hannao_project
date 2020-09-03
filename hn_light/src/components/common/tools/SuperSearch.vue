<template>
  <el-popover
      class="super-search"
      placement="bottom"
      :width="defaultOptions.width"
      trigger="click">
    <div class="title">分字段搜索</div>
    <el-form class="form clearfix" ref="form">
      <el-col :sm="data.sm || 6" v-for="(data, index) in defaultOptions.fieldSearch" :key="index">
        <eui-input size="mini"
                   v-model="searchinfo[data.value]"
                   :type="data.type"
                   :placeholder="data.placeholder"
                   @change="(val) => {inputChange(data.value, val)}">
        </eui-input>
      </el-col>
    </el-form>
    <div class="title" v-if="defaultOptions.conditionSearch.length > 0">条件筛选</div>
    <el-form class="form clearfix" ref="form" v-if="defaultOptions.conditionSearch.length > 0">
      <el-col :sm="data.sm || 6" v-for="(data, index) in defaultOptions.conditionSearch" :key="index">
        <eui-input size="mini"
                   v-model="searchinfo[data.value]"
                   :type="data.type"
                   :placeholder="data.placeholder"
                   :options="data.options"
                   @change="(val) => {inputChange(data.value, val)}">
        </eui-input>
      </el-col>
    </el-form>
    <el-button class="button" type="primary" size="mini" @click="search">搜索</el-button>
    <el-button class="button" @click="reset" size="mini">重置</el-button>
    <el-button slot="reference" type="text" size="mini">
      <i class="fa fa-search icon"></i>高级搜索
    </el-button>
  </el-popover>
</template>

<script>
  import EuiInput from '@/components/common/form/EuiInput'
  import helper from '@/app/app.helpers'
  export default {
    name: 'super-search',
    components: {
      EuiInput
    },
    props: {
      options: {
        type: Object,
        default: () => ({})
      },
      forminfo: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      defaultOptions() {
        return Object.assign({}, this.options)
      },
      tags() {
        return this.options.fieldSearch.map(f => ({
          label: f.placeholder,
          name: f.value,
          value: null
        })).concat(this.options.conditionSearch.map(f => ({
          label: f.placeholder,
          name: f.value,
          value: null,
          type: f.type
        })))
      }
    },
    data() {
      return {
        helper,
        searchinfo: {}
      }
    },
    methods: {
      search() {
        this.$emit('superSearch', this.searchinfo)
      },
      reset() {
        this.searchinfo = {}
        this.tags.forEach(tag => {
          tag.value = null
        })
        this.$emit('superSearch', this.searchinfo)
        this.$emit('tagsChange', [])
      },
      inputChange(key, val) {
        let tag = this.tags.find(tag => tag.name === key)
        if (tag.type === 'select') { // 根据select选中值 查找中文
          tag.value = this.findSelectCnValue(key, this.searchinfo[key].trim())
        } else if (tag.type === 'treeselect') { // 根据treeselect选中值 查找中文
          if (this.searchinfo[key] === undefined) { // 如果按了 清空x，数据也会变
            tag.value = null
          } else {
            tag.value = this.findTreeCnValue(key, this.searchinfo[key])
          }
        } else {
          tag.value = this.searchinfo[key].trim()
        }
        this.$emit('tagsChange', this.tags.filter(t => t.value))
      },
      emptyValue(key) {
        this.searchinfo[key] = null
        this.tags.find(tag => tag.name === key).value = null
        this.$emit('superSearch', this.searchinfo)
      },
      findSelectCnValue(key, val) {
        let options = this.defaultOptions.conditionSearch.find(cond => cond.value === key).options
        return options.find(op => op.value === val).label
      },
      findTreeCnValue(key, val) {
        let options = this.defaultOptions.conditionSearch.find(cond => cond.value === key).options
        return helper.getTreeNode(options, val, 'children').label
      }
    },
    watch: {
      'forminfo'() {
        this.searchinfo = this.forminfo
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .icon
    margin-right: 5px

  .title
    margin-bottom: 10px

  .el-form
    width: 100%
    .el-input, .el-select, .el-date-editor
      width: auto !important
      margin-right: 15px
      box-sizing: border-box
      margin-bottom: 10px
      &:nth-of-type(4n)
        margin-right: 0
/deep/.vue-treeselect
        margin-right: 15px
        margin-bottom: 10px
        .vue-treeselect__control
          height: 28px !important
          font-size: 12px
          .vue-treeselect__single-value, .vue-treeselect__placeholder
            line-height: 26px
</style>