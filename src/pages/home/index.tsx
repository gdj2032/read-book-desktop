import { Component } from 'react';
import './index.scss';
import { ReadFile } from '@/cls';
import { connect } from '@/store';
import { BOOK_BG_COLOR } from '@/constants';

interface IProps {
  dispatch: any;
  books: IBook[];
}

interface IState {
}

@connect((state) => ({
  books: state.local.books,
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

  bookItem = (item: IBook) => {
    return (
      <div key={item.id} className='book-item' style={{ backgroundColor: BOOK_BG_COLOR[item.id % BOOK_BG_COLOR.length] }} >
        <div className='i-name'>{item.name}</div>
        <div className='i-author'>{item.author}</div>
      </div>
    )
  }

  render() {
    const { books } = this.props;
    return (
      <div className='g-home' id='home'>
        <div className='m-books'>
          {
            books.map(e => this.bookItem(e))
          }
        </div>
      </div>
    );
  }
}

export default Home;
