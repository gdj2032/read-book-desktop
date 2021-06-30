import { ReadBook } from '@/cls';
import { READ_BOOK_EMIT } from '@/constants';
import pathConfig from '@/routes/pathConfig';
import { connect } from '@/store';
import { Component } from 'react';
import './index.scss';

interface IProps {
  match: {
    params: {
      id: string;
    };
    path: string;
    url: string;
  };
  history: {
    replace: (path: string) => void;
  };
  books: IBook[];
}

interface IState {
  id: string;
  chapter: IChapter[];
  book: IBook | null;
  ctx: IContent;
}

@connect((state) => ({
  books: state.local.books,
  set: state.set,
}))
class Book extends Component<IProps, IState> {

  readBook: ReadBook | undefined;

  constructor(props: IProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      chapter: [],
      book: null,
      ctx: {
        title: '',
        content: '',
        page: 1,
        contentPage: 1,
      },
    };
  }


  componentDidMount() {
    const { id, ctx } = this.state;
    const { books } = this.props;
    const book = books.find(e => e.id === id);
    if(book) {
      this.setState({ book, ctx: { ...ctx, page: book.page, contentPage: book.contentPage } }, () => {
        this.readBook = new ReadBook(book)
        this.readBook.addListener(READ_BOOK_EMIT.INIT_CHAPTER, this.handleChapter);
      })
    }
  }

  componentWillUnmount() {
    this.readBook?.removeListener(READ_BOOK_EMIT.INIT_CHAPTER, this.handleChapter);
  }

  handleChapter = (chapter: IChapter[]) => {
    this.setState({ chapter })
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
