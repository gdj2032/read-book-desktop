import { ReadBook } from '@/cls';
import pathConfig from '@/routes/pathConfig';
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
  history: {
    replace: (path: string) => void;
  };
  novels: INovel[];
  books: IBook[];
}

interface IState {
  id: string;
}

@connect((state) => ({
  books: state.local.books,
  novels: state.local.novels,
  set: state.set,
}))
class Book extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    // console.log(this.props);
    this.init()
  }

  init = () => {
    const { id } = this.state;
    const { novels, books } = this.props;
    const exit = novels.find(e => e.id === id);
    if (exit) {

    } else {
      const book = books.find(e => e.id === id);
      if (book) {
        this.initBook(book)
      }
    }
  }

  initBook = (book: IBook) => {
    const readBook = new ReadBook(book)
  }

  back = () => this.props.history.replace(pathConfig.home);

  render() {
    return (
      <div>
        <div onClick={this.back}>返回</div>
      </div>
    );
  }
}

export default Book;
