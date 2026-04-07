# ארץ עיר 🌍

משחק ארץ עיר חי צומח דומם לילדים — PWA בעברית.

## התקנה

```bash
npm install
npm run dev
```

## בנייה לפרודקשן

```bash
npm run build
```

הפלט יהיה בתיקיית `dist/` — ניתן להעלות ישירות ל-GitHub Pages.

## GitHub Pages

1. צור ריפו חדש ב-GitHub
2. דחוף את הקוד
3. ב-Settings → Pages → Branch: `main` → Folder: `/dist`  
   **או** השתמש ב-GitHub Actions עם `actions/deploy-pages`

> **חשוב**: אם הריפו לא ב-root (למשל `username.github.io/eretz-ir`), הוסף ל-`vite.config.js`:
> ```js
> base: '/eretz-ir/'
> ```

## מבנה

```
src/
  data/words.js        ← מאגר ~2,200 מילים מקורי
  hooks/useGame.js     ← לוגיקת המשחק
  hooks/useHighScores.js
  components/
    StartScreen.jsx
    LetterReveal.jsx
    GameBoard.jsx
    ResultScreen.jsx
```

## אייקונים

יש להוסיף ידנית לתיקיית `public/icons/`:
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)

ניתן ליצור בחינם ב-[favicon.io](https://favicon.io)
