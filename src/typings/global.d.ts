interface Window {
  eleBridge: any;
}

type str_num = string | number;

interface IBook {
  id: string; //唯一标识
  author: string; //作者
  content: string; //正文
  createTime: Date; //添加时间
  desc?: string; //简介
  name: string; //书名
  size: number; //大小
  type: string; // 'txt' | 'epub',
  updateTime: Date,
}

interface INovel {
  id: string;
  name: string; //书名
  chapter: IChapter[];
  recently: IRecently;
}

interface IChapter {
  page: number;
  title: string;
  content: string;
}

interface IRecently {
  page: number;
  contentPage: number; //章节第几页
}

// interface IStoreState {
//   local: {
//     books: IBook[];
//     contents: IContent[];
//   };
//   set: {
//   }
// }
