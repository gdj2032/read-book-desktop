import React, { Component } from 'react'
import { connect } from '@/store';
import {
  CloseOutlined, FullscreenOutlined, LineOutlined
} from '@ant-design/icons';
import close_icon from '@/image/header/close.png';
import line_icon from '@/image/header/line.png';
import minimize_icon from '@/image/header/minimize.png';
import maximize_icon from '@/image/header/maximize.png';
import './index.scss'
import { themes } from '@/style';

interface IProps {
}

interface IState {
  small: boolean;
}

@connect((state: any) => ({
  local: state.local,
}))
class WindowHeader extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      small: true, //默认打开小窗口
    };
  }

  onClose = () => {
    window.eleBridge.close();
  }

  onMin = () => {
    window.eleBridge.min();
  }

  onMax = () => {
    window.eleBridge.max();
    this.setState((prevState) => {
      return { small: !prevState.small }
    })
  }

  render() {
    const { small } = this.state;
    return (
      <div className='window-header'>
        <div className='three-btn'>
          <div className="close" onClick={this.onClose}>
            <img src={close_icon} className='wh-icon' />
          </div>
          <div className="shrink" onClick={this.onMin}>
            <img src={line_icon} className='wh-icon' />
          </div>
          <div className="enlarge" onClick={this.onMax}>
            <img src={small ? maximize_icon : minimize_icon} className='wh-icon' />
          </div>
        </div>
      </div>
    )
  }
}

export default WindowHeader;
