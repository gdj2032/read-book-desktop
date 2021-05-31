export const noop = (v: any) => { };

export const isMac = process.platform == 'darwin';

export const isWindows = process.platform == 'win32';

export const isLinux = process.platform == 'linux';

export const reduxStore = {
  dispatch: noop,
  getState: noop,
};

export const isDev = process.env.NODE_ENV === 'development';

/** * 是否为mac系统（包含iPhone手机） * */
export const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

/** * 是否为windows系统 * */
export const isWindows = /windows|win32/i.test(navigator.userAgent);

/**
 * 获取当前可视区域窗口宽高
 *
 * all 默认为false 不包括顶部的title和系统按钮高度
 *
 * @param {boolean} [all]
 */
export const getWindowSize = (all?: boolean) => ({
  width: all ? window.outerWidth : window.innerWidth,
  height: all ? window.outerHeight : window.innerHeight,
});

export const getFileSize = (size: number) => {
  if (size < 1024) {
    return `${size}Bytes`;
  }
  else if (size < 1048576) {
    return `${(size / 1024).toFixed(2)}KB`;
  }
  else if (size < 1073741824) {
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
