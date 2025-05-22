# ✅ Todo Summary Assistant

A full-stack productivity tool that allows users to manage to-do items, summarize pending tasks using an LLM (OpenAI), and send the summary to a Slack channel via webhook.

## 🚀 Live Demo


## 🧩 Features

- 📝 Add, edit, and delete to-do items.
- 📋 View current to-do list.
- 🤖 Generate meaningful summary using OpenAI's GPT API.
- 📤 Post the summary to a Slack channel via webhook.
- ✅ Visual success/failure feedback for Slack operation.

---

## 🧰 Tech Stack

| Layer       | Technology                 |
|------------|-----------------------------|
| Frontend    | React + Vite, Axios        |
| Backend     | Node.js, Express           |
| LLM API     | OpenAI GPT (or Cohere, etc.) |
| Slack       | Slack Incoming Webhooks    |
| Database    | Supabase PostgreSQL / Firebase Firestore |
| Hosting     | Vercel / Netlify / Render  |

---

## 📁 Project Structure

### Frontend
````
/frontend
│
├── /src
│   ├── /components
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── /pages
│   │   └── Home.jsx
│   ├── /api
│   │   └── todoApi.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
````

### Backend

````
/backend
│
├── /controllers
│   ├── todoController.js
│   └── summarizeController.js
├── /routes
│   ├── todoRoutes.js
│   └── summarizeRoute.js
├── /utils
│   ├── openai.js
│   └── slack.js
├── /models
│   └── db.js  (Supabase client or pg client)
├── server.js
└── package.json
---
````

## ⚙️ API Endpoints

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/todos`         | Fetch all to-dos                   |
| POST   | `/todos`         | Add a new to-do                    |
| DELETE | `/todos/:id`     | Delete a specific to-do            |
| POST   | `/summarize`     | Generate summary and send to Slack |

---

## 🔐 Slack Setup

1. Go to [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks).
2. Create a new webhook and choose your channel.
3. Copy the **Webhook URL**.
4. Add it to your `.env` file as:

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXXXX
OPENAI_API_KEY=sk-...
```

## Cloning
git clone [https://github.com/akshatverma01/todo-summary-assistant.git](https://github.com/Akshatverma01/Todo-Assistant)
cd todo-summary-assistant

### Run Backend 

cd backend
npm install
npm run dev

### Run Frontend 
cd ../frontend
npm install
npm run dev

