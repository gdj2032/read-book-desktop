interface Window {
  electron: any;
}

interface IBook {
  id: number; //唯一标识
  author: string; //作者
  content: string; //正文
  createTime: Date; //添加时间
  desc?: string; //简介
  name: string; //书名
  size: number; //大小
  type: string; // 'txt' | 'epub',
  updateTime: Date,
}

interface IContent {

}

// interface IStoreState {
//   local: {
//     books: IBook[];
//     contents: IContent[];
//   };
//   set: {
//   }
// }