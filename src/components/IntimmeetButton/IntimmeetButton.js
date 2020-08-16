import React, {useState} from 'react';
import './IntimmeetButton.css';
import Icon from '../Icon';
import {IntimMeet} from '../../fake';
// import {IntimMeet} from 'client-lib';
import Dropdown from '../Dropdown';
import cn from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import Button from '../Button';

const MENU_ITEM = [
  {id: 1, name: 'Approvals', icon: '/images/icons/approvals.svg'},
  {id: 2, name: 'Call Log', icon: '/images/icons/call_logs.svg'},
  {id: 3, name: 'Speed Date', icon: '/images/icons/speed_date.svg'},
  {id: 4, name: 'Images', icon: '/images/icons/images.svg'},
  {id: 5, name: 'Credit Manager', icon: '/images/icons/credit_manager.svg'},
  {id: 6, name: 'Settings', icon: '/images/icons/settings.svg'},
];

const MENU_ITEM_WITH_USER = [
  {id: 1, name: 'Call', icon: '/images/icons/call.svg'},
  {id: 2, name: 'Video Call', icon: '/images/icons/video_call.svg'},
  {id: 3, name: 'Speed Date', icon: '/images/icons/speed_date_color.svg'},
  {id: 4, name: 'Images', icon: '/images/icons/images.svg'},
  {id: 5, name: 'Passion & Truth Detector', icon: '/images/icons/passion_and_truth.svg'},
  {id: 6, name: 'Settings', icon: '/images/icons/settings.svg'},
];

const CollingContainer = ({children, offsetTop = '33%', style, ...args}) => {
  return (
    <div {...args} style={{top: offsetTop, ...style}} className='calling-container'>
      {children}
    </div>
  )
};

// const ControlButtonItem = ({handlerOnClick, imgSrc}) => {
//   return (
//     <Icon className='common-control-button-style' onClick={handlerOnClick} imgSrc={imgSrc}/>
//   )
// };

const Publisher = ({...args}) => {
  return (
    <div {...args} id='publisher'/>
  )
};

const Subscriber = ({...args}) => {
  return (
    <div {...args} id='subscriber'></div>
  )
};

const ControlButton = ({
                         isVideo,
                         isIncoming,
                         publishAudio,
                         publishVideo,
                         subscribeVideo,
                         subscribeAudio,
                         handlersOfCall = {},
                       }) => {
  return (
    <div className='calling-container__control-button'>
      {
        isIncoming ? (
          <>
            <Icon onClick={handlersOfCall.handlerHangUp} imgSrc='/images/icons/hung_up.svg'/>
            <Icon onClick={() => handlersOfCall.handlerPickUp({publishVideo: false, publishAudio: true})}
                  imgSrc='/images/icons/pick_up.svg'/>
            <Icon onClick={() => handlersOfCall.handlerPickUp({publishVideo: true, publishAudio: true})}
                  imgSrc='/images/icons/ongoing_call__video.svg'/>
          </>
        ) : isVideo ?
          (
            <>
              {
                publishVideo ?
                  (<Icon onClick={() => handlersOfCall.handlerSetVideo(!publishVideo)}
                         imgSrc='/images/icons/ongoing_call__video.svg'/>)
                  :
                  (<Icon onClick={() => handlersOfCall.handlerSetVideo(!publishVideo)}
                         imgSrc='/images/icons/blue_video_muted.svg'/>)
              }
              {
                publishAudio ?
                  (<Icon onClick={() => handlersOfCall.handlerSetAudio(!publishAudio)}
                         imgSrc='/images/icons/ongoing_call__mute.svg'/>)
                  :
                  (<Icon onClick={() => handlersOfCall.handlerSetAudio(!publishAudio)}
                         imgSrc='/images/icons/blue_micro_muted_bigger.svg'/>)
              }
              <Icon onClick={handlersOfCall.handlerHangUp} imgSrc='/images/icons/ongoing_call_end_call.svg'/>
            </>
          ) :
          (<>
            <Icon onClick={handlersOfCall.handlerSetVolume} imgSrc='/images/icons/ongoing_call__off_volume.svg'/>
            {
              publishVideo ?
                (<Icon onClick={() => handlersOfCall.handlerSetVideo(!publishVideo)}
                       imgSrc='/images/icons/ongoing_call__video.svg'/>)
                :
                (<Icon onClick={() => handlersOfCall.handlerSetVideo(!publishVideo)}
                       imgSrc='/images/icons/blue_video_muted.svg'/>)
            }
            {
              publishAudio ?
                (<Icon onClick={() => handlersOfCall.handlerSetAudio(!publishAudio)}
                       imgSrc='/images/icons/ongoing_call__mute.svg'/>)
                :
                (<Icon onClick={() => handlersOfCall.handlerSetAudio(!publishAudio)}
                       imgSrc='/images/icons/blue_micro_muted_bigger.svg'/>)
            }
            <Icon onClick={handlersOfCall.handlerHangUp} imgSrc='/images/icons/ongoing_call_end_call.svg'/>
          </>)
      }

    </div>
  )
};

const IncomingCall = ({fullName, handlersOfCall}) => {
  return (
    <CollingContainer>
      <div className='calling-container__full-name-of-client'>
        {fullName}
      </div>
      <ControlButton handlersOfCall={handlersOfCall} isIncoming={true}/>
    </CollingContainer>
  )
};

const ConnectingClient = ({name, fullName, handlersOfCall, publishVideo, publishAudio}) => {
  return (
    <CollingContainer>
      <div className='calling-container__connection-top-icons'>
        <div/>
        <div>
          <Icon imgSrc='/images/icons/gray_dont_enter.svg'/>
          <Icon imgSrc='/images/icons/gray_alert.svg'/>
        </div>
      </div>
      <div className='calling-container__client-info-tip'>
        <b>Waiting for {name} to answer</b>
        <span>
          <b>TIP:</b> Keep the call short. Save the lengthy talk for your first date!
        </span>
      </div>
      <ControlButton publishVideo={publishVideo} publishAudio={publishAudio} handlersOfCall={handlersOfCall}/>
      <div className='calling-container__full-name-of-client'>
        {fullName}
      </div>
    </CollingContainer>
  )
};

const ConnectedClient = ({name, fullName, timeOfCall, handlersOfCall, publishAudio, publishVideo, subscribeAudio, style}) => {
  return (
    <CollingContainer style={style}>
      <div className='calling-container__time-of-call'>
        <div>{timeOfCall}</div>
        <div>You are in a call with <br/> <b>{fullName}</b></div>
        {
          !subscribeAudio ? (
            <div>
              <Icon imgSrc='/images/icons/blue_micro_muted.svg'/>
            </div>
          ) : null
        }
      </div>
      <div className='calling-container__voice-indicator'>
        <img src="/images/icons/voice_indicator.svg" alt="Voice Indicator"/>
      </div>
      <div className='calling-container__tip'>
        <span>
          <b>TIP:</b> Show interest by being a good listener
        </span>
      </div>
      <ControlButton publishVideo={publishVideo} publishAudio={publishAudio} handlersOfCall={handlersOfCall}/>
    </CollingContainer>
  )
};

const EndedCall = ({fullName, handlerOnClickProfile, name, timeOfCall, reliability = 56, interest = 80}) => {
  return (
    <CollingContainer>
      <div className='calling-container__connection-top-icons'>
        <div>{timeOfCall}</div>
        <div>
          <Icon imgSrc='/images/icons/gray_dont_enter.svg'/>
          <Icon imgSrc='/images/icons/gray_alert.svg'/>
        </div>
      </div>


      <div className='calling-container__ended-call-info'>
        <div>Voice Call Ended {timeOfCall}</div>
        <div>
          <img src="/images/icons/voice_indicator_white.svg" alt="Voice Indicator"/>
        </div>
        <div className='audio-emotion-analysis'>
          <Icon imgSrc="/images/icons/pink_heart.svg"/>
          <span>Audio-emotion Analysis</span>
        </div>
        <div>Indicates {name} was</div>

        <div className='calling-container__indicates'>
          <div>
            <Icon imgSrc='/images/icons/double_check.svg'/>
            <div className='calling-container__indicates_item'>
              <span>{reliability + '%'}</span>
              <span>Reliability</span>
            </div>
          </div>
          <div>
            <Icon imgSrc='/images/icons/double_heart.svg'/>
            <div className='calling-container__indicates_item'>
              <span>{interest + '%'}</span>
              <span>Interest</span>
            </div>
          </div>
        </div>
      </div>

      <div className='calling-container__full-name-of-client'>
        {fullName}
      </div>

      <div>
        <Button onClick={handlerOnClickProfile} style='red' label='Close'/>
      </div>
    </CollingContainer>
  )
};

const ConnectingVideoClient = ({name, connecting, fullName, imgSrcBackground, handlersOfCall, publishVideo, publishAudio}) => {

  const [typeOfVideoCall, setTypeOfVideoCall] = useState(connecting ? 'regular' : '');

  return (
    <CollingContainer offsetTop='10%'>
      <div className='calling-container__video-container'>
        <div style={{backgroundImage: `url("${imgSrcBackground}")`}}
             className='calling-container__background-placeholder'>
          <div className='calling-container__video-overlay'/>
          {
            !typeOfVideoCall ? (
              <>
              <span>
                Start a regular video call with {name} or <b>gamify</b> the video call to break the
                ice and make it more fun.
              </span>
                <div>
                  <Button
                    onClick={() => setTypeOfVideoCall('regular')}
                    leftIcon={<Icon imgSrc='/images/icons/video_white.svg'/>}
                    style='red'
                    label='Regular Video Call'
                  />
                  <Button
                    leftIcon={<Icon imgSrc='/images/icons/gamify.svg'/>}
                    style='red'
                    label='Gamify the Call'
                  />
                </div>
              </>
            ) : typeOfVideoCall === 'regular' ? (
              <div>
                <span><b>Waiting for {name} to answer</b></span>
                <div>
                  <Icon style={{height: 44, width: 44, margin: '0px auto 11px auto'}}
                        imgSrc='/images/icons/white_border_phone.svg'/>
                  <span>
                    <b>TIP:</b>
                    <br/>
                    Keep the call short.
                    Save the lengthy talk
                    for your first date!
                  </span>
                </div>
              </div>
            ) : null
          }
        </div>
        <div>
          <div>
            {fullName}
          </div>
          <ControlButton publishVideo={publishVideo} publishAudio={publishAudio} handlersOfCall={handlersOfCall}
                         isVideo={true}/>
        </div>
      </div>
    </CollingContainer>
  )
};

const ProgressBarr = ({progress, ...args}) => {

  if (!_.isNumber(progress)) progress = 0;
  if (_.isNumber(progress) && progress > 100) progress = 100;
  if (_.isNumber(progress) && progress < 0) progress = 0;

  return (
    <div {...args} className='progress-bar-container'>
      <div className='progress-bar-container__item-line'/>
      <div style={{width: progress + '%'}} className='progress-bar-container__item-progress'/>
      <div style={{left: progress + '%'}} className='progress-bar-container__progress-indicator'/>
    </div>
  )
};

//TODO: Need to implement video element
const ConnectedVideoClient = ({publishAudio, subscribeVideo, publishVideo, passion = 20, name, timeOfCall, fullName, imgSrcBackground, handlersOfCall, subscribeAudio, style}) => {
  return (
    <CollingContainer offsetTop='10%' style={{paddingTop: 50, ...style}}>
      <div className='calling-container__video-container'>
        <div className='calling-container__passion-detector-text'>Passion Detector</div>
        <ProgressBarr style={{position: "absolute", top: 32, left: 0}} progress={50}/>

        <div className='calling-container__video-element'>
          <Subscriber style={{display: subscribeVideo ? 'block' : 'none'}}/>
          <Publisher style={{display: 'none'}}/>
          <div className='calling-container__connection-top-icons top-icons-into-video-call'>
            <div>{timeOfCall}</div>
            <div>
              {
                !subscribeAudio ? (<Icon imgSrc='/images/icons/blue_micro_muted.svg'/>) : null
              }
              <Icon imgSrc='/images/icons/white_dont_enter.svg'/>
              <Icon imgSrc='/images/icons/white_alert.svg'/>
            </div>
          </div>
          <div className='calling-container__tip tip-into-video-call'>
            <span>
              <b>TIP:</b> Show interest by being a good listener
            </span>
          </div>
        </div>

        <div className='calling-container__video-control-button_container'>
          <div>
            You are in a call with
            <br/>
            <b>{fullName}</b>
          </div>
          <ControlButton publishVideo={publishVideo} publishAudio={publishAudio} handlersOfCall={handlersOfCall}
                         isVideo={true}/>
        </div>
      </div>
    </CollingContainer>
  )
};

const EndedVideoCall = ({name, timeOfCall, fullName, handlerOnClickProfile}) => {
  return (
    <CollingContainer offsetTop='10%'>
      <div className='calling-container__video-container call-ended'>
        {/*<div className='calling-container__passion-detector-text'>Passion Detector</div>*/}
        {/*<ProgressBarr style={{position: "absolute", top: 32, left: 0}} progress={50}/>*/}

        <div className='calling-container__connection-top-icons top-icons-into-video-call'>
          <div>{timeOfCall}</div>
          <div>
            <Icon imgSrc='/images/icons/white_dont_enter.svg'/>
            <Icon imgSrc='/images/icons/white_alert.svg'/>
          </div>
        </div>
        <div className='calling-container__ended-call-info'>
          <div>Video Call Ended {timeOfCall}</div>
          <div className='audio-emotion-analysis'>
            <Icon imgSrc="/images/icons/pink_heart.svg"/>
            <span>Audio-emotion Analysis</span>
          </div>
          <div>
            {name} showed the highest
            passion levels throughout the call.
            Love is in the air
          </div>
          <div>
            <Button style='red' label='How truthful was Denise?'/>
          </div>
        </div>

        {/*<div className='calling-container__video-control-button_container'>*/}
        {/*  <div>*/}
        {/*    You are in a call with*/}
        {/*    <br/>*/}
        {/*    <b>{fullName}</b>*/}
        {/*  </div>*/}
        {/*    <ControlButton handlersOfCall={handlersOfCall} isVideo={true}/>*/}
        {/*</div>*/}
      </div>
      <div className='calling-container__full-name-of-client'>
        {fullName}
      </div>

      <div>
        <Button onClick={handlerOnClickProfile} style='red' label='Close'/>
      </div>
    </CollingContainer>
  )
};

const CallingComponent = ({
                            handlerPickUp,
                            handlerHangUp,
                            handlerSetVolume,
                            handlerSetAudio,
                            handlerSetVideo,
                            name,
                            targetName,
                            handlerOnClickProfile,
                            fullName,
                            isIncomingCall,
                            connecting,
                            connected,
                            publishVideo,
                            publishAudio,
                            subscribeVideo,
                            subscribeAudio,
                            imgSrc,
                            timeOfCall,
                            callEnded
                          }) => {

  const handlersOfCall = {
    handlerPickUp,
    handlerHangUp,
    handlerSetVolume,
    handlerSetAudio,
    handlerSetVideo,
  };


  const renderWithoutVideo = () => {
    if (connecting) return <ConnectingClient publishVideo={publishVideo} publishAudio={publishAudio}
                                             handlersOfCall={handlersOfCall} fullName={fullName} name={name}/>
    // if (connected) return <ConnectedClient subscribeAudio={subscribeAudio}
    //                                        publishAudio={publishAudio} publishVideo={publishVideo}
    //                                        handlersOfCall={handlersOfCall}
    //                                        fullName={fullName} timeOfCall={timeOfCall}/>
    if (callEnded) return <EndedCall handlerOnClickProfile={handlerOnClickProfile} fullName={fullName}
                                     timeOfCall={timeOfCall} name={name}/>
    return null;
  };

  const renderWithVideo = () => {
    if (connecting) return <ConnectingVideoClient publishVideo={publishVideo} publishAudio={publishAudio}
                                                  handlersOfCall={handlersOfCall} connecting={connecting}
                                                  imgSrcBackground={imgSrc} fullName={fullName}
                                                  name={name}/>
    // if (connected) return <ConnectedVideoClient subscribeAudio={subscribeAudio}
    //                                             publishAudio={publishAudio} publishVideo={publishVideo}
    //                                             handlersOfCall={handlersOfCall}
    //                                             fullName={fullName}
    //                                             timeOfCall={timeOfCall}/>
    if (callEnded) return <EndedVideoCall handlerOnClickProfile={handlerOnClickProfile} fullName={fullName}
                                          timeOfCall={timeOfCall} name={name}/>
    return null;
  };

  return (
    <>
      <ConnectedClient style={{display: !subscribeVideo && connected ? 'block' : 'none'}}
                       subscribeAudio={subscribeAudio}
                       publishAudio={publishAudio} publishVideo={publishVideo}
                       handlersOfCall={handlersOfCall}
                       fullName={fullName} timeOfCall={timeOfCall}/>
      <ConnectedVideoClient style={{display: subscribeVideo && connected ? 'block' : 'none'}}
                            subscribeAudio={subscribeAudio}
                            subscribeVideo={subscribeVideo}
                            publishAudio={publishAudio} publishVideo={publishVideo}
                            handlersOfCall={handlersOfCall}
                            fullName={fullName}
                            timeOfCall={timeOfCall}/>
      {
        isIncomingCall ? <IncomingCall handlersOfCall={handlersOfCall}
                                       fullName={targetName}/> : subscribeVideo ? renderWithVideo() : renderWithoutVideo()
      }
    </>
  )
};

const Error = ({text}) => {

  const style = {
    position: 'absolute',
    top: 20,
    left: '50%',
    background: '#fff',
    borderRadius: 10,
    transform: 'translateX(-50%)',
    color: '#E44156',
    padding: '10px 20px',
    zIndex: 2,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.17)'
  };

  return (
    <div style={style}>
      {text}
    </div>
  )
};

class IntimmeetButton extends React.Component {

  state = {
    showMenu: false,
    selectedMenu: '',
    callState: {
      isActive: false,
      micro: true,
      volume: 100,
      error: {
        status: false,
        text: ''
      },
      targetName: '',
      timeOfCall: '00:00',
      isIncomingCall: false,
      publishVideo: false,
      publishAudio: true,
      subscribeVideo: false,
      subscribeAudio: true,
      connecting: false,
      connected: false,
      callEnded: false
    },
  }

  props = {
    user: null,
    offsetTop: 0,
    classNameContainer: '',
    classNamePhoneIcon: '',
    classNameOverlayDropdown: '',
    callbackOnClickMenuItem() {
      return 1;
    },
    callbackOnClickPhoneIcon() {
      return 1;
    },
    callbackOnClickOutside() {
      return 1;
    },
  }

  static defaultProps = {
    user: null,
    offsetTop: 0,
    classNameContainer: '',
    classNamePhoneIcon: '',
    classNameOverlayDropdown: '',
    callbackOnClickMenuItem() {
      return 1;
    },
    callbackOnClickPhoneIcon() {
      return 1;
    },
    callbackOnClickOutside() {
      return 1;
    },
  }

  constructor(props) {
    super(props);
  }

  // constructor(props) {
  //   super(props);
  // }

  resetCallTime = () => {
    this.setState((state) => ({
      ...state,
      callState: {
        ...state.callState,
        timeOfCall: '00:00',
      }
    }))
  }

  setErrorToStateAndHide = (message, delayOfHide) => {
    this.setState((state) => ({
      ...state,
      callState: {
        ...state.callState,
        error: {
          status: true,
          text: message
        },
      }
    }));
    delayOfHide > 0 && setTimeout(() => {
      this.setState((state) => ({
        ...state,
        callState: {
          ...state.callState,
          error: {
            status: false,
            text: ''
          },
        }
      }));
    }, delayOfHide);
  };

  resetCallState = () => {
    this.setState((state) => ({
      ...state,
      callState: {
        ...state.callState,
        isActive: false,
        micro: true,
        volume: 100,
        error: {
          status: false,
          text: ''
        },
        timeOfCall: '00:00',
        isIncomingCall: false,
        publishVideo: false,
        publishAudio: true,
        subscribeVideo: false,
        subscribeAudio: false,
        connecting: false,
        connected: false,
        callEnded: false
      }
    }))
  }

  handlerOnCall = (e) => {
    let timerId = null;
    this.resetCallTime();
    const {isIncoming, isOutcoming, publishVideo, targetData} = e.native;
    this.setState((state) => ({
      ...state,
      callState: {
        ...state.callState,
        targetName: '---',
        isActive: true,
        publishVideo,
        publishAudio: true,
        connecting: true,
        isIncomingCall: isIncoming
      }
    }));

    this.Call = e.native;

    this.Call.on('pick_up', () => {
      let counter = 0;
      this.setState((state) => ({
        ...state,
        callState: {
          ...state.callState,
          publishVideo: this.Call.publishVideo,
          publishAudio: this.Call.publishAudio,
          subscribeVideo: this.Call.subscribeVideo,
          subscribeAudio: this.Call.subscribeAudio,
          isActive: true,
          isIncomingCall: false,
          connecting: false,
          connected: true
        }
      }));
      if (timerId) return;
      timerId = setInterval(() => {
        counter += 1000;

        // let hours = Math.floor((counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // let minutes = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
        // let seconds = Math.floor((counter % (1000 * 60)) / 1000);

        this.setState((state) => ({
            ...state,
            callState: {
              ...state.callState,
              timeOfCall: moment(counter).format('mm:ss')
            }
          })
        )
      }, 1000);
    });

    this.Call.on('hang_up', () => {
      clearInterval(timerId);
      this.setState((state) => ({
        ...state,
        callState: {
          ...state.callState,
          isActive: !this.state.callState.isIncomingCall,
          isIncomingCall: false,
          connecting: false,
          connected: false,
          callEnded: !this.state.callState.isIncomingCall
        }
      }));
    });

    this.Call.on('state_changed', () => {
      this.setState((state) => ({
        ...state,
        callState: {
          ...state.callState,
          subscribeVideo: this.Call.subscribeVideo,
          subscribeAudio: this.Call.subscribeAudio,
          publishVideo: this.Call.publishVideo,
          publishAudio: this.Call.publishAudio,
        }
      }));
    });

    this.Call.on('error', ({native}) => {
      const message = _.has(native, 'message') ?
        native.message :
        _.isString(native) ?
          native :
          'Some error happened';
      clearInterval(timerId);
      this.setErrorToStateAndHide(message, 0);
      this.setState((state) => ({
        ...state,
        callState: {
          ...state.callState,
          isIncomingCall: false,
          isActive: this.state.callState.connected || this.state.callState.connecting,
          connecting: false,
          connected: false,
          callEnded: this.state.callState.connected || this.state.callState.connecting,
        }
      }));
    });
  };

  setPickUp = (data) => {
    this.Call.pickUp(data);
  };

  setHangUp = () => {
    this.Call.hangUp();
  };

  setVolume = (volume) => {
    this.Call.setVolume(100);
  };

  setAudio = (isEnabled) => {
    this.Call.setAudio(isEnabled);
  };

  setVideo = (isEnabled) => {
    //pass isEnabled
    this.Call.setVideo(isEnabled);
  };

  componentDidMount() {
    IntimMeet.onCall(this.handlerOnCall);
  };

  componentWillUnmount() {
    IntimMeet.offCall(this.handlerOnCall);
  };

  handlerOnClickPhoneIcon = () => {
    if (this.state.callState.isActive) return;
    this.setState({showMenu: !this.state.showMenu});
    this.setState({selectedMenu: ''});
  };

  handlerOnClickMenu = (key) => {
    if (key === 'Call') {
      IntimMeet.callRequest(this.props.user.guid, {publishVideo: false, publishAudio: true, targetData: 'User Name 1'})
        .catch(e => this.setErrorToStateAndHide(e.message, 5 * 1000));
      this.setState((state) => ({...state, showMenu: false}));
    }

    if (key === 'Video Call') {
      IntimMeet.callRequest(this.props.user.guid, {publishVideo: true, publishAudio: true, targetData: 'User Name 1'})
        .catch(e => this.setErrorToStateAndHide(e.message, 5 * 1000));
      this.setState((state) => ({...state, showMenu: false}));
    }
    this.setState({selectedMenu: key});
  };

  handlerOnClickOverlay = (e) => {
    if (!e.target.classList.contains('intemmeet-button-container__dropdown-overlay')) return;
    e.nativeEvent.stopPropagation();
    this.setState({showMenu: false});
  };

  render() {
    return (
      <div className={cn(this.props.classNameContainer, 'intemmeet-button-container')}>
        <Icon
          onClick={(e) => {
            this.handlerOnClickPhoneIcon(e);
            this.props.callbackOnClickPhoneIcon();
          }}
          style={{top: this.props.offsetTop || this.state.callState.subscribeVideo ? '1%' : '26%'}}
          className={cn(this.props.classNamePhoneIcon, 'phone-icon-general')}
          classNameImg='phone-icon-general-img-item'
          imgSrc='/images/icons/phone_icon.svg'
        />

        {
          this.state.callState.error.status ? (<Error text={this.state.callState.error.text}/>) : null
        }


        {
          this.state.callState.isActive ? (
            <CallingComponent
              handlerPickUp={this.setPickUp}
              handlerHangUp={this.setHangUp}
              handlerSetVolume={this.setVolume}
              handlerSetAudio={this.setAudio}
              handlerSetVideo={this.setVideo}
              handlerOnClickProfile={() => this.resetCallState()}
              timeOfCall={this.state.callState.timeOfCall}
              isIncomingCall={this.state.callState.isIncomingCall}
              publishVideo={this.state.callState.publishVideo}
              publishAudio={this.state.callState.publishAudio}
              subscribeVideo={this.state.callState.subscribeVideo}
              subscribeAudio={this.state.callState.subscribeAudio}
              connecting={this.state.callState.connecting}
              connected={this.state.callState.connected}
              callEnded={this.state.callState.callEnded}
              imgSrc={_.get(this.props, 'user.imgSrc') || null}
              name={_.get(this.props, 'user.name') || 'test user name'}
              targetName={this.state.callState.targetName}
              fullName={_.get(this.props, 'user.name') || null}
            />
          ) : null
        }

        {
          this.state.showMenu ? (
            <div
              onClick={(e) => {
                this.handlerOnClickOverlay(e);
                this.props.callbackOnClickOutside();
              }}
              className={cn(this.props.classNameOverlayDropdown, 'intemmeet-button-container__dropdown-overlay')}
            >
              <Dropdown className='phone-icon-menu-container'>
                <div className='logo-hint-container'>
                  {
                    !this.props.user ? (<img src="/images/icons/logo.svg" alt="Logo"/>) : null
                  }
                  <div>
                    <Icon className='logo-hint-container__hint-icon'
                          text='Help'
                          classNameImg='logo-hint-container__hint-icon-item-img'
                          imgSrc='/images/icons/help_icon.svg'
                    />
                  </div>
                </div>
                <div className='phone-icon-menu-container__menu'>
                  {
                    this.props.user ? (
                      _.map(MENU_ITEM_WITH_USER, m => {
                        return (
                          <Icon key={m.id}
                                onClick={() => {
                                  this.handlerOnClickMenu(m.name);
                                  this.props.callbackOnClickMenuItem();
                                }}
                                className='phone-icon-menu-item'
                                text={m.name}
                                imgSrc={m.icon}/>
                        )
                      })
                    ) : (
                      _.map(MENU_ITEM, m => {
                        return (
                          <Icon key={m.id} style={{opacity: this.state.selectedMenu === m.name ? 1 : 0.7}}
                                onClick={() => {
                                  this.handlerOnClickMenu(m.name);
                                  this.props.callbackOnClickMenuItem();
                                }}
                                className='phone-icon-menu-item'
                                text={m.name}
                                imgSrc={m.icon}/>
                        )
                      })
                    )
                  }
                </div>
                <div>
                  {
                    this.state.selectedMenu === 'Approvals' ? (
                      <div>APPROVALS</div>
                    ) : this.state.selectedMenu === 'Call Log' ? (
                      <div>CALL LOG</div>
                    ) : this.state.selectedMenu === 'Speed Date' ? (
                      <div>SPEED DATE</div>
                    ) : this.state.selectedMenu === 'Images' ? (
                      <div>IMAGES</div>
                    ) : this.state.selectedMenu === 'Credit Manager' ? (
                      <div>CREDIT MANAGER</div>
                    ) : this.state.selectedMenu === 'Settings' ? (
                      <div>SETTINGS</div>
                    ) : null
                  }
                </div>
              </Dropdown>
            </div>) : null
        }
      </div>
    )
  }
}

export default IntimmeetButton;
