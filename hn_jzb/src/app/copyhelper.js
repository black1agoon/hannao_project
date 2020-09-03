import messager from './messager'

let isEmpty = function (value) {
  return value === '' || value === null || value === undefined
}

/**
 * Copy model
 * @param model
 * @param propNames
 * @param deep
 * @param silent
 * @returns Object
 */
export default class CopyHelper {
  constructor(model, propNames = {}, deep = false, silent = false) {
    this.model = model
    this.propNames = propNames
    this.deep = deep
    this.silent = silent

    this.state = {}
    this.modelCopy = null

    this.sync()
  }

  sync() {
    this.modelCopy = this.deep ? JSON.parse(JSON.stringify(this.model)) : Object.assign({}, this.model)
  }

  isChanged() {
    return Boolean(Object.keys(this.model).find(k => {
      return (!this.silent || this.propNames[k]) &&
        (!isEmpty(this.modelCopy[k]) || !isEmpty(this.model[k])) &&
        (isNaN(this.modelCopy[k]) ? this.modelCopy[k] !== this.model[k] : +this.modelCopy[k] !== +this.model[k])
    }))
  }

  changes() {
    this.state = {}
    Object.keys(this.model).forEach(k => {
      if ((!this.silent || this.propNames[k]) &&
        (isNaN(this.modelCopy[k]) ? this.modelCopy[k] !== this.model[k] : +this.modelCopy[k] !== +this.model[k])) {
        this.state[k] = [this.model[k], this.modelCopy[k]]
      }
    })
    return this.state
  }

  reset() {
    Object.assign(this.model, this.modelCopy)
  }

  confirm() {
    if (this.isChanged()) {
      let changedLabels = Object.keys(this.changes()).map(k => this.propNames[k] || k)
      let msg = `<p>以下内容未保存，放弃这些更改？</p><p><strong>${changedLabels}</strong></p>`
      return messager.confirm('确认', msg).then(this.reset.bind(this))
    }
    return Promise.resolve('All Green')
  }
}
