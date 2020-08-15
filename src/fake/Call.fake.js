import _ from 'lodash'
import events from './events'

let currentCall = null
let allowedCreate = false

export default class Call extends EventTarget {
  constructor(data) {
    super()
    this.targetName = data.targetName;
    this.isIncomming = data.isIncomming;
    this.isOutcomming = data.isOutcomming;
    this.id = Math.random();
  }

  static onEvent(event, data) {
    if (event === 'create') {
      if (currentCall) throw new Error('Call is created')
      allowedCreate = true
      currentCall = new Call(data)
      allowedCreate = false
      console.log(currentCall.id, 'Call');
      events.emit('call', currentCall)
      setTimeout(() => {
        console.log(currentCall.id, 'Emit initialized');
        currentCall._emit('initialized');
      }, 100)
      return
    }
    if (!currentCall) return
    if (event === 'pick_up') {
      setTimeout(() => {
        console.log(currentCall.id, 'Emit pick_up');
        currentCall._emit('pick_up', data)
      }, 100)
    }
    if (event === 'state_changed') {
      setTimeout(() => {
        console.log(currentCall.id, 'Emit state_changed');
        currentCall._emit('state_changed', data)
      }, 100)
    }
    if (event === 'hang_up') {
      console.log(currentCall.id, 'Emit hang_up');
      currentCall._emit('hang_up')
      currentCall = null
    }
    if (event === 'error') {
      setTimeout(() => {
        console.log(currentCall.id, 'Emit error');
        currentCall._emit('error', data)
        currentCall = null
      }, 100)
    }
  }

  async pickUp(data) {
    console.log(this.id, 'Call.pickUp', data)
  }

  async hangUp() {
    console.log(this.id, 'Call.hangUp')
  }

  async setVolume(volume) {
    console.log(this.id, 'Call.setVolume', volume)
  }

  async setMic(isEnabled) {
    console.log(this.id, 'Call.setMic', isEnabled)
  }

  async setVideo(isEnabled) {
    console.log(this.id, 'Call.setVideo', isEnabled)
  }

  _emit(event, data) {
    const e = _.extend(new Event(event), data, {native: data})
    this.dispatchEvent(e)
  }

  on(event, handler) {
    console.log(this.id, 'Call on', event);
    this.addEventListener(event, handler)
  }

  off(event, handler) {
    console.log(this.id, 'Call off', event);
    this.removeEventListener(event, handler)
  }
}
