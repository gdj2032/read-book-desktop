export const noop = (v: any) => {};

export const reduxStore = {
  dispatch: noop,
  getState: noop,
};

export const getFileSize = (size: number) => {
  if(size < 1024) {
    return `${size}Bytes`;
  }
  else if(size < 1048576) {
    return `${(size / 1024).toFixed(2)}KB`;
  }
  else if(size < 1073741824) {
    return `${(size / 1048576).toFixed(2)}MB`;
  }
  else {
    return `${(size / 1073741824).toFixed(2)}GB`;
  }
};

export /**
 * 数组去重
 *
 * @param {any[]} arr
 * @returns
 */
const unique = (arr: any[]) => {
  arr = arr.map((e: any) => e.trim());
  return Array.from(new Set(arr));
};

export /**
 * 获取行高
 *
 * @param {number} fontSize
 */
const getLineHeight = (fontSize: number) => fontSize + 16;
