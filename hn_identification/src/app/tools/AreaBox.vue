<template>
  <eui-input
      type="cascader"
      :cascader-item-change="areaChange"
      :cascader-list="areaList"
      :show-all-levels="true"
      @change="valueChange"
      :options="options">
  </eui-input>
</template>

<script>
  import EuiInput from '@/components/common/form/EuiInput'
  import api from '@/api'
  export default {
    name: 'area-box',
    components: {
      EuiInput
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    computed: {
    },
    data() {
      return {
        options: [],
        areaList: []
      }
    },
    methods: {
      valueChange(val) {
        this.$emit('input', val)
      },
      areaChange(val) {
        if (val.length === 1) {
          api.public.getAreaCities(val[0]).then(cities => {
            this.options.find(item => item.value === val[0]).children = Object.keys(cities).map(key => ({
              label: cities[key],
              value: key,
              children: []
            }))
          })
        } else if (val.length === 2) {
          api.public.getAreaDistrict(val[1]).then(districts => {
            this.options.find(item => item.value === val[0]).children
              .find(item => item.value === val[1])
              .children = Object.keys(districts).map(key => ({
              label: districts[key],
              value: key,
              children: []
            }))
          })
        } else if (val.length === 3) {
          api.public.getAreaTown(val[2]).then(town => {
            this.options.find(item => item.value === val[0]).children.find(item => item.value === val[1]).children.find(item => item.value === val[2])
              .children = Object.keys(town).map(key => ({
              label: town[key],
              value: key
            }))
          })
        }
      },
      getProv() {
        api.public.getAreaProv().then(data => {
          this.options = Object.keys(data).map(key => ({
            label: data[key],
            value: key,
            children: []
          }))
        })
      },
      getAreaList() {
        if (this.value) {
          api.public.getAreaById(this.value).then(data => {
            let fullPathMap = data.fullPathMap
            api.public.getAreaCities(fullPathMap.prov).then(cities => {
              this.options.find(item => item.value === fullPathMap.prov).children = Object.keys(cities).map(key => ({
                label: cities[key],
                value: key,
                children: []
              }))
              api.public.getAreaDistrict(fullPathMap.city).then(districts => {
                this.options.find(item => item.value === fullPathMap.prov).children.find(item => item.value === fullPathMap.city).children = Object.keys(districts).map(key => ({
                  label: districts[key],
                  value: key,
                  children: []
                }))
                // this.$forceUpdate()
                api.public.getAreaTown(fullPathMap.district).then(town => {
                  this.options.find(item => item.value === fullPathMap.prov).children.find(item => item.value === fullPathMap.city).children.find(item => item.value === fullPathMap.district)
                    .children = Object.keys(town).map(key => ({
                    label: town[key],
                    value: key
                  }))
                })
                this.areaList = [fullPathMap.prov, fullPathMap.city, fullPathMap.district, fullPathMap.town]
              })
            })
          })
        } else {
          this.areaList = []
        }
      }
    },
    mounted() {
      this.getProv()
      this.getAreaList()
    },
    watch: {
      'value'() {
        this.getAreaList()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>