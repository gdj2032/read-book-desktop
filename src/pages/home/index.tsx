import { Component } from 'react';
import './index.scss';
import { connect } from 'store';
import { ReadFile } from 'cls';

interface IProps {
}

interface IState {
}

@connect((state) => ({
  local: state.local,
}))
class Home extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {}
  }

  readFile: ReadFile | undefined;

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
    )
  }
}

export default Home;
