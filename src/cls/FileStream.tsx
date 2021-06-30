class FileStream {

  CACHE_FOLDER_PATH = window.eleBridge.CACHE_FOLDER_PATH;
  LOG_PATH = this.CACHE_FOLDER_PATH + '/log';
  BOOK_PATH = this.CACHE_FOLDER_PATH + '/book';

  fs = window.require('fs');

  constructor() {
  }

  createCacheFolder = () => {
    this.fs.access(this.CACHE_FOLDER_PATH, (err) => {
      if (err) {
        this.fs.mkdir(this.CACHE_FOLDER_PATH, () => {
          this.fs.mkdir(this.LOG_PATH, () => { })
          this.fs.mkdir(this.BOOK_PATH, () => { })
        })
      }
    });
  }

  copyFile(source: string, data: string, cb?: (err?: any) => void) {
    this.fs.writeFile(source, data, function (err) {
      console.log('文件复制 err: ', err);
      cb && cb(err)
    })
  }

  getBookPath = (name) => this.BOOK_PATH + '/' + name;

  deleteFile = (filepath: string, cb?: (err: any) => void) => {
    this.fs.unlink(filepath, (err) => {
      cb && cb(err)
    });
  }

  readFile = (path: string, encoding: string = 'utf8') => {
    if (path) {
      const res = this.fs.readFileSync(path, { encoding }, () => {})
      return res;
    }
  }

}

const fs = new FileStream()

export default fs;
