<template>
  <div class="status-area pos font-pr">
    <div class="area-border pos"></div>
    <div class="area-title pos">{{ title }}</div>
    <div class="lab-block pos block">
      <div class="block-title">实验室温湿度监测系统</div>
      <div class="block-state"></div>
      <div class="lab-grid pos">
        <div class="lab-state" v-for="lab in labs" :key="lab.name">
          <div class="lab-name">{{ lab.name }}</div>
          <div class="lab-circle">
            <div class="lab-circle-inner">
            </div>
          </div>
          <div class="lab-circle-content">
            <div class="lab-temp">
              {{ lab.temp }}°C
              <div class="tip">室内温度</div>
            </div>
            <div class="lab-humidity">
              {{ lab.humidity }}%
              <div class="tip">室内湿度</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="warehouse-block pos block">
      <div class="block-title">相控阵雷达出入库管控系统</div>
      <div class="block-state"></div>
      <div class="wh-list pos">
        <div class="wh-item" v-for="(wh, idx) in warehouses" :key="idx" :class="'state-' + wh.state">
          <div class="name">{{ wh.name }}</div>
          <div class="circle"></div>
          <div class="msg">{{ wh.msg }}</div>
        </div>
      </div>
    </div>
    <div class="health-block pos block">
      <div class="block-title">健康检测管理系统</div>
      <div class="block-state"></div>
      <div class="temp-meter pos">
        <div class="tested">{{ health.tested }}</div>
        <div class="title">今日体温测量人数</div>
      </div>
      <div class="pool-count pos">
        <div class="count">{{ health.irregular }}</div>
        <div class="tip">异常人数</div>
        <div class="count-bg"></div>
      </div>
    </div>
    <div class="disinfection-block pos block">
      <div class="block-title">智能臭氧消毒系统</div>
      <div class="block-state"></div>
      <kira-box class="running-box pos" width="164" height="92" point-radius="3" radius="6"
                :trail="{ width: 2, length: 100 }" :boxStyles="runningBoxStyles">
        <div class="start-time pos">
          {{ disinfection.start }}
          <div class="tip">开始</div>
        </div>
        <div class="end-time pos">
          <div class="tip">结束</div>
          {{ disinfection.end }}
        </div>
      </kira-box>
      <div class="running-tip pos">
        系统将在{{ disinfectionEst.h }}小时{{ disinfectionEst.m }}分{{ disinfectionEst.s }}秒后开始运行
      </div>
      <div class="pool-count pos">
        <div class="count">{{ disinfection.count }}</div>
        <div class="tip">累计运行次数</div>
        <div class="count-bg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { KiraBox } from '@x22/kiraui'
  import '@x22/kiraui/dist/kiraui.css'
  import { mapState } from 'vuex'

  export default {
    name: 'StatusArea',
    components: {
      KiraBox,
    },
    data () {
      return {
        title: '系统运行状态监控',
        disStartTime: 0,
        runningBoxStyles: {
          background: 'rgba(62, 75, 134, .5)',
          boxShadow: '#005B8C 0 0 0 .5px',
          border: '#005B8C .5px solid',
        },
        disinfectionEst: { h: 0, m: 0, s: 0 },
      }
    },
    computed: {
      ...mapState('systemModule', ['labs', 'warehouses', 'health', 'disinfection']),
    },
    methods: {
      updateEtd () {
        const delta = this.disStartTime - new Date().getTime()
        this.disinfectionEst = {
          h: +(delta / 3600000).toFixed() % 24,
          m: +((delta % 3600000) / 60000).toFixed(),
          s: +((delta % 60000) / 1000).toFixed(),
        }
      },
      startTimer () {
        window.clearInterval(this.timer)
        const [hh, mm] = this.disinfection.start.split(':')
        this.disStartTime = new Date().setHours(+hh + 24, +mm, 0)
        this.updateEtd()
        this.timer = window.setInterval(() => {
          this.updateEtd()
        }, 1000)
      },
    },
    destroyed () {
      window.clearInterval(this.timer)
    },
    mounted () {
      this.startTimer()
    },
  }
</script>

<style scoped lang="scss">
  @import "../../styles/area";

  .area-border {
    left: 3342px;
    top: 80px;
    width: 51px;
    height: 982px;
    background: url("../../assets/img/home/group 397.png") top no-repeat;
  }

  .area-title {
    left: 3411px;
    top: 64px;
  }

  .lab-block {
    left: 3372px;
    top: 131px;
    width: 404px;
    height: 333px;
    color: #CCF2FF;

    .lab-grid {
      width: 100%;
      top: 60px;
      display: flex;
      flex-wrap: wrap;

      .lab-name {
        font-size: 14px;
      }

      @keyframes spin {
        100% {
          transform: rotate(360deg);
        }
      }

      .lab-circle {
        width: 96px;
        height: 96px;
        background: url("../../assets/img/home/ellipse 506 copy 7(1).png");
        margin: 4px auto;
        position: relative;
        animation: spin 4s linear infinite;
      }

      .lab-circle-inner {
        width: 82px;
        height: 82px;
        background: #011244;
        margin: 0 auto;
        border-radius: 50%;
        transform: translateY(7px);
      }

      .lab-state {
        flex: 0 0 33%;
        height: 134px;
        position: relative;

        .lab-circle-content {
          position: absolute;
          top: 26px;
          left: 0;
          right: 0;

          .lab-temp, .lab-humidity {
            font-weight: bold;
          }

          .lab-temp {
            padding: 12px 0 3px;
          }

          .tip {
            font-size: 8px;
            font-weight: normal;
          }
        }
      }
    }
  }

  .warehouse-block {
    left: 3372px;
    top: 476px;
    width: 404px;
    height: 177px;
    color: #CCF2FF;

    .wh-list {
      top: 41px;
      left: 0;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;

      .wh-item {
        flex: 0 0 25%;
        height: 136px;
        position: relative;

        .name {
          margin-top: 26px;
          font-size: 14px;
          font-weight: 400;
        }

        .circle {
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
        }

        .msg {
          position: absolute;
          top: 76px;
          left: 0;
          right: 0;
          font-size: 12px;
          font-weight: bold;
        }

        &.state-1 {
          .circle {
            top: 42px;
            width: 83px;
            height: 83px;
            background: url("../../assets/img/home/12@2x.png");
          }

          .msg {
            text-shadow: #00FFF5 0 0 5px;
          }
        }

        &.state-2 {
          .circle {
            top: 26px;
            margin-left: -8px;
            width: 113px;
            height: 113px;
            background: url("../../assets/img/home/12@2x(2).png");
          }

          .msg {
            color: #00FFF5;
            text-shadow: #009DFF 0 0 5px;
          }
        }

        &.state-3 {
          .circle {
            top: 32px;
            width: 101px;
            height: 101px;
            background: url("../../assets/img/home/hue_saturation 1.png");
          }

          .msg {
            color: #FF3355;
            text-shadow: #FF3355 0 0 5px;
          }
        }
      }
    }
  }

  .health-block {
    left: 3372px;
    top: 662px;
    width: 404px;
    height: 174px;
    color: #CCF2FF;

    .temp-meter {
      top: 50px;
      left: 55px;
      width: 137px;
      height: 116px;
      background: url("../../assets/img/home/group 378.png");

      .tested {
        margin: 22px 0 -7px;
        font-size: 40px;
        font-weight: bold;
        text-shadow: #00F5FF 0 0 3px;
      }

      .title {
        font-size: 10px;
        font-weight: 400;
      }
    }

    .pool-count {
      .count {
        margin-top: 10px;
      }

      .tip {
        margin-top: -8px;
      }
    }
  }

  .disinfection-block {
    left: 3372px;
    top: 860px;
    width: 404px;
    height: 174px;
    color: #CCF2FF;

    .running-box {
      top: 52px;
      left: 40px;

      .start-time {
        top: 5px;
        height: 37px;
        border-bottom: solid #CCF2FF66 1px;

        .tip {
          text-align: right;
          margin-top: 4px;
        }
      }

      .end-time {
        top: 51px;

        .tip {
          margin-top: 10px;
        }
      }

      .start-time, .end-time {
        width: 116px;
        left: 22px;
        font-size: 24px;
        font-weight: bold;
        display: flex;
        text-align: left;

        .tip {
          flex: 1;
          font-size: 12px;
        }
      }
    }

    .running-tip {
      font-size: 8px;
      left: 59px;
      bottom: 12px;
    }
  }

  .pool-count {
    right: 50px;
    bottom: 0;
    height: 120px;
    width: 100px;

    .count {
      margin-top: 8px;
      font-size: 40px;
      font-weight: bold;
      text-shadow: 0 0 5px #00F5FF;
    }

    .tip {
      margin-top: -2px;
      font-size: 12px;
    }

    .count-bg {
      margin: 5px auto;
      width: 45px;
      height: 33px;
      background: url("../../assets/img/home/group 379.png");
    }
  }

  .block-title {
    color: #CCF2FF;
    font-size: 16px;
    text-align: left;
    position: absolute;
    top: 16px;
    left: 25px;
  }

  .block-state {
    position: absolute;
    left: 277px;
    top: 16px;
    width: 111px;
    height: 24px;
    background: url("../../assets/img/home/group 398.png");
  }
</style>
