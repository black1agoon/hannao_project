<template>
  <div id="planbillPrint">
    <div class="wrapper">
      <div class="title">生产任务单</div>
      <div class="form-box">
        <div class="item"
             v-for="(item, index) in FORMINFO"
             :key="index">
          <div class="label">{{item.label}}:</div>
          <div class="value">{{formdata[item.value]}}</div>
        </div>
      </div>
      <table class="size-detail"
             border="1"
             v-if="formdata.sizeDetailList && formdata.sizeDetailList.length > 0">
        <tr>
          <th>颜色</th>
          <th>类型</th>
          <th>尺码</th>
          <th>数量</th>
          <th>状态</th>
        </tr>
        <tr v-for="(row, index) in formdata.sizeDetailList" :key="index">
          <td>{{row.colorName}}</td>
          <td>{{row.type}}</td>
          <td>{{row.size}}</td>
          <td>{{row.number}}</td>
          <td>{{row.printState}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import printJS from 'print-js'
  import style from '!!raw-loader!./planbill_print.css'
  const FORMINFO = [
    {
      label: '生产任务单号',
      value: 'code'
    }, {
      label: '款号',
      value: 'styleCode'
    }, {
      label: '颜色',
      value: 'colorName'
    }, {
      label: '客户',
      value: 'customerName'
    }, {
      label: '数量',
      value: 'number'
    }, {
      label: '状态',
      value: 'proState'
    }, {
      label: '交期',
      value: 'deliverDate'
    }, {
      label: '制单人',
      value: 'userName'
    }, {
      label: '制单时间',
      value: 'createTime'
    }, {
      label: '客户要求',
      value: 'cusRequire'
    }
  ]
  export default {
    name: 'plan-bill-print',
    data() {
      return {
        FORMINFO,
        formdata: {}
      }
    },
    methods: {
      print(data) {
        this.formdata = data
        this.$nextTick(() => {
          printJS({printable: 'planbillPrint', type: 'html', scanStyles: false, style})
        })
      }
    },
    mounted() {
      //
    }
  }
</script>

<style lang="sass" scoped>
  .wrapper
    position: absolute
    display: none
    width: 1000px
    top: 100px
    left: 300px
    background: #ffffff
    border: 1px solid #000
    z-index: 100
    margin: 0 auto
    color: #000000
    .title
      text-align: center
      font-size: 25px
      margin: 20px 0 40px
    .form-box
      display: flex
      flex-wrap: wrap
      .item
        margin-bottom: 20px
        .label
          display: inline-block
          width: 120px
          height: 35px
          text-align: right
          margin-right: 10px
          line-height: 35px
          vertical-align: top
        .value
          display: inline-block
          width: 200px
          height: 32px
          line-height: 32px
          text-align: center
          border-bottom: 1px solid #000000
    .size-detail
      width: 90%
      margin: 0 auto
      box-sizing: border-box
      border-collapse: collapse
      border-spacing: 0
      border-bottom: 2px solid #000000
      td
        text-align: center
</style>