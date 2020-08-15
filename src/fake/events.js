import _ from 'lodash'

class EventEmitter extends EventTarget {
  emit(event, data) {
    const e = _.extend(new Event(event), data, { native: data })
    this.dispatchEvent(e)
  }

  on(event, handler) {
    this.addEventListener(event, handler)
  }

  off(event, handler) {
    this.removeEventListener(event, handler)
  }
}

export default new EventEmitter()
