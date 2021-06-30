import { addNovelAction } from '@/action';
import { store } from '@/store';
import { unique } from '@/utils';
import fs from './FileStream';

export default class ReadBook {

  book: IBook;

  constructor(book: IBook) {
    this.book = book;
    this.init()
  }

  private init = async () => {
    const { id, name, path } = this.book;
    const content = await fs.readFile(path)
    // console.log(content);
    let chapter = this.getChapter(content)
    chapter = unique(chapter)
    // console.log('chapter: ', chapter);
    let ctx = content;
    const chapterData: IChapter[] = []
    if (chapter && chapter.length > 0) {
      chapter.map((item: string, idx: number) => {
        const arr = ctx.split(item)
        ctx = arr[arr.length - 1];
        const curCtx = arr[0];
        if (idx === 0) {
          //简介
          if (curCtx.trim()) {
            const chapterFir: IChapter = {
              page: idx,
              title: '简介',
              content: curCtx,
            };
            chapterData.push(chapterFir)
          }
        } else {
          //章节
          const cha: IChapter = {
            page: idx,
            title: chapter[idx - 1],
            content: curCtx,
          }
          chapterData.push(cha)
        }
      });
    }
    console.log(chapterData);
    const novel: INovel = { id, name, page: 1, contentPage: 1 };
    store.dispatch(addNovelAction(novel));
  }

  //(\\s)+[第]{0,1}[0-9一二三四五六七八九十百千万]+[章回节卷集幕计][ \t]*(\\S)*

  private reg1 = /第(\S*)[章回节卷集幕计][ \t]/
  private reg2 = /[0-9一二三四五六七八九十](\S*)[ \t]/

  /**
   * 1. 第一章/节 章节标题
   * 2. 1. 章节标题
   * 3. 001 章节标题
   */

  private getChapter = (content: string) => {

    const cs = content.split('\n');
    const cp: string[] = []
    for (const item of cs) {
      const ctx = item.trim();
      if (ctx) {
        const res = ctx.match(this.reg1)
        if (res && res.length > 1) {
          cp.push(item)
        }
      }
    }

    if (cp.length === 0) {
      for (const item of cs) {
        const ctx = item.trim();
        if (ctx) {
          const res = ctx.match(this.reg2)
          if (res && res.length > 1) {
            cp.push(item)
          }
        }
      }
    }

    return cp;
  }
}