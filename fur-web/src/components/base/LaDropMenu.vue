<template>
  <el-dropdown class="la-drop-menu" :hide-timeout="hideTimeout" @command="change">
    <slot>
      <span class="la-drop-menu--text">
        {{ currentText }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </slot>
    <el-dropdown-menu slot="dropdown" :style="dropdownStyles">
      <el-dropdown-item v-for="(item, idx) in translatedItemList" :key="idx"
                        :divided="item.divided" :disabled="item.disabled"
                        :icon="item.icon" :command="item.value">
        {{ item.text }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="tsx">
  import Vue from 'vue';
  import { AnyObject } from '@/types';
  import LaBase from '@/components/base/LaBase';

  interface MenuItem {
    text: string;
    value: string | number;
    divided?: boolean;
    disabled?: boolean;
    icon?: string;
    i18n?: boolean;
  }

  interface MenuItemConfig {
    name?: string;
    divided?: boolean;
    disabled?: boolean;
    icon?: string;
    i18n?: boolean;
  }

  export default Vue.extend({
    name: 'LaDropMenu',
    mixins: [LaBase],
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      items: {
        type: [Array, Object],
        default: () => [],
      },
      hideTimeout: {
        type: Number,
        default: 300,
      },
      textField: {
        type: String,
        default: 'text',
      },
      valueField: {
        type: String,
        default: 'value',
      },
      dropdownStyles: {
        type: [Object, String],
      },
    },
    computed: {
      itemList(): Array<MenuItem> {
        if (!Array.isArray(this.items) && typeof this.items === 'object') {
          return Object.entries(this.items as AnyObject).map(([value, text]) => {
            if (typeof text === 'object') {
              const itemConfig = text as MenuItemConfig;
              return {
                value,
                text: itemConfig.name || value,
                divided: itemConfig.divided,
                disabled: itemConfig.disabled,
                icon: itemConfig.icon,
                i18n: itemConfig.i18n,
              };
            }
            return { text, value };
          });
        }
        if (typeof this.items[0] === 'string') {
          return (this.items as Array<string>).map(item => ({ text: item, value: item }));
        }
        if (!this.items.length || (this.textField === 'text' && this.valueField === 'value')) {
          return this.items as Array<MenuItem>;
        }
        return (this.items as Array<AnyObject>).map(item => ({
          text: item[this.textField],
          value: item[this.valueField],
        }));
      },
      translatedItemList(): Array<MenuItem> {
        return (this as AnyObject).i18n
          ? this.itemList.map(item => ({
            text: item.i18n !== false ? (this as AnyObject).translate(item.text) : item.text,
            value: item.value,
            divided: item.divided,
            disabled: item.disabled,
            icon: item.icon,
          }))
          : this.itemList;
      },
      currentText(): string {
        return this.translatedItemList.find(item => item.value === this.value)?.text || '';
      },
    },
    methods: {
      change(value: string) {
        this.$emit('input', value);
      },
    },
  });
</script>

<style scoped>
  .la-drop-menu--text {
    cursor: pointer;
  }
</style>
