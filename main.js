// 默认琴键位置,通过计算得出，是猜测，不一定准确。
let w = device.width;//更大一点
let h = device.height;
if(device.width < device.height) {
    w = device.height;
    h = device.width;
}

let key0 = {x: w/3, y: h/7};   // 左上角
let Gap = (w/2-w/3)/2;  // 

let keyMap = {
    'Key0':  {x: key0.x + 0 * Gap, y: key0.y + 0 * Gap},
    'Key1':  {x: key0.x + 1 * Gap, y: key0.y + 0 * Gap},
    'Key2':  {x: key0.x + 2 * Gap, y: key0.y + 0 * Gap},
    'Key3':  {x: key0.x + 3 * Gap, y: key0.y + 0 * Gap},
    'Key4':  {x: key0.x + 4 * Gap, y: key0.y + 0 * Gap},
    'Key5':  {x: key0.x + 0 * Gap, y: key0.y + 1 * Gap},
    'Key6':  {x: key0.x + 1 * Gap, y: key0.y + 1 * Gap},
    'Key7':  {x: key0.x + 2 * Gap, y: key0.y + 1 * Gap},
    'Key8':  {x: key0.x + 3 * Gap, y: key0.y + 1 * Gap},
    'Key9':  {x: key0.x + 4 * Gap, y: key0.y + 1 * Gap},
    'Key10': {x: key0.x + 0 * Gap, y: key0.y + 2 * Gap},
    'Key11': {x: key0.x + 1 * Gap, y: key0.y + 2 * Gap},
    'Key12': {x: key0.x + 2 * Gap, y: key0.y + 2 * Gap},
    'Key13': {x: key0.x + 3 * Gap, y: key0.y + 2 * Gap},
    'Key14': {x: key0.x + 4 * Gap, y: key0.y + 2 * Gap}
};


// 曲谱文件夹路径
const musicDir = "/sdcard/skyMusicAuto/mymusic";
// 获取所有支持的曲谱文件，.txt 继续按 JSON 内容解析，.json 作为更直观的新格式
function isSongFile(fileName) {
    let lowerName = fileName.toLowerCase();
    return lowerName.endsWith('.txt') || lowerName.endsWith('.json');
}

let filesList = files.listDir(musicDir).filter(isSongFile);
if (filesList.length === 0) {
    toast("未找到任何 .txt 或 .json 曲谱文件");
    exit();
}
// 让用户选择曲谱
let idx = dialogs.select("请选择要演奏的曲谱：", filesList);
if (idx < 0) exit();
let txtPath = musicDir + "/" + filesList[idx];

// 读取并解析谱子
let txt = files.read(txtPath);
let songData = JSON.parse(txt);
const notes = songData[0].songNotes;

// 获取起始时间
const startTime = new Date().getTime();

// 按键操作函数（多点和弦用 gestures 实现）
function pressChord(keys) {
    let gesturesArr = [];
    for (let i = 0; i < keys.length; i++) {
        // 统一转成 KeyN 形式
        let keyNum = keys[i].replace(/^(?:\d)?Key(\d{1,})$/, '$1');
        let keyName = 'Key' + keyNum;
        let pos = keyMap[keyName];
        if (pos) {
            gesturesArr.push([0, 50, [pos.x, pos.y], [pos.x, pos.y]]);
        }
    }
    if (gesturesArr.length > 0) {
        eval('gestures(' + gesturesArr.map(JSON.stringify).join(',') + ')');
    }
}

// 主演奏循环（预览窗口+真正多点和弦点击）
const PREVIEW_WINDOW = 10; // 每次预览10个音符
let i = 0;
while (i < notes.length) {
    // 预览窗口
    let windowNotes = notes.slice(i, i + PREVIEW_WINDOW);
    let note = windowNotes[0];
    let now = new Date().getTime();
    let wait = startTime + note.time - now;
    if (wait > 0) sleep(wait);

    // 检查窗口内有多少同一时刻的音符
    let chord = [note];
    let j = 1;
    while (j < windowNotes.length && Math.abs(windowNotes[j].time - note.time) < 10) {
        chord.push(windowNotes[j]);
        j++;
    }
    // 用 gestures 实现和弦多点点击
    pressChord(chord.map(n => n.key));
    i += chord.length;
}
