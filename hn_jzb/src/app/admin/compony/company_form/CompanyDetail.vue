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
              <span class="item-key">登录名:</span>
              <span class="item-value">{{formdata.username}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">到期时间:</span>
              <span class="item-value">{{formdata.expireDate}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">代理商:</span>
              <span class="item-value">{{formdata.agentIdName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">企业中文名:</span>
              <span class="item-value">{{formdata.cnName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">企业英文名:</span>
              <span class="item-value">{{formdata.enName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">所属行业:</span>
              <span class="item-value">{{formdata.industryName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">企业等级:</span>
              <span class="item-value">{{formdata.gradeName}}</span>
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
              <span class="item-value">{{formdata.regionName}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">是否为多场地办公:</span>
              <span class="item-value">{{getMultipleSites}}</span>
            </el-col>
            <el-col class="form-item" :sm="8" v-show="this.formdata.multipleSites === 1">
              <span class="item-key">多场地地址:</span>
              <span class="item-value">{{formdata.multipleSitesAddress}}</span>
            </el-col>
            <div class="clearfix" style="clear: both">
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
              <span class="item-value">{{formdata.telephone}}</span>
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
              <span class="item-key">客户服务经理:</span>
              <span class="item-value">{{formdata.csmIdName}}</span>
            </el-col>
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
            <!--<el-col class="form-item" :sm="8">-->
              <!--<span class="item-key">审核信息:</span>-->
              <!--<span class="item-value">{{formdata.statusReview}}</span>-->
            <!--</el-col>-->
            <el-col class="form-item" :sm="8">
              <span class="item-key">工作语言:</span>
              <span class="item-value">{{formdata.workingLanguage}}</span>
            </el-col>
            <el-col class="form-item" :sm="8">
              <span class="item-key">授权秘钥
:</span>
              <span class="item-value">{{formdata.secretKey}}</span>
            </el-col>
            <div class="clearfix" style="clear: both">
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
        </div>
        <div class="form-group clearfix" v-show="tableOptions.total > 0">
          <div class="big-title">
            <i class="el-icon-tickets"></i>
            <span>合作申请</span>
          </div>
          <div class="item-wrap table-wrap">
            <eui-table
              :show-pagination="false"
              ref="table"
              :options="tableOptions">
              <template slot="prev">
                <el-table-column label="企业名称" prop="cnName" align="center" width="200" fixed="left">
                </el-table-column>
                <el-table-column label="状态" width="100">
                  <template slot-scope="scope">
                    <i :class="['icon', getStatus(scope.row.status).klass]"></i><span>{{getStatus(scope.row.status).name}}</span>
                  </template>
                </el-table-column>
              </template>
              <el-table-column label="操作" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="go2Audit(scope.row.id)">
                    <i class="btn-icon fa fa-search"></i>查看
                  </el-button>
                </template>
              </el-table-column>
            </eui-table>
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
    <pic-looking-mask
      ref="piclook"
      :src="showPicUrl">
    </pic-looking-mask>
  </div>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import {mapState} from 'vuex'
  import {COMPANY_DETAIL} from '../company.config'
  import EuiTable from '@/components/common/form/EuiTable'

  export default {
    name: 'company-detail',
    _meta: {
      path: 'company/detail',
      title: '企业详情'
    },
    components: {
      EuiTable
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
        COMPANY_DETAIL,
        formdata: {},
        showPicUrl: null,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'industryIdName', label: '所属行业', width: 200},
            {prop: 'legalRepresentative', label: '法人代表', width: 200},
            {prop: 'startTime', label: '合作开始时间', width: 200},
            {prop: 'endTime', label: '合作结束时间', width: 200},
            {prop: 'operator', label: '公司运营者', width: 200},
            {prop: 'telephone', label: '联系电话', width: 200},
            {prop: 'employees', label: '员工总数', width: 200},
            {prop: 'regAddress', label: '企业注册地址', width: 200},
            {prop: 'regAddressCode', label: '注册地址邮编', width: 200},
            {prop: 'regionName', label: '地址所属区域', width: 200},
            {prop: 'operateAddress', label: '运营地址', width: 200},
            {prop: 'year', label: '合作申请年度', width: 200}
          ],
          rowClick: (row, event, column) => {
          },
          rowDblclick: (row, event) => {
            // if (this.formdata.id) {
            //   this.$router.push({
            //     path: '/company/infoform',
            //     query: {
            //       action: 'edit',
            //       formdata: this.formdata
            //     }
            //   })
            // }
          }
        }
      }
    },
    methods: {
      edit() {
        this.$router.push({
          path: '/company/infoform',
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
      showBigpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      },
      getData(id) {
        api.company.getCompanyDetail(id).then(data => {
          this.formdata = data.companyDto
          this.tableOptions.data = data.companyCooApplyDtoList
          this.tableOptions.total = data.companyCooApplyDtoList.length
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
      },
      go2Audit(id) {
        this.$router.push({
          path: '/company/cooper',
          query: {
            id: id
          }
        })
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
            &.table-wrap
              height: 300px
              border: 1px solid #dcdfe6
              .icon
                width: 15px
                height: 15px
                display: inline-block
                border-radius: 50%
                margin-right: 5px
                vertical-align: middle
                &.status0
                  background: orange
                &.status1
                  background: #67c23a
                &.status2
                  background: #f78989
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
