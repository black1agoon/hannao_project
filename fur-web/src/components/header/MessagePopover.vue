<template>
  <el-popover ref="popover" class="message-popover" placement="bottom" width="250" trigger="hover">
    <div class="header">
      <div class="title">{{msgCount}}条信息</div>
      <div class="mark" @click="markAllRead">已读所有</div>
    </div>
    <div class="content">
      <el-scrollbar wrap-style="overflow-x: hidden;" view-style="margin-right: 20px;">
        <div v-for="(msg, idx) in messages" :key="idx" class="msg-item" @click="viewMessage(msg)">
          <div class="msg-name">{{ msg.senderName }}</div>
          <div class="msg-date">{{ msg.msgDateTime | dateIt }}</div>
          <div class="msg-title">{{ msg.msgTitle }}</div>
        </div>
      </el-scrollbar>
    </div>
    <el-badge slot="reference" :is-dot="msgCount.length>1?true:false" class="item">
      <el-icon name="bell"></el-icon>
    </el-badge>
  </el-popover>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'MessagePopover',

    data () {
      return {}
    },

    computed: {
      ...mapState('message', ['messages']),
      msgCount () {
        return this.messages.length
      },
    },

    filters: {
      dateIt (time) {
        return time?.replace(/[T ].*/, '') || ''
      },
    },

    methods: {
      ...mapActions('message', ['clearMessages']),
      markAllRead () {
        if (this.msgCount > 0) {
          this.$confirm(this.$t('app.messages.markAllRead?')).then(this.clearMessages)
        } else {
          this.$message(this.$t('app.messages.noUnread'))
        }
      },
      // viewMessage (msg) {
      //   this.$store.dispatch('message/openMessage', msg).then(() => {
      //     this.$refs.popover.doClose()
      //   })
      // },
    },
  }
</script>
<style>
  .el-badge__content.is-fixed {
    top: 7px;
    left: 7px;
  }
</style>
<style scoped lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 1px solid lightgray;
    padding-bottom: 4px;

    .mark {
      color: rgba(248, 163, 51, 0.8);
      cursor: pointer;
    }
  }

  .content {
    height: 400px;
    max-height: 400px;
    min-height: 100px;
    overflow: visible;

    .el-scrollbar {
      height: 100%;
      overflow: visible;

      ::v-deep {
        .el-scrollbar__wrap {
          margin-right: -35px !important;
        }

        .el-scrollbar__bar.is-vertical {
          right: -12px;
        }
      }
    }

    .msg-item {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid lightgray;
      padding: 6px 0;
      cursor: pointer;

      .msg-name {
        flex: 1 0 50%;
        color: #FF9100;
      }

      .msg-date {
        flex: 1 0 50%;
        text-align: right;
      }
    }
  }

  .el-badge {
    user-select: none;
  }
</style>
