<template>
  <div class="device-status-block">
    <div class="status-logo pos" :class="{ warning: machine.state }"></div>
    <div class="device-name pos">{{ machine.name }}</div>
    <div class="uptime pos">
      <div class="title">连续运行时间</div>
      <div class="value">{{ machine.uptime | formatNum }}h</div>
    </div>
    <div class="output pos">
      <div class="title">今日产量</div>
      <div class="value">{{ machine.dailyOutput | formatNum }}</div>
    </div>
    <div class="details pos">
      <div class="detail-item detail-current">
        <div class="title">当前任务</div>
        <div class="value">{{ machine.currentTask }}</div>
      </div>
      <div class="detail-item detail-customer">
        <div class="title">客户</div>
        <div class="value">{{ machine.customer }}</div>
      </div>
      <div class="detail-item detail-tasks">
        <div class="title">任务数/已完成</div>
        <div class="value">{{ machine.task | formatNum }}/{{ machine.finished | formatNum }}</div>
      </div>
      <div class="detail-item detail-due">
        <div class="title">预计完成时间</div>
        <div class="value">{{ machine.due }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  const defaultState = {
    name: '一号机',
    uptime: 0,
    dailyOutput: 0,
    currentTask: '-',
    customer: '-',
    task: 0,
    finished: 0,
    due: '00-00 00:00',
    state: 1,
  }
  export default {
    name: 'DeviceStatusBlock',
    props: {
      machine: {
        default: () => defaultState,
      },
    },
  }
</script>

<style scoped lang="scss">
  .device-status-block {
    width: 100%;
    height: 100%;
    position: relative;
    color: #CCF2FF;
    text-align: left;

    .status-logo {
      left: 12px;
      top: 25px;
      width: 39px;
      height: 36px;
      background: url("../../assets/img/home/group 367@2x.png");
      background-size: contain;

      &.warning {
        background: url("../../assets/img/home/group 366@2x.png");
        background-size: contain;
      }
    }

    .device-name {
      left: 62px;
      top: 19px;
      font-size: 34px;
      font-weight: 500;
    }

    .uptime {
      left: 207px;
      top: 25px;

      .title {
        font-size: 12px;
      }

      .value {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .output {
      left: 62px;
      top: 81px;

      .title {
        font-size: 12px;
      }

      .value {
        margin-top: -5px;
        font-size: 40px;
        font-weight: bold;
        text-shadow: 0 0 7px rgba(0, 235, 255, 1);
      }
    }

    .details {
      left: 42px;
      top: 167px;
      width: calc(100% - 36px);
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }

    .detail-item {
      flex: 0 0 50%;
      padding-left: 20px;
      height: 50px;
      font-weight: 500;

      .title {
        font-size: 10px;
        color: #6E86B7;
      }

      .value {
        margin-top: 2px;
        font-size: 14px;
        font-weight: bold;
      }
    }

  }
</style>
