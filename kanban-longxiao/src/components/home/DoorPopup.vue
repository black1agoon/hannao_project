<template>
  <div class="door-popup pos" :class="status" :style="posStyles">
    <div class="title pos">{{ action.title }}</div>
    <div class="order pos">
      {{ action.typeName }}单号
      <div class="order-code">{{ action.orderCode }}</div>
    </div>
    <div class="count pos">
      共
      <div class="count-number font-d7">{{ action.count }}</div>
      {{ action.unit }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DoorPopup',
    props: {
      action: {
        default: () => ({}),
      },
    },
    computed: {
      status () {
        return this.action.status && 'warning'
      },
      posStyles () {
        return {
          left: (this.action.position[0] || 0) + 'px',
          top: (this.action.position[1] || 0) + 'px',
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .door-popup {
    width: 121px;
    height: 109px;
    background: url("../../assets/img/home/group 461.png");
    transform: translate(-50%, -100%);
    color: #CCF2FF;

    .title {
      left: 10px;
      top: 8px;
      font-size: 11px;
      text-shadow: #26B4FF 0 0 6px;
    }

    .order {
      text-align: left;
      white-space: nowrap;
      top: 28px;
      left: 11px;
      right: 0;
      font-size: 8px;
      color: #04E0E0;
      display: flex;

      .order-code {
        text-align: center;
        color: #CCF2FF;
        flex: 1;
      }
    }

    .count {
      left: 24px;
      right: 30px;
      top: 50px;
      display: flex;
      font-size: 11px;

      .count-number {
        background: #003264;
        margin: -5px 4px 0 8px;
        padding: 2px;
        flex: 1;
        font-size: 16px;
        text-align: right;
      }
    }

    &.warning {
      width: 124px;
      height: 111px;
      background: url("../../assets/img/home/group 462.png");

      .title {
        color: #FF9A9A;
        text-shadow: #FF3355 0 0 6px;
      }

      .order {
        color: #FF2E51;

        .order-code {
          color: #FFCCCC;
        }
      }

      .count {
        color: #FFCCCC;

        .count-number {
          background: #3B0000;
        }
      }
    }
  }
</style>
