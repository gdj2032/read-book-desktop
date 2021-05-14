import { Component } from 'react';
import './index.scss';

interface IProps {
}

interface IState {
}

class Book extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>Book</div>
    )
  }
}

export default Book;
