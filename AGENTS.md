# AGENTS.md

## 项目定位

本项目是基于 AutoJs6 的 Android 自动化脚本项目，主要入口为 `main.js`。后续修改代码时，应按 AutoJs6 运行环境理解脚本，而不是按 Node.js、浏览器 JavaScript 或普通桌面脚本处理。

参考入口：

- AutoJs6 仓库：https://github.com/SuperMonster003/AutoJs6
- AutoJs6 文档：https://docs.autojs6.com/

## AutoJs6 编码约定

- 目标运行时是 AutoJs6/Rhino 风格脚本环境。
- 可以使用 AutoJs6 提供的全局 API，例如 `device`、`files`、`dialogs`、`toast`、`sleep`、`gestures`、`ui`、`floaty`。
- 不要默认引入 Node.js API，例如 `fs`、`path`、`process`、`Buffer`、`require('xxx')` 等，除非已经确认 AutoJs6 环境支持当前用法。
- 不要默认使用浏览器 DOM API，例如 `window`、`document`、`localStorage`、`fetch` 等，除非已经确认当前 AutoJs6 版本和运行环境支持。
- 避免使用未验证的新 JavaScript 语法、ESM `import/export`、构建工具专用语法，优先使用 AutoJs6 可直接运行的普通脚本写法。
- `floaty.window(...)`、`ui.layout(...)` 等 Auto.js/AutoJs6 常见 E4X/XML 布局写法应保留，不要误改成普通 JSX、HTML 或字符串模板。
- Android 自动化脚本通常依赖同步等待，`sleep(...)`、`dialogs.select(...)` 等阻塞式调用是可接受的 AutoJs6 写法。

## 权限和平台注意事项

- 点击、滑动、控件查找等自动化能力通常依赖 Android 无障碍服务权限。
- 悬浮窗相关功能依赖悬浮窗权限，修改 `floaty` 相关逻辑时要考虑权限未开启的情况。
- 截图、找图、取色等能力依赖截图权限，新增相关功能时应显式处理授权流程或失败提示。
- `/sdcard/...` 路径按 Android 存储环境处理，不要改成桌面系统路径。
- 坐标点击依赖具体设备分辨率、横竖屏方向和游戏 UI 布局，修改坐标计算逻辑时要保持兼容性。

## 本仓库脚本约定

- 曲谱目录默认为 `/sdcard/skyMusicAuto/mymusic`。
- 曲谱文件目前按 `.txt` 文件读取，并解析为 JSON。
- 多点和弦点击优先使用 AutoJs6 的 `gestures()` 实现。
- `keyMap` 中的屏幕坐标由设备宽高推算，修改时要谨慎处理横屏和竖屏。
- 如果新增调试输出，优先使用 `toast(...)`、`console.log(...)` 或 AutoJs6 可用的日志方式。

## 修改原则

- 保持 `main.js` 可被 AutoJs6 直接运行，不要引入需要打包、转译或安装 npm 依赖的方案。
- 修改前先确认对应 API 在 AutoJs6 中可用；不确定时优先查阅 AutoJs6 官方文档或现有脚本写法。
- 只在必要时调整权限、路径、坐标和曲谱格式，避免破坏现有用户数据和运行习惯。
