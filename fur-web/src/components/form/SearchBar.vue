<template>
  <el-form class="search-bar" :model="searchModel" inline>
    <el-form-item v-for="field in searchFields" :key="field.name" :prop="field.name" :label="field.label"
                  :style="field.itemStyles">
      <el-select v-if="field.type === 'select'" class="search-input" v-model="searchModel[field.name]" size="small">
        <el-option v-for="(op, idx) in selectOptions[field.name]" :key="idx" :value="op.value" :label="op.label">
          {{ op.label }}
        </el-option>
      </el-select>
      <el-input v-else size="small" class="search-input" :placeholder="field.placeholder || $t('common.pleaseInput')"
                clearable :style="field.styles" v-model="searchModel[field.name]"
                @keyup.native.enter="search">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" icon="el-icon-search" @click="search">{{ $t('common.query') }}</el-button>
      <el-button size="small" @click="reset">{{ $t('common.reset') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { createEmptyFormData } from '@/helpers/FormHelper'

export default {
  name: 'SearchBar',

  props: {
    searchFields: {
      required: true,
    },
    inputOptions: {},
  },

  computed: {
    selectOptions () {
      return Object.assign({}, ...this.searchFields.filter(field => field.type === 'select')
          .map(field => ({ [field.name]: this.inputOptions?.[field.name] || field.options || [] })))
    },
  },

  data () {
    return {
      searchModel: createEmptyFormData(this.searchFields),
    }
  },

  methods: {
    search () {
      this.$emit('search', this.searchModel)
    },
    reset () {
      this.searchModel = createEmptyFormData(this.searchFields)
      this.search({})
    },
  },
}
</script>

<style scoped lang="scss">
.search-bar {
  padding: 0 10px;
}

.search-input {
  margin-right: 16px;
  width: 160px;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>