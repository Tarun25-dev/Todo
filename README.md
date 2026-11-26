# Todo App - Backend

A simple REST API for a todo app, built with express and typescript. Todos are currently stored in memory, so data resets when the server restarts. MongoDB (Mongoose) integration is the next step.

## Tech Stack

- Node.js
- Express
- Typescript (run with `tsx`)
- CORS and dotenv

## Project Structure

```
server/
├── src/
│   ├── index.ts          # App setup, middleware, server start
│   └── routes/
│       └── todos.ts      # Todo CRUD routes (in-memory)
├── .env
├── package.json
└── tsconfig.json
```
## Getting Started

### Prerequisites

- Node.js 18 or later

### Installation
```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in `server/`:
```bash
PORT=5000
```

### Run in Development

```bash
npm run dev
```

