function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  }
}

function describeArc (x, y, radius, startAngle, endAngle) {

  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ')
}


const defaultRoseConfig = {
  valueField: 'value',
  innerRadius: 38,
  outerRadius: 82,
  deltaWidth: 6,
  point: [94, 94],
}

/**
 * Get rose path (area)
 * @param items
 * @param config
 * @returns {*}
 */
function describeRose (items, config = defaultRoseConfig) {
  const { valueField, innerRadius, outerRadius, deltaWidth, point } = Object.assign({}, defaultRoseConfig, config)
  const colors = ['#AB1BFE', '#25C2FF', '#48F3FA', '#FFF369', '#F813AB', '#136BF8']
  const arcItems = items.map((item, idx) => {
    let rw = (outerRadius - idx * deltaWidth) ** 2 - innerRadius ** 2
    rw = rw > 0 ? rw : 1
    return {
      item,
      arc0: item[valueField] / rw,
    }
  })
  const total = arcItems.reduce((r, m) => r + m.arc0, 0)
  return arcItems
    .reduce((r, m) => {
      const delta = +(m.arc0 / total * 270).toFixed()
      const lastEnd = r[r.length - 1]?.end || 0
      return [...r, { item: m.item, start: lastEnd, end: lastEnd + delta }]
    }, [])
    .map((m, idx) => {
      const width = outerRadius - innerRadius - idx * deltaWidth
      return {
        ...m.item,
        d: describeArc(point[0], point[0], innerRadius + width / 2, 450 - m.end, 450 - m.start),
        color: colors[idx % colors.length],
        width,
      }
    })
}

/**
 * Get rose path (arc)
 * @param items
 * @param config
 * @returns {*}
 */
function describeRoseArc (items, config = defaultRoseConfig) {
  const { valueField, innerRadius, outerRadius, deltaWidth, point } = config
  const colors = ['#AB1BFE', '#25C2FF', '#48F3FA', '#FFF369', '#F813AB', '#136BF8']
  const total = items.reduce((r, item) => r + (+item[valueField] || 0), 0)
  return items
    .reduce((r, item) => {
      const delta = +(item[valueField] / total * 270).toFixed()
      const lastEnd = r[r.length - 1]?.end || 0
      return [...r, { item, start: lastEnd, end: lastEnd + delta }]
    }, [])
    .map((m, idx) => {
      const width = outerRadius - innerRadius - idx * deltaWidth
      return {
        ...m.m,
        d: describeArc(point[0], point[0], innerRadius + width / 2, 450 - m.end, 450 - m.start),
        color: colors[idx % colors.length],
        width,
      }
    })
}

export {
  describeArc,
  describeRose,
  describeRoseArc,
}
