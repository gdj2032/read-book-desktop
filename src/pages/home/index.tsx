import { Component, Fragment } from 'react';
import './index.scss';
import { ReadFile, fs } from '@/cls';
import { connect } from '@/store';
import { BOOK_BG_COLOR, READ_BG_COLOR } from '@/constants';
import { getWindowSize } from '@/utils';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { removeBookAction, removeNovelAction, updateSetAction } from '@/action';
import { themes } from '@/style';
import pathConfig from '@/routes/pathConfig';

interface IProps {
  dispatch: any;
  set: any;
  books: IBook[];
  history: any;
}

interface IState {
  marginLeft: number;
  manager: boolean;
  checks: string[]; //小说id数组
}

@connect((state) => ({
  books: state.local.books,
  set: state.set,
}))
class Home extends Component<IProps, IState> {

  bookItemWidth = 160; //书籍组件宽度
  sizeTimeout: any = null;
  readFile: ReadFile | undefined;
  fileRef: HTMLInputElement | undefined | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      marginLeft: 0,
      manager: false,
      checks: [],
    };
  }

  componentDidMount() {
    this.readFile = new ReadFile();
    this.handleSize();
    window.addEventListener('resize', this.handleSize)
    fs.createCacheFolder();
  }

  componentWillUnmount() {
    this.readFile?.close();
    window.removeEventListener('resize', this.handleSize)
    this.sizeTimeout && clearTimeout(this.sizeTimeout)
  }

  bookItem = (item: IBook) => {
    const { marginLeft, manager, checks } = this.state;
    return (
      <div key={item.id} className='book-item' onClick={() => this.onBookItem(item)} style={{ backgroundColor: BOOK_BG_COLOR[Number(item.id) % BOOK_BG_COLOR.length], marginLeft }} >
        <div className='i-name'>{item.name}</div>
        <div className='i-author'>{item.author || '未知'}</div>
        {
          manager &&
          <div className='manager-check' onClick={(e) => this.onCheckBook(item.id, e)}>
            <CheckOutlined className={`check-icon ${checks.includes(item.id) && 'check-icon-active'}`} />
          </div>
        }
      </div>
    )
  }

  onBookItem = (item: IBook) => {

    this.props.history.push(`${pathConfig.book}/${item.id}`);
  }

  popContent = () => (
    <div className='pop-bg-color'>
      {
        Object.values(READ_BG_COLOR).map(e => (
          <div
            key={e}
            className='bg-color-item pointer'
            style={{
              backgroundColor: e,
              border: e === this.props.set.backgroundColor ? '1px solid red' : 'none',
            }}
            onClick={() => this.onChangeBgColor(e)}
          />
        ))
      }
    </div>
  )

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

  onChangeBgColor = (item: string) => {
    this.props.dispatch(updateSetAction({ backgroundColor: item }))
  }

  onInputFile = (e: any) => {
    const files = e.nativeEvent.target.files;
    if (files && files.length > 0) {
      for (const item of files) {
        this.readFile?.addBook(item)
      }
    }
  }

  onBookManage = () => {
    this.setState(preState => {
      return {
        manager: !preState.manager,
        checks: [],
      }
    })
  }

  onCheckBook = (id: string, e) => {
    e.stopPropagation()
    this.setState(preState => {
      const c = [...preState.checks];
      const idx = c.indexOf(id)
      if (idx >= 0) {
        c.splice(idx, 1);
      } else {
        c.push(id)
      }
      return {
        checks: c,
      }
    })
  }

  onCancel = () => {
    this.setState({ manager: false, checks: [] })
  }

  onDelete = () => {
    const { checks } = this.state;
    const { books } = this.props;
    if (checks.length > 0) {
      this.props.dispatch(removeBookAction(checks))
      this.props.dispatch(removeNovelAction(checks))
      this.onCancel()
      for (const item of books) {
        if (checks.includes(item.id)) {
          fs.deleteFile(item.path)
        }
      }
    }
  }

  render() {
    const { books, set } = this.props;
    const { manager } = this.state;
    return (
      <div className='g-home' id='home' style={{ backgroundColor: set.backgroundColor }}>
        <div className='m-home-menu' style={{ backgroundColor: set.backgroundColor }}>
          <div className='add-file'>
            <div className='add-view pointer c-button margin_right_20'><PlusOutlined className='add-icon' /> 添加本地图书</div>
            <input type='file' name='' id='' onChange={this.onInputFile} ref={(c) => this.fileRef = c} />
          </div>
          <Popover content={this.popContent}>
            <div className='c-button margin_right_20'>背景色</div>
          </Popover>
          <div className='c-button margin_right_20' onClick={this.onBookManage}>管理书籍</div>
          {
            manager &&
            <Fragment>
              <div className='cancel-button margin_right_20' onClick={this.onCancel}>取消</div>
              <div className='delete-button' onClick={this.onDelete}>删除</div>
            </Fragment>
          }
        </div>
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
