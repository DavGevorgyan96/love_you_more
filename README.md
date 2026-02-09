# Love You More

Полноценный стек: **React + Tailwind** (клиент) и **NestJS + Nodemailer** (сервер).

## Структура

```
love_you_more/
├── client/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── api/            # API-клиент
│   │   ├── components/     # React-компоненты
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                 # NestJS + Nodemailer
│   ├── src/
│   │   ├── mail/           # Модуль почты (Nodemailer)
│   │   │   ├── dto/
│   │   │   ├── mail.controller.ts
│   │   │   ├── mail.service.ts
│   │   │   └── mail.module.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── package.json
│   ├── nest-cli.json
│   └── tsconfig.json
└── README.md
```

## Запуск

### 1. Сервер (NestJS)

```bash
cd server
cp .env.example .env
# Отредактируй .env: MAIL_HOST, MAIL_USER, MAIL_PASS и т.д.
npm install
npm run start:dev
```

API: `http://localhost:3000`  
- `GET /health` — проверка  
- `POST /mail/send` — отправка письма (body: `{ to, subject, text [, html ] }`)

### 2. Клиент (React)

```bash
cd client
npm install
npm run dev
```

Сайт: `http://localhost:5173`  
Запросы к API идут через прокси `/api` → `http://localhost:3000`.

### Переменные окружения

**server/.env**

- `PORT` — порт сервера (по умолчанию 3000)
- `CLIENT_URL` — origin клиента для CORS (по умолчанию http://localhost:5173)
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`, `MAIL_SECURE` — настройки SMTP для Nodemailer

**client**

- `VITE_API_URL` — базовый URL API (по умолчанию `/api` для прокси Vite)

## Сборка

```bash
# Сервер
cd server && npm run build && npm run start:prod

# Клиент
cd client && npm run build
```

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
