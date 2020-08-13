import React, {useState} from 'react';
import './IntemmeetButton.css';
import Icon from '../Icon';
import {initialize, callRequest, onCall, offCall} from 'fake';
import Dropdown from '../Dropdown';
import cn from 'classnames';
import _ from 'lodash';
import Button from '../Button';

const ControlButtonItem = ({handlerOnClick, imgSrc}) => {
  return (
    <Icon className='common-control-button-style' onClick={handlerOnClick} imgSrc={imgSrc}/>
  )
};

const ControlButton = ({
                         isIncoming,
                         callbackOnClickOffVolume,
                         callbackOnClickMute,
                         callbackOnClickVideo,
                         callbackOnClickEndCall,
                         callbackOnClickPickUp,
                         callbackOnClickHungUp,
                       }) => {
  return (
    <>
      {
        isIncoming ? (
          <>
            <Icon onClick={callbackOnClickHungUp} imgSrc='/images/icons/hung_up.svg'/>
            <Icon onClick={callbackOnClickPickUp} imgSrc='/images/icons/pick_up.svg'/>
          </>
        ) : (
          <>
            <Icon onClick={callbackOnClickOffVolume} imgSrc='/images/icons/ongoing_call__off_volume.svg'/>
            <Icon onClick={callbackOnClickMute} imgSrc='/images/icons/ongoing_call__mute.svg'/>
            <Icon onClick={callbackOnClickVideo} imgSrc='/images/icons/ongoing_call__video.svg'/>
            <Icon onClick={callbackOnClickEndCall} imgSrc='/images/icons/ongoing_call_end_call.svg'/>
          </>
        )
      }

    </>
  )
};

const IncomingCall = ({fullName}) => {
  return (
    <>
      <div className='calling-container__full-name-of-client'>
        {fullName}
      </div>
      <div className='calling-container__control-button'>
        <ControlButton isIncoming={true}/>
      </div>
    </>
  )
};

const ConnectingClient = ({name, fullName}) => {
  return (
    <>
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
      <div className='calling-container__control-button'>
        <ControlButton/>
      </div>
      <div className='calling-container__full-name-of-client'>
        {fullName}
      </div>
    </>
  )
};

const ConnectedClient = ({name, fullName, timeCalling}) => {
  return (
    <>
      <div className='calling-container__time-of-call'>
        <div>{timeCalling}</div>
        <div>You are in a call with <br/> <b>{fullName}</b></div>
      </div>
      <div className='calling-container__voice-indicator'>
        <img src="/images/icons/voice_indicator.svg" alt="Voice Indicator"/>
      </div>
      <div className='calling-container__tip'>
        <span>
          <b>TIP:</b> Show interest by being a good listener
        </span>
      </div>
      <div className='calling-container__control-button'>
        <ControlButton/>
      </div>
    </>
  )
};

const EndedCall = ({fullName, name, timeCalling, reliability = 56, interest = 80}) => {
  return (
    <>
      <div className='calling-container__connection-top-icons'>
        <div>{timeCalling}</div>
        <div>
          <Icon imgSrc='/images/icons/gray_dont_enter.svg'/>
          <Icon imgSrc='/images/icons/gray_alert.svg'/>
        </div>
      </div>


      <div className='calling-container__ended-call-info'>
        <div>Voice Call Ended {timeCalling}</div>
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
        <Button style='red' label='Profile'/>
      </div>
    </>
  )
};

const ConnectingVideoClient = ({name, fullName, imgSrcBackground}) => {

  const [typeOfVideoCall, setTypeOfVideoCall] = useState('');

  return (
    <>
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
                  <Icon style={{height: 44, width: 44, margin: '0px auto 11px auto'}} imgSrc='/images/icons/white_border_phone.svg'/>
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
          <div>
            <ControlButtonItem imgSrc='/images/icons/ongoing_call__mute.svg'/>
            <ControlButtonItem imgSrc='/images/icons/ongoing_call__video.svg'/>
            <ControlButtonItem imgSrc='/images/icons/ongoing_call_end_call.svg'/>
          </div>
        </div>
      </div>
    </>
  )
}

const CallingComponent = ({
                            name,
                            fullName,
                            connecting,
                            connected,
                            connectingVideo,
                            imgSrc,
                            incomingCall,
                            timeCalling = '1:03',
                            callEnded
                          }) => {
  return (
    <div className='calling-container'>
      {
        connectingVideo ? (<ConnectingVideoClient imgSrcBackground={imgSrc} fullName={fullName} name={name}/>) : null
      }
      {/*{*/}
      {/*  incomingCall ? (<IncomingCall fullName={fullName}/>) : null*/}
      {/*}*/}
      {/*{*/}
      {/*  connecting ? (<ConnectingClient fullName={fullName} name={name}/>) : null*/}
      {/*}*/}
      {/*{*/}
      {/*  connected ? (<ConnectedClient fullName={fullName} timeCalling={timeCalling}/>) : null*/}
      {/*}*/}
      {/*{*/}
      {/*  callEnded ? (<EndedCall fullName={fullName} timeCalling={timeCalling} name={name}/>) : null*/}
      {/*}*/}
    </div>
  )
};

// const OngoingCallComponent = () => {
//
// };

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

class IntemmeetButton extends React.Component {

  state = {
    showMenu: false,
    selectedMenu: '',
    calling: {
      status: false,
      video: false
    },
  }

  props = {
    user: null,
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

  // constructor(props) {
  //   super(props);
  // }

  handlerOnCall = (e) => {
    console.log(e);
  };

  componentDidMount() {
    // this.setCallRequest = (userId) => callRequest(userId);
    // onCall(this.handlerOnCall);
  };

  handlerOnClickPhoneIcon = () => {
    if (this.state.calling.status) return;
    this.setState({showMenu: !this.state.showMenu});
    this.setState({selectedMenu: ''});
  };

  handlerOnClickMenu = (key) => {
    if (key === 'Call') {
      // this.setCallRequest(this.props.user.id);
      this.setState({showMenu: false});
      this.setState({calling: {status: true, video: false}});
    }

    if (key === 'Video Call') {
      // this.setCallRequest(this.props.user.id);
      this.setState({showMenu: false});
      this.setState({calling: {status: true, video: true}});
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
          className={cn(this.props.classNamePhoneIcon, 'phone-icon-general')}
          classNameImg='phone-icon-general-img-item'
          imgSrc='/images/icons/phone_icon.svg'
        />

        {
          this.state.calling.status ? (
            <CallingComponent
              connectingVideo={this.state.calling.video}
              incomingCall={false}
              connecting={true}
              connected={false}
              callEnded={false}
              imgSrc={this.props.user.imgSrc}
              name={this.props.user.name}
              fullName={this.props.user.name + ' !'}
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

export default IntemmeetButton;
