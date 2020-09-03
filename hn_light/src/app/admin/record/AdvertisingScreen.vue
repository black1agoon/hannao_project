<template>
  <div>
    <div class="content">
      <a href="hdplayer://" target="_blank"><el-button class="open" type="success" round>打开广告屏</el-button></a>
      <p>请您安装广告屏客户端软件，点击下方下载安装按钮，安装路径请务必确认C:\Program Files\HDPlayer，否则无法通过网页唤起客户端应用，安装过程大约需要耗时1分钟。安装完成后请点击应用<a class="click" @click="getRegister">注册下载</a>完成广告屏应用的注册。若安装出现问题，请与网管员联系。不同网段广告屏客户端连接设置请<a class="click" @click="getDocx">点击这里</a>，谢谢配合！</p>
    </div>

    <div class="install" @click="getExe">
      <span class="download"></span>点击安装
    </div>
  </div>

</template>

<script>
  import config from '@/config'
  export default {
    name: 'advertising-screen',
    _meta: {
      path: '/advertising/screen',
      title: '广告屏'
    },
    computed: {
    },
    data() {
      return {
        serverURI: config.serverURI
      }
    },
    methods: {
      getDocx() {
        window.open(this.serverURI + '/sl/setting.docx')
      },
      getExe() {
        window.open(this.serverURI + '/sl/HDPlayer.6.4.5.0.exe')
      },
      getRegister() {
        window.open(this.serverURI + '/sl/hdplayer.reg')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.content
  width: 800px !important
  text-indent: 30px
  margin: 50px auto
  line-height: 30px
  padding: 20px
  text-align: center
  .click
    font-weight: bold
    cursor: pointer
    color: #0000cc
  .open
    width: 150px
    margin: 30px auto
  p
    text-align: left
.install
  width: 300px
  text-align: center
  margin: 0 auto
  line-height: 30px
  color: #0000cc
  text-decoration: underline
  cursor: pointer
  .download
    margin-right: 10px
    display: inline-block
    vertical-align: middle
    width: 30px
    height: 30px
    background-image: url("../../../assets/img/download.png")
    background-size: 30px 30px
    background-repeat: no-repeat
</style>