import { addBookAction, addNovelAction } from '@/action';
import { BOOK_TYPE } from '@/constants';
import { store } from '@/store';
import fs from './FileStream';

export default class ReadFile {

  private dragWrapper: HTMLElement | null | undefined;

  constructor() {
    this.init();
  }

  close = () => {
    this.dragWrapper?.removeEventListener('drop', () => { }, true);
    this.dragWrapper?.removeEventListener('dragover', () => { }, true);
    this.dragWrapper = null;
  }

  private init = () => {
    this.dragWrapper = document.getElementById('home');
    // 添加拖拽事件监听器
    this.dragWrapper?.addEventListener('drop', async (e: any) => {
      // 阻止默认行为
      e.preventDefault();
      // 获取文件列表
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        for (const item of files) {
          this.addBook(item)
        }
      }
    });
    // 阻止拖拽结束事件默认行为
    this.dragWrapper?.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  }

  addBook = (file: any) => {
    const { name } = file;
    const type = this.getBookType(name);
    switch (type) {
      case BOOK_TYPE.txt:
        this.addTxtBook(file)
        break;
      default:
        break;
    }
  }

  private addTxtBook = (file: any) => {
    const { name: nameType, size, path } = file;
    const name = this.getBookName(nameType);
    const { books } = store.getState().local;
    const exit = books.find((e: IBook) => e.name === name);
    if (exit) {
      alert('小说名称已存在');
      return;
    };
    const type = this.getBookType(nameType);
    const reader = new FileReader();
    const gbk = 'gbk';
    reader.readAsText(file, gbk);
    const newPath = `${fs.BOOK_PATH}/${name}.txt'`;
    reader.onload = (res: any) => {
    console.log('🚀 ~ file: ReadFile.tsx ~ line 67 ~ ReadFile ~ res', res)
      const content = res.target.result;
      console.log('🚀 ~ file: ReadFile.tsx ~ line 68 ~ ReadFile ~ content', content)
      const book: IBook = {
        author: this.getAuthor(content),
        id: String(new Date().getTime()),
        createTime: new Date(),
        name,
        size,
        type,
        updateTime: new Date(),
        path: newPath,
        page: 1,
        contentPage: 1,
      }
      // console.log(book);
      store.dispatch(addBookAction(book));
      fs.copyFile(newPath, content)
    }
  }

  private getBookName = (str: string) => {
    return str.split('.')[0].trim()
  }

  private getBookType = (str: string) => {
    const arr = str.split('.');
    return arr[arr.length - 1].trim()
  }

  private getAuthor = (content: string) => {
    const t = content.split('\n').filter((e: any) => e.includes('作者'));
    if (t.length > 0) {
      if (t[0].includes('作者:')) {
        return t[0].split('作者:')[1]
      } else if (t[0].includes('作者：')) {
        return t[0].split('作者：')[1]
      } else {
        return t[0].split('作者')[1]
      }
    }
    return '';
  }

}
