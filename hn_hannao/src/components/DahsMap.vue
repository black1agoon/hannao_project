<template>
  <e-charts class="map" ref="charts" :options="chinaMapOptions">
  </e-charts>
</template>

<script>
  export default {
    name: 'dahs-map',
    props: {
      points: {
        type: Array,
        default: () => []
      }
    },
    components: {
    },
    data() {
      return {
        chinaMapOptions: {
          tooltip: {
            padding: 0,
            enterable: true,
            transitionDuration: 1,
            textStyle: {
              color: '#fff'
            },
            formatter: params => {
              return params.name
            }
          },
          geo: {
            show: true,
            map: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#023677',
                borderColor: '#1180c7',
              },
              emphasis: {
                areaColor: '#4499d0',
              }
            }
          },
          series: [
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: [],
              symbolSize: 10,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'left',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'yellow',
                  shadowBlur: 10,
                  shadowColor: 'yellow'
                }
              },
              zlevel: 1
            }
          ]
        }
      }
    },
    mounted() {
    },
    watch: {
      'points'() {
        this.chinaMapOptions.series[0].data = this.points
        this.$refs.charts.refresh()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>