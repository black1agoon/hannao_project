<template>
  <div class="widget combo-box highlight-color"
       :class="{ 'combo-box-s': type === 's' }">
    <div class="combo-content" @click="togglePanel">
      <div class="combo-label">{{ currentLabel || '无' }}</div>
      <div class="combo-arrow"></div>
    </div>
    <div class="combo-panel" v-if="panelOpened && dataOptions && dataOptions.length">
      <div class="combo-item"
           v-for="option in dataOptions" :key="option.label"
           @click="onSelect(option)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ComboBox',

    props: {
      value: {},
      options: {
        type: Array,
        default: () => [],
      },
      type: String,
    },

    data () {
      return {
        panelOpened: false,
      }
    },

    computed: {
      dataOptions () {
        return this.options
      },

      currentLabel () {
        if (this.dataOptions) {
          const currentOption = this.dataOptions.find((option) => option.value === this.value)
          return currentOption ? currentOption.label : ''
        }
        return ''
      },
    },

    methods: {
      onSelect (option) {
        this.$emit('input', option.value, this.value, option)
        this.closePanel()
      },
      togglePanel () {
        if (this.panelOpened) {
          this.closePanel()
        } else {
          this.openPanel()
        }
      },
      openPanel () {
        this.panelOpened = true
      },
      closePanel () {
        this.panelOpened = false
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .combo-box {
    display: inline-block;
    border: 1px aqua solid;
    border-radius: 4px;
    box-shadow: 0 0 2px 0 aqua;
    overflow: visible;
    z-index: 2;

    &.combo-box-s {
      font-weight: bold;
      border: 2px #004CE6 solid;
      border-radius: 0;
      background: #0D007F;
      box-shadow: none;
    }
  }

  .combo-content {
    position: relative;
    padding: 2px 28px 4px 8px;
  }

  .combo-box-s .combo-panel {
    border: 2px #004CE6 solid;
    background: #0D007f;
  }

  .combo-panel {
    width: 100%;
    position: absolute;
    border: 1px aqua solid;
    background: #032a8f;

    .combo-item {
      padding: 4px;
      border-bottom: 1px darkcyan dotted;

      &:hover {
        background: rgba(165, 189, 189, 0.25);
      }
    }
  }

  .combo-content,
  .combo-item {
    cursor: pointer;
    user-select: none;
  }

  .combo-arrow {
    position: absolute;
    top: 50%;
    right: 8px;
    border-top: 6px solid aqua;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    transform: translateY(-50%);
  }
</style>
