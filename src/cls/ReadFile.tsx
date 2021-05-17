import { BOOK_TYPE } from 'constant';
import { store } from 'store';

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
        // 获取文件路径
        const file = files[0];
        this.addBook(file)
      }
    });
    // 阻止拖拽结束事件默认行为
    this.dragWrapper?.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  }

  private addBook = (file: any) => {
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
    const { name: nameType, size } = file;
    const name = this.getBookName(nameType);
    const { books } = store.getState().local;
    const exit = books.find((e: IBook) => e.name === name);
    if (exit) return;
    const type = this.getBookType(nameType);
    const reader = new FileReader();
    const gbk = 'gbk';
    reader.readAsText(file, gbk);
    reader.onload = (res: any) => {
      const content = res.target.result;
      const book: IBook = {
        author: this.getAuthor(content),
        id: new Date().getTime(),
        createTime: new Date(),
        content,
        name,
        size,
        type,
        updateTime: new Date(),
      }
      console.log(book);
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
      return t[0].split('作者：')[1]
    }
    return '未知';
  }

}
