# 小學備試 · primary-prep-hub

考小（小學備試）練習遊戲總匯首頁。iPhone-first、繁體中文（香港）。

**Live：** https://tlc-cmyk.github.io/primary-prep-hub/

## 而家有嘅遊戲

| 遊戲 | Pages |
|------|-------|
| 加數積木星星 | https://tlc-cmyk.github.io/iphone-addition-blocks/ |
| 加數小鳥 | https://tlc-cmyk.github.io/flappy-addition/ |

## 點樣加新遊戲

1. 喺 `games.json` 加一筆（保持 JSON 陣列格式）：

```json
{
  "id": "my-new-game",
  "name": "遊戲名稱",
  "description": "一句簡短介紹",
  "url": "https://tlc-cmyk.github.io/my-new-game/",
  "emoji": "🎮",
  "accent": "#22c55e"
}
```

2. Commit + push 去 `main`；GitHub Pages 會自動更新。
3. （建議）喺新遊戲首頁加「返主頁」連去本 hub：
   `https://tlc-cmyk.github.io/primary-prep-hub/`

欄位說明：

- `id` — 唯一識別，方便之後擴充
- `name` — 卡片標題
- `description` — 一行描述
- `url` — 遊戲嘅 GitHub Pages 網址
- `emoji` — 卡片圖示（emoji）
- `accent` — 左邊色條同圖示底色（CSS color）

## 本機預覽

```bash
cd primary-prep-hub
python3 -m http.server 8080
# 開 http://127.0.0.1:8080/
```

## 結構

```
primary-prep-hub/
  index.html    # 主頁
  styles.css    # 樣式
  app.js        # 讀 games.json 畫卡片
  games.json    # 遊戲清單（加遊戲改呢度）
  icon.svg      # App icon
  manifest.json # PWA manifest
  .nojekyll
```
