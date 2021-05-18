import { FONT_SIZE, READ_BG_COLOR } from '@/constants';
import { Component } from 'react';
import './index.scss';

interface IProps {
}

interface IState {
}

class ReadMenu extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='read-menu'>
        <div className='bg-color'>
          <div className='menu-text'>背景色</div>
          {
            Object.values(READ_BG_COLOR).map(e => (<div key={e} className='bg-color-item pointer' style={{ backgroundColor: e }} />))
          }
        </div>
        <div className='font-size'>
          <div className='menu-text'>字体大小</div>
          <div className='font-size-a-row'>
            <div className='a-small pointer'>A</div>
            <div className='a-big pointer'>A</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReadMenu;
