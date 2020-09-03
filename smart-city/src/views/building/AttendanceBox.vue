<template>
  <div class="attendance-box">
    <div class="box-title highlight-color">考勤</div>
    <div class="avatar-grid" :class="{ demo: isDemo }">
      <div class="grid-cell online-circle">
        {{ normalStatus.name }}
        <br>
        <span class="count">{{ normalStatus.count }}</span>
        <span class="unit">人</span>
      </div>
      <div class="grid-cell avatar-cell"
           v-for="(user) in userList" :key="user.name">
        <div class="avatar-circle" :style="user.circleStyle"></div>
        {{ user.name }}
        <div class="status-label" :style="{background: user.circleStyle.borderColor}">
          {{ user.label }}
        </div>
      </div>
    </div>
    <div class="count-column">
      <div class="count-box" v-for="(stCount) in countList" :key="stCount.status">
        {{ stCount.name }}
        <span class="count">{{ stCount.count }}</span>
        <span class="unit">人</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { attendanceData } from '@/demo/building-data';
  import { attendanceStates } from '@/config/attendance-config';
  import defaultAvatar from './img/default-avatar.png';

  @Component
  export default class AttendanceBox extends Vue {
    public isDemo = true;

    private gridPage: number = 0;
    private intervalId!: number;

    public get userList() {
      return attendanceData.slice(this.gridPage * 8, this.gridPage * 8 + 8)
        .map((item) => ({
          ...item,
          circleStyle: {
            backgroundImage: `url("${item.icon || defaultAvatar}")`,
            borderColor: ((attendanceStates as any)[item.status] || {}).color,
          },
          label: ((attendanceStates as any)[item.status] || {}).name,
        }));
    }

    public get countList() {
      return Object.keys(attendanceStates).filter((st) => st !== 'normal')
        .map((st) => ({
          status: st,
          name: ((attendanceStates as any)[st] || {}).name,
          count: attendanceData.filter((item) => item.status === st).length,
        }));
    }

    public get normalStatus() {
      const st = 'normal';
      return {
        status: st,
        name: attendanceStates[st].name,
        count: attendanceData.filter((item) => item.status === st).length,
      };
    }

    public nextPage() {
      this.gridPage = (this.gridPage + 1) % Math.ceil(attendanceData.length / 8);
    }

    private mounted() {
      if (!this.intervalId) {
        this.intervalId = window.setInterval(() => {
          this.nextPage();
        }, 10000);
      }
    }

    private beforeDestory() {
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .attendance-box {
    position: absolute;
    top: 99px;
    right: 58px;
    width: 575px;
    height: 450px;
    background: url("img/box-bg2.png") no-repeat center;
    padding: 20px;
  }

  .avatar-grid {
    width: 66%;
    height: 370px;
    float: left;
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;

    .online-circle {
      background: url("img/005.png") no-repeat center;
      background-size: 120px;
      margin: -24px 0 0 0;
      padding-top: 30px;
      position: relative;

      .count {
        font-size: 32px;
        font-weight: bold;
        color: yellow;
      }

      .unit {
        position: absolute;
        bottom: 40px;
        font-size: 12px;
      }
    }

    .grid-cell {
      flex: 0 0 33.3%;
      height: 33.3%;
      font-size: 14px;

      .avatar-circle {
        width: 69px;
        height: 69px;
        margin: 6px auto 0;
        border: 3px solid;
        box-shadow: inset 0 0 3px #000;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .status-label {
        width: 42px;
        margin: 2px auto;
        font-size: 12px;
        line-height: 16px;
        border-radius: 5px;
        text-shadow: 1px 1px 1px #000;
      }
    }
  }

  .count-column {
    width: 33%;
    height: 370px;
    margin-top: 8px;
    float: right;
    display: flex;
    flex-direction: column;

    .count-box {
      background: url("img/009.png") center no-repeat;
      flex: 1;
      padding-top: 12px;

      .count {
        display: inline-block;
        width: 50px;
        font-size: 28px;
        font-weight: bold;
        color: yellow;
      }

      .unit {
        font-size: 12px;
      }
    }
  }

  .avatar-grid.demo {
    background: url("../../assets/img/building-att2.png") center;
    margin-top: 0;

    .grid-cell {
      display: none;
    }
  }
</style>
