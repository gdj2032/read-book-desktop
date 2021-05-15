export default class ReadFile {

  dragWrapper: HTMLElement | null | undefined;

  constructor() {
    this.init();
  }

  init = () => {
    this.dragWrapper = document.getElementById("home");
    //添加拖拽事件监听器
    this.dragWrapper?.addEventListener("drop", async (e: any) => {
      //阻止默认行为
      e.preventDefault();
      //获取文件列表
      const files = e.dataTransfer.files;

      if (files && files.length > 0) {
        //获取文件路径
        const file = files[0];
        // const path = files[0].path;
        const reader = new FileReader();
        const gbk = 'gbk';
        reader.readAsText(file, gbk);
        reader.onload = (result: any) => {
          const content = result.target.result;
          console.log("🚀 ~ file: ReadFile.ts ~ line 27 ~ ReadFile ~ this.dragWrapper?.addEventListener ~ content", content)
        }
      }
    })
    //阻止拖拽结束事件默认行为
    this.dragWrapper?.addEventListener("dragover", (e) => {
      e.preventDefault();
    })
  }

  close = () => {
    this.dragWrapper?.removeEventListener('drop', () => { }, true)
    this.dragWrapper?.removeEventListener('dragover', () => { }, true)
  }

}
