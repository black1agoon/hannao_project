<template>
  <div class="quick-chat">
    <div class="message-list">
      <div class="message-line" v-for="(msg, idx) in messages" :key="idx" :class="{ 'my-line': msg.me }">
        <div class="message-avatar">{{ msg.userName }}</div>
        <div class="message-content el-popover el-popper el-popover--plain" :x-placement="msg.me ? 'left' : 'right'">
          {{ msg.content }}
          <div class="popper__arrow"></div>
        </div>
      </div>
    </div>
    <div class="message-input">
      <el-input v-model="inputText" @keyup.enter.native="send">
        <template slot="append">
          <div class="el-button" @click="send">Send</div>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  interface ChatMessage {
    content: string;
    date: string;
    userId: string;
    userName: string;
    me: boolean;
  }

  export default Vue.extend({
    name: 'QuickChat',
    data() {
      const messages: Array<ChatMessage> = [];
      return {
        show: true,
        inputText: '',
        messages,
      };
    },
    methods: {
      send() {
        if (this.inputText) {
          this.messages.push({
            content: this.inputText,
            date: new Date().toString(),
            userId: this.$store.state.user.id,
            userName: this.$store.state.user.name || 'Admin',
            me: Math.random() > 0.5,
          });
          this.inputText = '';
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .quick-chat {
    height: 100%;
    display: flex;
    flex-direction: column;

    .message-list {
      flex: 1;
      overflow: auto;

      .message-line {
        width: 100%;
        padding: 0 12px;
        margin: 8px 0;
        display: flex;

        &.my-line {
          flex-direction: row-reverse;
        }

        .message-avatar {
          font-size: 14px;
          transform: translateY(4px);
        }

        .message-content {
          position: relative;
          padding: 12px;
          min-width: unset;
          display: inline-block;

          &.el-popper[x-placement^=left],
          &.el-popper[x-placement^=right] {
            .popper__arrow {
              top: 6px;
            }
          }
        }
      }
    }

    .message-input {
      .el-button {
        padding: 12px 6px;
      }
    }
  }

  .el-popover {
    box-shadow: 0 2px 8px 1px rgba(0, 0, 0, .2)
  }
</style>
