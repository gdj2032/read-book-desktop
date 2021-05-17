import { Component } from 'react';
import './index.scss';
import { connect } from 'store';
import { ReadFile } from 'cls';

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
      <div key={item.id} className='book-item'>
        <div className='i-name'>{item.name}</div>
        <div className='i-author'>{item.author}</div>
      </div>
    )
  }

  render() {
    const { books } = this.props;
    return (
      <div className='g-home' id='home'>
        {
          books.map(e => this.bookItem(e))
        }
      </div>
    );
  }
}

export default Home;
