import { Component } from 'react';
import './index.scss';
import { connect } from 'store';
import { ReadFile } from 'cls';

interface IProps {
  dispatch: any;
}

interface IState {
}

@connect((state) => ({
  local: state.local,
}))
class Home extends Component<IProps, IState> {

  readFile: ReadFile | undefined;

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.readFile = new ReadFile();
  }

  componentWillUnmount() {
    this.readFile?.close();
  }

  render() {
    return (
      <div className='g-home' id='home'>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
