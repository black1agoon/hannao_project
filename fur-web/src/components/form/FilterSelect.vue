<template>
  <el-select :value="value" @change="onChange" :size="size" :remote="isRemote" :remote-method="remoteMethod"
             :filterable="true" clearable @clear="remoteMethod()" reserve-keyword @blur="resetOptions">
    <el-option v-for="(op, idx) in resultOptions" :key="idx" :value="op.value" :label="op.label">
      {{ op.label }}
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'FilterSelect',

  props: {
    value: {},
    size: {
      default: 'small',
    },
    options: {
      default: () => [],
    },
    remote: {
      default: false,
    },
    loader: {},
  },

  data () {
    return {
      remoteOptions: null,
      cacheOptions: null,
    }
  },

  computed: {
    resultOptions () {
      return this.isRemote && this.remoteOptions || this.cacheOptions || this.options || []
    },
    isRemote () {
      return this.remote || Boolean(this.loader)
    },
  },

  methods: {
    onChange (val) {
      this.$emit('input', val)
      this.$emit('change', this.resultOptions.find(op => op.value === val))
    },
    remoteMethod (q = '') {
      this.loader(q).then(data => {
        this.remoteOptions = data
        if (!q) {
          this.cacheOptions = data
        }
      })
    },
    resetOptions () {
      this.remoteOptions = null
    },
  },

  mounted () {
    this.remoteMethod('')
  },
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>