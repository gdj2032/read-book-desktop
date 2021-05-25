import { addNovelAction } from "@/action";
import { store } from "@/store";
import { unique } from "@/utils";

export default class ReadBook {

  book: IBook;

  constructor(book: IBook) {
    this.book = book;
    this.init()
  }

  private init = () => {
    const { content, id, name } = this.book;
    // console.log(content);
    let chapter = this.getChapter(content)
    chapter = unique(chapter)
    // console.log('chapter: ', chapter);
    let ctx = content;
    const chapterData: IChapter[] = []
    if (chapter && chapter.length > 0) {
      chapter.map((item: any, idx: number) => {
        const arr = content.split(item)
        ctx = arr[arr.length - 1];
        const curCtx = arr[0];
        if (idx === 0) {
          //简介
          const chapterFir: IChapter = {
            page: 1,
            title: '简介',
            content: curCtx,
          };
          chapterData.push(chapterFir)
        } else {
          //章节
          const cha: IChapter = {
            page: chapterData.length + 1,
            title: item,
            content: curCtx,
          }
          chapterData.push(cha)
        }
      });
    }
    console.log(chapterData);
    const novel: INovel = {
      id, name, chapter: chapterData,
      recently: {
        page: 1,
        contentPage: 1,
      }
    }
    store.dispatch(addNovelAction(novel));
  }

  private getChapter = (content: any) => {
    let chapter = content.split('\n').filter((e: any) => e.includes('第') && e.includes('章 '))
    if (chapter.length > 100) {
      return chapter;
    }
    chapter = content.split('\n').filter((e: any) => e.includes('第') && e.includes('章'))
    if (chapter.length > 100) {
      return chapter;
    }
    chapter = content.split('\n').filter((e: any) => e.includes('章 '))
    if (chapter.length > 100) {
      return chapter;
    }
    chapter = content.split('\n').filter((e: any) => e.includes('章'))
    if (chapter.length > 100) {
      return chapter;
    }
    return false;
  }
}