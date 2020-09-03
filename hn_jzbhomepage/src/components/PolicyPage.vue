<template>
<div class="main-list">

  <div id="policy_con" class="sub-section">

    <div id="steps_con">
      <table>
        <tr>
          <td>1. 填写用户信息</td>
          <td>2. 完成企业认证</td>
          <td>3. 递交我们审核</td>
          <td>4. 完成注册</td>
        </tr>
      </table>
    </div>

    <div class="article-content">
      <policy-content></policy-content>
    </div>

  </div>

</div>
</template>

<script>
  import PolicyContent from './partials/PolicyContent.vue'
  export default {
    name: 'policy-page',
    components: {
      PolicyContent
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  #policy_con {
    width: 70%;
    margin: 0 auto;
    padding-top: 40px;
    position: relative;
  }
  #steps_con {
    position: relative;
    background-image: url('/static/img/policy/arrow.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    padding-bottom: 5.14%;
  }
  #steps_con table {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  #steps_con table td {
    color: white;
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    width: 25%;
  }
  .article-content {
    margin: 40px auto;
  }
</style>
