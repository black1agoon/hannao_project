<template>
  <div class="form-wrapper">
    <div class="form-box">
      <el-form class="form clearfix">
        <div class="form-group clearfix">
          <div class="big-title">
            <i class="el-icon-tickets"></i>
            <span>企业基本信息</span>
          </div>
          <div class="item-wrap">
            <el-col class="form-item" :sm="8">
              <span class="item-key">企业中文名:</span>
              <span class="item-value">{{formdata.name}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">所属行业:</span>
              <span class="item-value">{{formdata.industryName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">注册地址:</span>
              <span class="item-value">{{formdata.regAddress}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">注册地址邮编:</span>
              <span class="item-value">{{formdata.regAddressCode}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">运营地址:</span>
              <span class="item-value">{{formdata.operateAddress}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">运营地址邮编:</span>
              <span class="item-value">{{formdata.operateAddressCode}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">法人代表:</span>
              <span class="item-value">{{formdata.legalRepresentative}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">法人代表身份证:</span>
              <span class="item-value">{{formdata.legalIdcard}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">营业执照号码:</span>
              <span class="item-value">{{formdata.businessLicence}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">合同期限(年):</span>
              <span class="item-value">{{formdata.contractPeriod}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">员工总数:</span>
              <span class="item-value">{{formdata.employees}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">对公银行:</span>
              <span class="item-value">{{formdata.bank}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">银行账号:</span>
              <span class="item-value">{{formdata.bankAccount}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">地址所属区域:</span>
              <span class="item-value">{{formdata.areaName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">是否为多场地办公:</span>
              <span class="item-value">{{getMultipleSites}}</span>
            </el-col>
            <el-col class="form-item" :sm="8" v-show="this.formdata.multipleSites === 1">
              <span class="item-key">多场地地址:</span>
              <span class="item-value">{{formdata.multipleSitesAddress}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">法人代表身份证照片:</span>
              <img :src="helper.getImgUrl(formdata.legalIdcardPic)" class="avatar"
                   @click="showBigpic(helper.getImgUrl(formdata.legalIdcardPic))">
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">营业执照照片:</span>
              <img :src="helper.getImgUrl(formdata.businessLicencePic)"
                   class="avatar"
                   @click="showBigpic(helper.getImgUrl(formdata.businessLicencePic))">
            </el-col>
          </div>
        </div>
        <div class="form-group clearfix">
          <div class="big-title">
            <i class="el-icon-tickets"></i>
            <span>公司运营者信息</span>
          </div>
          <div class="item-wrap">
            <el-col class="form-item" :sm="8">
              <span class="item-key">公司运营者:</span>
              <span class="item-value">{{formdata.operator}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">联系电话:</span>
              <span class="item-value">{{formdata.mobile}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">职务:</span>
              <span class="item-value">{{formdata.job}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">所属部门:</span>
              <span class="item-value">{{formdata.department}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">电子邮箱:</span>
              <span class="item-value">{{formdata.email}}</span>
            </el-col>
          </div>
        </div>
        <div class="form-group clearfix">
          <div class="big-title">
            <i class="el-icon-tickets"></i>
            <span>其他</span>
          </div>
          <div class="item-wrap">
            <el-col class="form-item" :sm="8">
              <span class="item-key">条码数量:</span>
              <span class="item-value">{{formdata.barCodeCount}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">条码功能:</span>
              <span class="item-value">{{getFnStatus(formdata.barCodeEnable)}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">芯片功能:</span>
              <span class="item-value">{{getFnStatus(formdata.icChipEnable)}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">采购数量:</span>
              <span class="item-value">{{formdata.purchaseQuantity}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">状态:</span>
              <span class="item-value">{{formdata.statusName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">隶属关系:</span>
              <span class="item-value">{{formdata.subjectionRelation}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">隶属组织名称:</span>
              <span class="item-value">{{formdata.subjection}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">申请理由:</span>
              <span class="item-value">{{formdata.applicationReason}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">工作语言:</span>
              <span class="item-value">{{formdata.workingLanguage}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">其他照片:</span>
              <img class="avatar"
                   @click="showBigpic(img.url)"
                   v-for="(img, index) in helper.getFlieList(formdata.otherPic)"
                   :key="index"
                   :src="img.url">
            </el-col>
          </div>
        </div>
      </el-form>
      <div class="form-btns">
        <div class="wrap">
          <el-button type="default" size="small" @click="edit">编辑</el-button>
          <el-button type="primary" size="small" @click="back2Paged">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import {mapState} from 'vuex'
  import {ENTERPRISE} from '../enterprise.config'

  export default {
    name: 'company-detail',
    _meta: {
      path: 'company/detail',
      title: '企业详情'
    },
    components: {
    },
    computed: {
      ...mapState([
        'tabs'
      ]),
      getMultipleSites() {
        return this.formdata.multipleSites === 0 ? '否' : '是'
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from.path === '/') {
          vm.$router.push('/')
          vm.$store.commit('REMOVE_TAB', vm.name)
        } else {
          vm.$store.commit('UPDATE_TAB', {
            ...to,
            title: to.meta.title,
            keep: to.meta.keep || false
          })
          if (to.query.id || vm.formdata.id) {
            vm.getData(to.query.id || vm.formdata.id)
          }
        }
      })
    },
    data() {
      return {
        helper,
        ENTERPRISE,
        formdata: {}
      }
    },
    methods: {
      edit() {
        this.$router.push({
          path: '/enterprise/controller/form',
          query: {
            id: this.formdata.id
          }
        })
      },
      back2Paged() {
        this.removeTab(this.$route.name)
      },
      removeTab(targetName) {
        let tabs = this.tabs
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              this.$router.push(this.tabs.find(t => { // 进入下一个tab
                return t.name === nextTab.name
              }).path)
            }
          }
        })
        this.$store.commit('REMOVE_TAB', targetName)
      },
      getData(id) {
        api.enterprise.get(id).then(data => {
          this.formdata = data
        })
      },
      getStatus(status) {
        if (status === 0) {
          return {
            klass: 'status0',
            name: '申请中'
          }
        } else if (status === 1) {
          return {
            klass: 'status1',
            name: '通过申请'
          }
        } else if (status === 2) {
          return {
            klass: 'status2',
            name: '拒绝申请'
          }
        }
      },
      getFnStatus(status) {
        if (status === 0) {
          return '未启用'
        } else if (status === 1) {
          return '启用'
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .form-wrapper
    width: 100%
    height: 100%
    overflow-y: scroll
    .form-box
      padding: 30px
      background: #f0f2f5
      .form
        background: #fff
        padding: 20px
        display: block
        .form-group
          width: 100%
          margin-bottom: 50px
          .item-wrap
            padding: 20px
            .form-item
              height: 30px
              /*line-height: 30px*/
              color: rgba(0, 0, 0, .85)
              .item-key
                font-size: 14px
                line-height: 20px
                color: rgba(0, 0, 0, .85)
              .item-value
                font-size: 14px
                line-height: 20px
                margin-left: 5px
                color: rgba(0, 0, 0, .65)
              .avatar
                width: 50px
                height: 50px
                display: inline-block
                vertical-align: bottom
          .big-title
            color: rgba(0, 0, 0, .85)
            font-size: 22px
            font-weight: bold
            padding-bottom: 5px
            margin-bottom: 10px
            border-bottom: 1px solid #dcdfe6
            span
              margin-left: 5px
      .form-btns
        display: block
        clear: both
        background: #ffffff
        .wrap
          width: 350px
          padding-bottom: 30px
          margin: auto
          button
            width: 150px
            margin-top: 12px

</style>
