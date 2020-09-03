<template>
  <div class="box-wrapper">
    <div v-if="keyword" @click="resetInput" class="overlay"></div>
    <div class="box-inner">
      <input type="text" v-model="keyword" placeholder="输入手机品牌查询NFC">
      <span class="input-icon-right">
        <i class="search"></i>
      </span>
      <div class="dropbox" v-if="dropped">
        <slot v-if="filteredList.length > 0">
          <div v-for="(brand, idx) in filteredList" :key="idx">
            <div class="list-header">支持NFC的机型</div>
            <h3> {{ brand.names.split(',')[0] }}</h3>
            <template v-if="devices[brand.id].length">
              <p v-for="(device, ix) in devices[brand.id]" :key="ix"> {{ device }} </p>
            </template>
            <p v-else>暂不支持该品牌手机</p>
          </div>
        </slot>
        <slot v-else name="error">
          <p>未找到结果</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchDrop',

  data () {
    var _brands = [
      { id: 'samsung', names: '三星,samsung,galaxy' },
      { id: 'mi', names: '小米,xiaomi' },
      { id: 'huawei', names: '华为,huawei' },
      { id: 'apple', names: '苹果,apple,iphone' },
      { id: 'meizu', names: '魅族,meizu' },
      { id: 'oppo', names: 'OPPO' },
      { id: 'vivo', names: 'vivo' },
      { id: 'nubia', names: '努比亚,nubia' },
      { id: 'coolpad', names: '酷派,coolpad' },
      { id: 'sony', names: '索尼,sony,xperia' },
      { id: 'htc', names: 'HTC,宏达电' },
      { id: 'smartisan', names: '锤子,smartisan' },
      { id: 'motorola', names: '摩托罗拉,motorola' },
      { id: 'zte', names: '中兴,zte' },
      { id: 'microsoft', names: '微软,microsoft,lumia' },
      { id: 'nokia', names: '诺基亚,nokia' },
      { id: 'google', names: '谷歌,google,nexus' },
      { id: 'lg', names: 'LG' },
      { id: 'oneplus', names: '一加,oneplus' },
      { id: 'gionee', names: '金立,gionee' },
      { id: 'lenovo', names: '联想,lenovo' }
    ]
    var _devices = {
      'samsung': ['Galaxy S7 及以上', 'Galaxy S6 edge+', 'Galaxy S6 edge', 'Galaxy S6', 'Galaxy A9及高配版', 'Galaxy A8', 'Galaxy A7(2016)', 'Galaxy A5(2016)', 'GalaxyJ7(2016)', 'Galaxy J7', 'Galaxy J5(2016)', 'Galaxy J5', 'Galaxy J3 Pro', 'Galaxy J3', 'Galaxy Note5', 'Galaxy Note3 N9006', 'Galaxy Note3 N9008V', 'Galaxy Note3 N9008S（UICC,eSE）', 'Galaxy C5', 'Galaxy GRAND Prime', 'Galaxy MEGA2', 'Galaxy ALPHA G8508S', 'Galaxy CORE Lite 4G', 'Galaxy CORE Advance', 'W2016', 'W2015', '领世旗舰III G9198'],
      'mi': ['小米5 及以上', '小米 Mix系列', '小米 Note 2'],
      'huawei': ['Mate8 及以上', 'Mate7', 'MateS', '荣耀6高配版', '荣耀6plus双4G版', '荣耀V8全网通版'],
      'apple': ['iPhone 7 及以上'],
      'meizu': ['魅族PRO 5', 'Meizu MX4 Pro', 'Meizu MX3'],
      'oppo': ['OPPO Find7', 'OPPO Find5', 'OPPO N3', 'OPPO N1', 'OPPO A37', 'OPPO 3007', 'OPPO 3005'],
      'vivo': ['vivo Xplay 3S', 'vivo Xplay', 'vivo X5Pro'],
      'nubia': ['nubia Z9', 'nubia Z9 Max', 'nubia Z7 Max', 'nubia Z5 Mini', 'nubia Z5S LET版'],
      'coolpad': ['铂顿', '锋尚3', '锋尚2', '锋尚', '锋尚Air', '锋尚Air', '锋尚pro', '锋尚MAX'],
      'sony': ['Xperia XZ1', 'Xperia XZ Premium', 'Xperia XZs', 'Xperia Z5', 'Xperia Z3', 'Xperia Z2', 'Xperia Z1', 'Xperia Z', 'Xperia VL', 'Xperia T', 'Xperia SP', 'Xperia S', 'Xperia M', 'Xperia L'],
      'htc': ['HTC U11', 'HTC 10 lifestyle', 'HTC 10', 'New HTC One', 'HTC One E9+', 'HTC One M9', 'HTC One (M8)', 'HTC Desire 626'],
      'asus': ['ZenFone 2 及以上', 'Padfone 2', 'Padfone Infinity'],
      'smartisan': ['Smartisan T2', 'Smartisan T1', '坚果'],
      'motorola': ['Moto Z2', 'Moto Z', 'Moto X', 'Moto X Style'],
      'zte': ['中兴天机 7', 'AXON天机'],
      'microsoft': ['Lumia 950XL', 'Lumia 950', 'Lumia 650'],
      'nokia': ['诺基亚N9'],
      'google': ['Nexus系列', 'Pixel系列'],
      'lg': ['LG G4 及以上', 'LG G3 Beat', 'LG G3', 'LG G2', 'LG V10', 'LG AKA'],
      'oneplus': ['一加手机5', '一加手机3', '一加手机1'],
      'gionee': ['风华3'],
      'lenovo': ['乐檬X3']
    }

    return {
      keyword: '',
      brands: _brands,
      devices: _devices
    }
  },
  computed: {
    filteredList: function () {
      return this.dropped ? this.brands.filter(
        brand => brand.names.toLowerCase().indexOf(this.keyword.trim().toLowerCase() || false) >= 0
      ) : []
    },
    dropped: function () {
      return this.keyword && this.keyword.length > 1
    }
  },
  methods: {
    resetInput: function () {
      this.keyword = ''
    }
  }
}
</script>

<style scoped>
.box-wrapper {
  width: 200px;
  height: 23px;
  font-size: 12px;
  position: relative;
  border: 1px solid white;
}

input {
  width: 186px;
  padding-left: 5px;
  height: 23px;
  line-height: 23px;
  min-width: 142px;
  color: #ffffff;
  background: none;
  padding-right: 15px;
  box-sizing: border-box;
}
input:focus {
  outline: none;
}
.input-icon-right {
  position: absolute;
  right: 5px;
  top: 4px;
}
.search {
  display: block;
  width: 14px;
  height: 14px;
  background-image: url("../../assets/img/search.png");
  background-size: 14px 14px;
  background-repeat: no-repeat;
}
.dropbox {
  background-color: white;
  border: 0;
  position: absolute;
  z-index: 100;
  width: 100%;
  max-height: 400px;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
  overflow-y: auto;
  overflow-x: hidden;
  top: 26px;
}
.dropbox h3 {
  padding-left: 10px;
  white-space: normal;
}
.dropbox p {
  padding-left: 10px;
  white-space: normal;
  height: 20px;
  line-height: 20px;
}

.icomoon-close {
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
}
.box-inner {
  z-index: 300;
}
.list-header {
  padding-top: 10px;
  text-align: center;
  color: gray;
}
input::-webkit-input-placeholder {
  color: #ffffff;
}
input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #ffffff;
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #ffffff;
}
input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #ffffff;
}
input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #ffffff;
}
</style>
