# sky_auto

基于 AutoJs6 的 Android 自动化演奏脚本，用于在游戏乐器界面按曲谱自动点击琴键。

本项目的运行入口是 `main.js`。脚本需要在 Android 设备上的 AutoJs6 环境中运行。

## 准备工作

你需要准备：

- 一台 Android 手机或平板
- 已安装目标游戏，并能进入乐器演奏界面
- AutoJs6
- 本项目的 `main.js`
- 曲谱文件，放在手机的指定曲谱目录中

AutoJs6 官方入口：

- AutoJs6 仓库：https://github.com/SuperMonster003/AutoJs6
- AutoJs6 下载页：https://github.com/SuperMonster003/AutoJs6/releases
- AutoJs6 文档：https://docs.autojs6.com/

## 1. 下载并安装 AutoJs6

1. 打开 AutoJs6 Releases 页面。
2. 下载最新版本的 APK 文件。
3. 在 Android 设备上安装 APK。
4. 如果系统提示“禁止安装未知来源应用”，按系统提示允许当前浏览器或文件管理器安装 APK。

安装完成后，打开 AutoJs6。

## 2. 授权 AutoJs6

脚本需要通过系统自动化能力点击屏幕，所以至少需要开启 AutoJs6 的无障碍服务。

在 AutoJs6 中按提示进入系统设置，开启：

- 无障碍服务：必须开启，用于执行点击和多点手势
- 悬浮窗权限：建议开启，用于在游戏界面中通过 AutoJs6 悬浮入口启动脚本
- 文件访问权限：建议开启，用于读取 `/sdcard/skyMusicAuto/mymusic` 下的曲谱文件

当前版本的 `main.js` 没有使用截图识别，所以截图权限不是必须项。悬浮窗权限主要用于让 AutoJs6 在游戏界面显示悬浮入口，方便需要开始演奏时直接启动脚本。

## 3. 导入脚本

把本项目的 `main.js` 放到手机中，并在 AutoJs6 里打开或创建对应脚本。

常见方式任选一种：

- 在电脑上下载本项目后，把 `main.js` 传到手机，再用 AutoJs6 文件管理器打开。
- 在 AutoJs6 中新建脚本，把 `main.js` 的内容复制进去。
- 如果你使用 Git 或其他同步工具，也可以直接把项目同步到手机存储中。

| 导入脚本 | 曲谱文件 |
| --- | --- |
| ![](/img/导入autojs.png) | ![](/img/曲谱文件.jpg) |

## 4. 放置曲谱文件

当前脚本默认从下面的目录读取曲谱：

```text
/sdcard/skyMusicAuto/mymusic
```

请在手机存储中创建这个目录，并把曲谱文件放进去。

当前版本支持两种扩展名：

- `.txt`
- `.json`

两种文件都会按 JSON 内容读取。也就是说，`.txt` 文件仍然兼容旧用法，`.json` 文件适合新用户更直观地管理曲谱。

示例：

```text
/sdcard/skyMusicAuto/mymusic/半岛铁盒.txt
/sdcard/skyMusicAuto/mymusic/example.json
```



曲谱文件可能需要你们自己去找，我把我喜欢的几首放在`/music`目录下，里面有一个zip压缩包。后续可能会更新歌曲转光遇曲谱。

## 5. 进入游戏乐器界面

运行脚本前，先打开游戏，并进入可以点击琴键的乐器演奏界面。

确认 15 个琴键已经显示在屏幕上。当前脚本会根据设备宽高估算琴键位置，如果游戏界面、分辨率或横竖屏状态变化较大，点击位置可能需要后续调整。

![](/img/演奏界面.png)

## 6. 运行脚本

推荐流程：

1. 停在游戏乐器演奏界面。
2. 通过 AutoJs6 的快捷方式、悬浮入口或最近任务切换运行 `main.js`。
![](/img/选择脚本.png)
![](/img/选择main.png)
3. 在弹出的曲谱列表中选择要演奏的曲谱。
![](/img/选择曲谱.jpg)

4. 选中曲谱后，脚本会立刻开始按曲谱时间演奏。

如果曲谱目录中没有 `.txt` 或 `.json` 文件，脚本会提示：

```text
未找到任何 .txt 或 .json 曲谱文件
```

如果能看到曲谱选择框，说明脚本已经成功读取到曲谱目录。

## 演示视频

https://github.com/user-attachments/assets/40d471c5-1e68-4d9b-8537-7fbfaf0717f1

## 常见问题

### 找不到曲谱

确认曲谱是否放在：

```text
/sdcard/skyMusicAuto/mymusic
```

并确认文件名以 `.txt` 或 `.json` 结尾。

### 选择曲谱后没有点击游戏

确认 AutoJs6 的无障碍服务已经开启。还要确认选择曲谱后，当前前台界面是游戏乐器界面，而不是 AutoJs6 编辑器或其他页面。

### 点击位置不准

当前琴键坐标由设备宽高推算，主要适配横屏乐器界面。如果你的设备比例、游戏 UI 缩放或方向不同，可能需要调整 `main.js` 中的 `key0`、`Gap` 和 `keyMap` 相关逻辑。

### 运行时报 JSON 错误

说明曲谱文件内容不是合法 JSON，或者曲谱结构和脚本当前读取方式不一致。当前脚本读取的是：

```javascript
songData[0].songNotes
```

曲谱格式整理和导入流程后续可以单独完善。

## 当前版本说明

- 入口文件：`main.js`
- 运行环境：AutoJs6 / Android
- 曲谱目录：`/sdcard/skyMusicAuto/mymusic`
- 曲谱扩展名：`.txt`、`.json`
- 演奏方式：使用 AutoJs6 的 `gestures()` 执行多点和弦点击
