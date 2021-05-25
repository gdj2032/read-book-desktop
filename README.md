# 小说阅读器 桌面版 自用

## 环境

node 12+(12.16.1)
## 开发版

    yarn dev

## 打包

Mac:  yarn packager-mac
Windows:  yarn packager-win

## 修改端口号

1. 主目录/main.js

mainWindow.loadURL('http://localhost:9999');

2. 主目录/scripts/start.js

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9999;

3. package.json

dev命令
