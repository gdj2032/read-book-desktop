import { Component } from 'react';
import './index.scss';
import { ReadFile } from '@/cls';
import { connect } from '@/store';
import { BOOK_BG_COLOR } from '@/constants';
import { getWindowSize } from '@/utils';
import { HomeMenu } from '@/components';

interface IProps {
  dispatch: any;
  books: IBook[];
}

interface IState {
  marginLeft: number;
}

@connect((state) => ({
  books: state.local.books,
}))
class Home extends Component<IProps, IState> {

  bookItemWidth = 160;
  sizeTimeout: any = null;
  readFile: ReadFile | undefined;

  constructor(props: IProps) {
    super(props);
    this.state = {
      marginLeft: 0,
    };
  }

  componentDidMount() {
    this.readFile = new ReadFile();
    this.handleSize();
    window.addEventListener('resize', this.handleSize)
  }

  componentWillUnmount() {
    this.readFile?.close();
    window.removeEventListener('resize', this.handleSize)
    this.sizeTimeout && clearTimeout(this.sizeTimeout)
  }

  bookItem = (item: IBook) => {
    const { marginLeft } = this.state;
    return (
      <div key={item.id} className='book-item' style={{ backgroundColor: BOOK_BG_COLOR[item.id % BOOK_BG_COLOR.length], marginLeft }} >
        <div className='i-name'>{item.name}</div>
        <div className='i-author'>{item.author || '未知'}</div>
      </div>
    )
  }

  handleSize = () => {
    this.sizeTimeout && clearTimeout(this.sizeTimeout)
    const { width } = getWindowSize();
    let w = (width - 40) % this.bookItemWidth;
    if (w <= 40) {
      w = this.bookItemWidth;
    }
    const num = (width - 40 - w) / this.bookItemWidth;
    const marginLeft = w / (num + 1);
    this.setState({ marginLeft })
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
        <HomeMenu />
      </div>
    );
  }
}

export default Home;
