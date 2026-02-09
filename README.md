# Love You More

Стек: **React + Tailwind** (клиент) и **Express + Nodemailer** в одном файле `server.js` (API).

## Структура

```
love_you_more/
├── client/           # React + Vite + Tailwind
├── public/           # собранный клиент (создаётся при build:vercel)
├── scripts/
│   └── copy-dist.js  # копирует client/dist → public
├── server.js         # API: GET /api/health, POST /api/mail/send
├── vercel.json       # builds (server.js + public) и routes
└── package.json
```

## Запуск

### 1. Сервер (Express)

```bash
cp .env.example .env
# Отредактируй .env: MAIL_HOST, MAIL_USER, MAIL_PASS и т.д.
npm run install:all
node server.js
```

API: `http://localhost:3000`  
- `GET /api/health` — проверка  
- `POST /api/mail/send` — отправка письма (body: `{ to, subject, text [, html ] }`)

### 2. Клиент (React)

В другом терминале:

```bash
npm run dev:client
```

Сайт: `http://localhost:5173`, запросы к API через прокси `/api` → `http://localhost:3000`.

### Переменные окружения

В корне (файл `.env` или переменные Vercel):

- `PORT` — порт (по умолчанию 3000)
- `CLIENT_URL` — origin для CORS
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`, `MAIL_SECURE` — SMTP для Nodemailer

**client:** `VITE_API_URL` — по умолчанию `/api`.

## Сборка

```bash
npm run build:vercel
```

Собирает клиент в `client/dist` и копирует в `public/`. Для Vercel этого достаточно (в `vercel.json` заданы `buildCommand` и `builds`).

Статика клиента будет в `client/dist`. Её можно раздавать любым веб-сервером или NestJS.

## Деплой на Vercel

Проект настроен на один деплой: и клиент, и сервер (NestJS) работают в одном проекте Vercel.

1. Подключи репозиторий к [Vercel](https://vercel.com/new). **Root Directory** оставь корень проекта (не `client`).
2. Сборка и вывод заданы в корневом `vercel.json`: сначала собирается сервер, потом клиент, статика — из `client/dist`, запросы `/api/*` обрабатывает NestJS как serverless-функция.
3. В настройках проекта Vercel → **Settings → Environment Variables** добавь переменные для сервера (то же, что в `server/.env`):
   - `CLIENT_URL` — URL фронта (например `https://твой-проект.vercel.app`)
   - `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`, при необходимости `MAIL_SECURE`
4. Деплой: каждый push в основную ветку или деплой через Vercel CLI (`npx vercel`).

Клиент ходит на API по относительному пути `/api`, поэтому отдельно задавать `VITE_API_URL` не нужно.

### Vercel не может клонировать репозиторий

**Что проверить:**

1. **Доступ к репо**  
   Vercel должен видеть репозиторий: [Vercel Dashboard](https://vercel.com) → **Settings** → **Git** → при необходимости нажми **Configure** у GitHub/GitLab и выдай доступ нужному репо (или всей организации).

2. **Приватный репо**  
   - На плане **Hobby**: деплой из приватного репо может делать только **владелец** команды, и его аккаунт Vercel должен быть **привязан к Git** (тот же GitHub/GitLab).  
   - Остальные участники не смогут запускать деплой из приватного репо на Hobby.  
   - Либо переведи репо в **Public**, либо используй план с поддержкой приватных репо.

3. **Права и команда**  
   Убедись, что пользователь, от имени которого идёт push, входит в команду Vercel и что его Git-аккаунт привязан в настройках Vercel.

4. **Повторное подключение**  
   В проекте: **Settings** → **Git** → **Disconnect** → снова **Connect Git Repository** и выбери тот же репо. После этого попробуй задеплоить ещё раз.

Если после этого клонирование всё равно не проходит — пришли точный текст ошибки из лога деплоя (Build Log) на шаге "Cloning...".

### Ошибка DEPLOYMENT_NOT_FOUND

Ошибка возникает, когда запрос идёт на **несуществующий деплой** (неверный или удалённый URL).

**Что сделать:**

1. **Открываешь сайт в браузере** — используй стабильный URL: production (`https://твой-проект.vercel.app`) или актуальный preview из последнего деплоя. Старые preview-ссылки (например, после удаления ветки) могут вернуть DEPLOYMENT_NOT_FOUND.
2. **Клиент обращается к API** — не задавай `VITE_API_URL` полным URL вида `https://xxx-xxx.vercel.app/api` (особенно preview). Оставь относительный путь `/api` или переменную без значения, чтобы запросы шли на тот же домен, что и фронт.
3. **CLIENT_URL (CORS)** — в настройках Vercel укажи стабильный origin, например `https://твой-проект.vercel.app`, а не ссылку на конкретный preview-деплой.
