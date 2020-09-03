<template>
  <div class="staff-block">
    <svg width="214" height="214" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path v-if="visitor" :d="pathD" fill="transparent" stroke-width="20" stroke="#CCF2FF"></path>
      <path v-if="visitor" :d="pathV" fill="transparent" stroke-width="40" stroke="#42F8FF"></path>
      <circle v-else cx="107" cy="107" r="83" fill="transparent" stroke-width="20" stroke="#CCF2FF"/>
    </svg>
    <div class="total pos">
      <span class="number">{{ total }}</span><span class="unit">人</span>
      <div class="title">当前厂区内总人数</div>
    </div>
    <div class="online pos">
      <div class="title">在岗员工</div>
      <span class="number">{{ online }}</span><span class="unit">人</span>
    </div>
    <div class="visitor pos">
      <div class="title">访客</div>
      <span class="number">{{ visitor }}</span><span class="unit">人</span>
    </div>
  </div>
</template>

<script>
  import { describeArc } from '@/utils/draw'
  import { mapState } from 'vuex'

  export default {
    name: 'StaffBlock',
    computed: {
      ...mapState('overviewModule', {
        online: state =>  state.staffs?.online || 0,
        visitor: state => state.staffs?.visitor || 0,
      }),
      total () {
        return this.online + this.visitor
      },
      pathD () {
        const end = +(this.online / this.total * 360 + 90 - 10).toFixed()
        return describeArc(107, 107, 83, 90, end)
      },
      pathV () {
        const start = +(this.online / this.total * 360 + 90 - 5).toFixed()
        return describeArc(107, 107, 78, start, 85)
      },
    },
  }
</script>

<style scoped lang="scss">
  .staff-block {
    left: 639px;
    top: 816px;
    width: 300px;
    height: 186px;
    color: #CCF2FF;
  }

  .unit {
    font-size: 13px;
    font-weight: 500;
  }

  .title {
    font-size: 13px;
  }

  .total {
    left: 0;
    right: 0;
    top: 74px;

    .number {
      font-size: 36px;
      font-weight: 800;
    }
  }

  .online {
    left: 0;
    top: 154px;
    text-align: left;

    .number {
      font-size: 28px;
      font-weight: 800;
    }
  }

  .visitor {
    text-align: left;
    left: 250px;
    top: 40px;

    .number {
      font-size: 28px;
      font-weight: 800;
    }

    .title {
      color: #42F8FF;
    }
  }
</style>
