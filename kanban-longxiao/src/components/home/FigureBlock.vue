<template>
  <div class="figure-block">
    <div class="figure-box pos produce-today">
      今日累计产量
      <div class="number font-tb">{{ figures.today | formatNum }}</div>
    </div>
    <div class="figure-box pos produce-month">
      本月累计产量
      <div class="number font-tb">{{ figures.month | formatNum }}</div>
    </div>
    <div class="figure-box pos produce-order">
      生产中订单
      <div class="number font-tb">{{ figures.producing | formatNum }}</div>
    </div>
    <div class="figure-box pos finished-month">
      本月已完成订单
      <div class="number font-tb">{{ figures.finished | formatNum }}</div>
    </div>
  </div>
</template>

<script>
  const defaultFigures = {
    today: 1357,
    month: 26371,
    order: 337,
    finished: 281,
  }

  export default {
    name: 'FigureBlock',
    props: {
      figures: {
        default: () => defaultFigures,
      },
    },
  }

</script>

<style scoped lang="scss">
  .figure-box {
    top: 138px;
    width: 204px;
    height: 45px;
    background: url("../../assets/img/home/group 375.png") no-repeat;
    font-size: 20px;
    font-weight: 800;
    line-height: 43px;
    color: #CCF2FF;

    .number {
      color: #FFF500;
      font-size: 60px;
      margin-top: 24px;
    }
  }

  .produce-today {
    left: 711px;
  }

  .produce-month {
    left: 1031px;
  }

  .produce-order {
    left: 1350px;
  }

  .finished-month {
    left: 1670px;
  }
</style>
