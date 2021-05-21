import { connect } from '@/store';
import { Component } from 'react';
import './index.scss';

interface IProps {
  match: {
    params: {
      id: string;
    },
    path: string;
    url: string;
  };
}

interface IState {
}


@connect((state) => ({
  books: state.local.books,
  set: state.set,
}))
class Book extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>Book</div>
    );
  }
}

export default Book;
