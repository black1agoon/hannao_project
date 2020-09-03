<template>
  <div class="main-list">
    <div class="sub-section" id="devices_con" :class="{expanded: expanded}">
      <h1 class="section-title">智能硬件</h1>
      <div class="bg-grid">
        <div v-for="(device, idx) in devices"
             class="bg-grid-1-3"
             @click="showModal(idx)">
          <div v-if="device.border" class="full-bg img-con"
               :style="'background-image: url(' + uploads(device.image.path) + ')'">
          </div>
          <div v-else class="img-con hg-68">
            <div class="img-wrapper">
              <div class="img-bg"
                   :style="'background-image: url(' + uploads(device.image.path) + ')'">
              </div>
            </div>
          </div>
          <div class="titles-con">
            <h3>{{device.name}}</h3>
            <p></p>
          </div>
        </div>
      </div>
      <div v-if="false" class="show-more" @click="showMore(true)">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>
      <div class="show-less" @click="showMore(false)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
    </div>

    <div id="dev_modal" v-show="show_modal >= 0">
      <div class="modal-wrapper" ref="modal_wrapper">
        <div class="data-wrapper" v-if="show_modal >= 0">
          <div class="close-btn" @click="showModal(-1)"></div>
          <div class="modal-header">
            <h2 class="modal-title">{{ devices[show_modal]['name'] }}</h2>
          </div>
          <div class="modal-content">
            <img class="modal-img" alt=""
                 :src=" show_modal >= 0 ? uploads(devices[show_modal].image.path) : ''" >
                 <p><span class="para-head">产品介绍：</span>{{devices[show_modal]['desc']}}</p>
                 <p><span class="para-head">应用领域：</span>{{devices[show_modal]['area']}}</p>
          </div>
          <div class="modal-footer">
            <div v-if="scrollable" @click="scrollToBottom" class="scroll-indicator icomoon-chevron-down"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppService from '@/app.service'
  import AppConfig from '@/app.config'
  export default {
    name: 'devices-page',
    data () {
      return {
        expanded: false,
        show_modal: -1,
        scrollable: false,
        devices: [
          // {
          //   name: '',
          //   image: '',
          //   desc: '',
          //   area: ''
          // }
        ]
      }
    },
    created () {
    },
    destroyed () {
      this.$refs.modal_wrapper && this.$refs.modal_wrapper.removeEventListener('scroll', this.checkScroll.bind(this))
    },
    mounted () {
      this.$refs.modal_wrapper.addEventListener('scroll', this.checkScroll.bind(this))
      this.fetchDevices()
    },
    methods: {
      fetchDevices: function () {
        AppService.collection('devices')
        .then(function (data) {
          this.devices = data.entries.filter(function (entry) {
            return entry.published
          })
        }.bind(this))
      },
      uploads: function (path) {
        return AppConfig.uploads(path)
      },
      checkScroll: function (e) {
        var target = (e && e.target) || this.$refs.modal_wrapper
        this.scrollable = target.clientHeight + target.scrollTop < target.scrollHeight
      },
      scrollToBottom: function () {
        var target = this.$refs.modal_wrapper
        target.scrollTop = target.scrollHeight - target.clientHeight
      },
      showMore: function (stat) {
        this.expanded = stat
      },
      showModal: function (idx) {
        this.show_modal = idx
        this.$nextTick(function () {
          this.checkScroll()
        }.bind(this))
      }
    }
  }
</script>

<style scoped>
  #dev_modal {
    position: fixed;
    width: 60%;
    background-color: white;
    box-shadow: 0 0 84px 0 gray;
    border-radius: 2px;
    margin: 0 auto;
    top: 15%;
    bottom: 5%;
    left: 20%;
    z-index: 10;
    overflow: hidden;
  }
  #dev_modal .modal-wrapper {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    padding-right: 20%;
  }
  #dev_modal .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background-image: url('/static/img/devices/close.png');
    background-size: 100%;
    width: 6%;
    padding-bottom: 6%;
    cursor: pointer;
  }

  .scroll-indicator {
    position: absolute;
    right: 5%;
    font-size: 24px;
    color: #2f2f2f;
    -webkit-animation: bounce 1s infinite;
    animation: bounce 1s infinite;
    cursor: pointer;
  }

  @keyframes bounce {
    0% { bottom: 1%; }
    50%   { bottom: 2%; }
    100% { bottom: 1%; }
  }

  .bg-grid .hg-68 {
    padding-bottom: 68%;
  }
  .bg-grid .img-con {
    width: 90%;
    margin: 5%;
    background-color: white;
  }
  .bg-grid .img-con .img-wrapper .img-bg {
    padding-bottom: 53%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center top;
    position: absolute;
    width: 100%;
    margin: 5px auto;
  }
  .bg-grid .img-con .img-wrapper {
    padding-bottom: 67.2%;
    border: 1px solid #484848;
    position: absolute;
    width: 90%;
  }
  .bg-grid .img-con img {
    width: 100%;
  }
  .bg-grid .full-bg.img-con {
    padding-bottom: 68%;
  }
  .sub-section {
    width: 80%;
    margin: 0 auto;
  }
  .section-title {
    margin-top: 0;
    padding-top: 40px;
  }

  .sub-section .bg-grid-1-3 {
    position: relative;
    cursor: pointer;
  }
  .sub-section .bg-grid-1-3 .titles-con {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
  }

  .show-more {
    display: inherit;
  }
  .expanded .show-more {
    display: none;
  }
  .show-less {
    display: none;
  }
  .expanded .show-less {
    display: inherit;
  }
  .hidden-cell {
    display: none;
  }
  .expanded .hidden-cell {
    display: inherit;
  }

  .modal-header,
  .modal-footer,
  .modal-content {
    width: 80%;
    margin: 0 auto;
  }
  .modal-header {
    margin-top: 10%;
  }
  .modal-content .para-head {
    font-weight: bold;
  }
  .modal-footer {
    padding: 10px 0;
  }
  .modal-img {
    max-width: 100%;
  }

</style>
