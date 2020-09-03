<template>
  <div class="home-wrapper">
    <canvas class="mapbox" width="5200" height="5800" ref="map">
    </canvas>
  </div>
</template>

<script>
  import convert from 'xml-js'
  import mqtt from 'mqtt'
  import {MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD} from '@/assets/js/sysconstant.js'

  const options = {
    connectTimeout: 40000,
    clientId: 'mqtitId-Home',
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    clean: true
  }
  const scale = 50   // 坐标缩小倍数
  let client = mqtt.connect(MQTT_SERVICE, options)

  export default {
    name: 'home',
    components: {},
    computed: {
      context() {
        return this.$refs.map.getContext('2d')
        // return this.$refs.map.createCanvasContext('')
      },
      canvas() {
        return this.$refs.map
      }
    },
    data() {
      return {
        pointPos: [],
        pointObj: {},
        linePoint: [],
        picPos: [],
        carPosPoint: ''
      }
    },
    created() {
      this.mqttMSG()
    },
    methods: {
      loadXML(file) {
        let xmlDoc
        try {     // IE
          /* eslint-disable */
          xmlDoc = new ActiveXObject('Microsoft.XMLDOM')
          /* eslint-enable */
        } catch (e) {  // firefox,opera
          xmlDoc = document.implementation.createDocument('', '', null)
        }
        try {
          xmlDoc.asyc = false   // 是否异步调用
          xmlDoc.load(file)  // 文件路径
        } catch (e) {  // chrome
          let xmlhttp = new window.XMLHttpRequest()
          xmlhttp.open('GET', file, false)   // 创建一个新的http请求，并指定此请求的方法、URL以及验证信息
          xmlhttp.send(null)
          if (xmlhttp.readyState === 4) {
            xmlDoc = xmlhttp.responseXML.documentElement
          }
        }
        return xmlDoc
      },
      drawPic() {
        let img = new Image()
        img.onload = () => {
          // console.log(this.pointObj[this.carPosPoint].x, this.pointObj[this.carPosPoint].y)
          if (this.pointObj[this.carPosPoint]) {
            this.context.drawImage(img, this.pointObj[this.carPosPoint].x / scale - 25, this.pointObj[this.carPosPoint].y / scale - 19, 50, 38)
          }
        }
        img.src = require('@/assets/img/lg.png')
      },
      mqttMSG() {
        // mqtt连接
        client.on('connect', (e) => {
          // console.log('连接成功:')
          client.subscribe('hn/vehicle/pointChange', {qos: 1}, (error) => {
            if (!error) {
              // console.log('订阅成功')
            } else {
              // console.log('订阅失败')
            }
          })
        })
        // 接收消息处理
        client.on('message', (topic, message) => {
          // console.log('收到来自', topic, '的消息', message.toString())
          this.carPosPoint = message.toString().split(':')[1]
          this.clearPath()
          this.$nextTick(() => {
            this.drawPath()
            this.drawPic()
          })
        })
        // 断开发起重连
        client.on('reconnect', (error) => {
          // console.log('正在重连:', error)
        })
        // 链接异常处理
        client.on('error', (error) => {
          // console.log('连接失败:', error)
        })
      },
      drawPath() {
        // this.context.clearRect(0, 0, 5200, 5800)
        let xmlDoc = this.loadXML('/static/model.xml')
        let result = JSON.parse(convert.xml2json(xmlDoc.innerHTML, {compact: false, spaces: 4}))
        // console.log(result)
        let points = result['elements'].filter(e => e.name === 'point')
        let pointNames = points.map(point => point.attributes.name)
        let models = result['elements'].find(e => e.name === 'visualLayout')['elements']
        pointNames.forEach(name => {
          let pt = models.find(md => md.attributes.visualizedObjectName === name)
          let posX = pt.elements.find(p => p.attributes.name === 'POSITION_X')
          let posY = pt.elements.find(p => p.attributes.name === 'POSITION_Y')
          this.pointObj[name] = {
            x: Math.abs(posX.attributes.value),
            y: Math.abs(posY.attributes.value)
          }
        })

        let path = result['elements'].filter(e => e.name === 'path')
        let pathNames = path.map(path => ({
          name: path.attributes.name,
          path: [path.attributes.sourcePoint, path.attributes.destinationPoint]
        }))

        let lines = result['elements'].find(e => e.name === 'visualLayout').elements.filter(l => pathNames.find(pName => pName.name === l.attributes.visualizedObjectName))

        lines.forEach(line => {
          this.linePoint.push({
            path: pathNames.find(pName => pName.name === line.attributes.visualizedObjectName).path,
            type: line.elements[0].attributes.value,
            value: line.elements.length === 1 ? '' : line.elements[1].attributes.value
          })
        })
        this.context.fillStyle = 'rgb(6,64,122)'
        this.context.fillRect(0, 0, 5200, 5800)
        this.context.lineWidth = 2
        // context.outlineColor = 'red'
        this.context.strokeStyle = '#ffffff'
        this.linePoint.forEach(line => {
          this.context.beginPath()
          this.context.moveTo(this.pointObj[line.path[0]].x / scale, this.pointObj[line.path[0]].y / scale)
          if (line.type === 'DIRECT') {
            this.context.lineTo(this.pointObj[line.path[1]].x / scale, this.pointObj[line.path[1]].y / scale)
          } else if (line.type === 'BEZIER') {
            this.context.bezierCurveTo(...line.value.replace(/;/g, ',')
              .split(',')
              .concat([this.pointObj[line.path[1]].x / scale, this.pointObj[line.path[1]].y / scale]))
          }
          // else if (line.type === 'BEZIER_3') {
          //   let controlPoints = line.value.match(/^[^;]+|[^;]+$/g)
          //   let cp1 = controlPoints[0].split(',')
          //   let cp2 = controlPoints[1].split(',')
          //   // console.log(this.pointPos[line.path[1]])
          //   // console.log(...cp1, ...cp2, this.pointPos[line.path[1]][0] / scale, this.pointPos[line.path[1]][1] / scale)
          //   this.context.bezierCurveTo(...cp1, ...cp2, this.pointPos[line.path[1]][0] / scale, this.pointPos[line.path[1]][1] / scale)
          //   // this.context.bezierCurveTo(530, 520, 780, 410, 900, 500)
          // }
          this.context.stroke()  // 描边
        })

        Object.keys(this.pointObj).forEach(point => {
          if (this.pointObj[point]) {
            this.context.beginPath()
            this.context.arc(this.pointObj[point].x / scale, this.pointObj[point].y / scale, 5, 0, 2 * Math.PI, false)
            this.context.fillStyle = '#ffffff'
            this.context.fill()
            this.context.stroke()
          }
        })
        // this.context.fill()
      },
      clearPath() {
        // console.log('clear')
        this.context.clearRect(0, 0, 5200, 5800)
        // this.context = this.$refs.map.getContext('2d')
      }
    },
    mounted() {
      this.drawPath()
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-wrapper
    overflow: auto
    .mapbox
      background: #Ffffff
      border: 1px solid #000
</style>
