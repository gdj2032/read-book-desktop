interface Window {
  eleBridge: {
    require: NodeRequire;
    process: NodeJS.Process;
    platform: 'mac' | 'windows' | 'linux' | 'unknown';
    close: () => void;
    min: () => void;
    max: () => void;
    electron: Electron;
    CACHE_FOLDER_PATH: string; //缓存文件(txt, epub)的目录
  };
}

type str_num = string | number;

interface IBook {
  id: string; //唯一标识
  author: string; //作者
  createTime: Date; //添加时间
  desc?: string; //简介
  name: string; //书名
  size: number; //大小
  type: string; // 'txt' | 'epub',
  updateTime: Date,
  path: string; //当前软件缓存文件的文件地址
}

interface INovel {
  id: string;
  name: string; //书名
  page: number;
  contentPage: number; //章节第几页
}

interface IChapter {
  page: number;
  title: string;
  content: string;
}

// interface IStoreState {
//   local: {
//     books: IBook[];
//     contents: IContent[];
//   };
//   set: {
//   }
// }
