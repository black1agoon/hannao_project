<template>
  <input ref="fileInput" type="file" v-show="display" @change="handleFile">
</template>

<script>
import { Messenger } from '@/helpers/Messenger'

export default {
  name: 'FileInput',
  props: {
    confirm: {
      type: [Boolean, String],
      default: false,
    },
    display: {
      default: true,
    },
  },
  data () {
    return {
      resolve: null,
    }
  },
  methods: {
    select () {
      this.$refs.fileInput.click()
      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },
    handleFile ({ target }) {
      const file = target.files[0]
      if (this.confirm) {
        Messenger.confirm(file.name, typeof this.confirm === 'string' ? this.confirm : '上传').then(() => {
          this.$emit('input', file)
          this.resolve(file)
        }).catch(() => {
          this.$emit('input', null)
          this.$refs.fileInput.value = ''
        })
      } else {
        this.$emit('input', file)
        this.resolve(file)
      }
    },
  },
}
</script>

<style scoped>

</style>