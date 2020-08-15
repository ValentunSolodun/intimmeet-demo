import Call from './Call.fake'
import events from './events'

export async function initialize(userGuid) {
  console.log('initialize.initialize', userGuid)
  // throw new Error('Cannot initialize')
}

export async function callRequest(targetGuid, options) {
  console.log('initialize.callRequest', targetGuid, options)
  // throw new Error('user offline')
}

export function onCall(handler) {
  events.on('call', handler)
}

export function offCall(handler) {
  events.off('call', handler)
}

// onCall(({native}) => {
//   // dispatch({SHOW_CALLING})
//   const call = native;
//   call.on('pick_up', () => {
//     // dispatch({START_CONVERSATION})
//   })
//   call.on('hang_up', () => {
//     // dispatch({END_CONVERSATION})
//   })
//   call.on('error', () => {
//     // dispatch({END_CONVERSATION})
//   })
// })


/*

#subscriber
#publisher

* onCallEvent('create', {isIncomming, isOutcomming, targetName}) => onCall => the call 'event.native'
* onCallEvent('pick_up') => call.on
* onCallEvent('hang_up') => call.on
* onCallEvent('state_changed') => call.on
* onCallEvent('error', data) => call.on
*
* */
window.onCallEvent = Call.onEvent
