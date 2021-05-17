import { Component } from 'react';
import { DatePicker } from 'antd';
import './index.scss';
import { connect } from 'store';

interface IProps {
}

interface IState {
}

@connect((state) => ({
  local: state.local,
}))
class Home extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <DatePicker/>
      </div>
    );
  }
}

export default Home;
