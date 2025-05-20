# Personal Expense Tracker

A full-stack web application to track personal expenses with adding and filtering features. Built using React and a Node.js backend.

---

## Features

- Authentication with React Context
- Add expenses (description, amount, category, date)
- Filter by category and date range
- Edit or delete existing expenses
- monthly report component
- responsive UI with Tailwind CSS

---

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios

### Backend (Not Included Here)

- Node.js
- Express
- MySQL
- Sequelize

---

## Getting Started

### Clone

```bash
git clone https://github.com/Hossamb1/personal-expense-tracker.git
cd personal-expense-tracker
```

### Start the Server

```bash
cd backend
npm install
npm run dev
```

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Before running the app, create a `.env` file in the root directory with the following variables:

```env
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
DB_HOST=your_database_host
JWT_SECRET=your_jwt_secret
```

---

## API Structure (Frontend Integration)

All API calls are made through /api/expenses:

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/expenses`        | Fetch all (with filters) |
| POST   | `/expenses`        | Add a new expense        |
| PUT    | `/expenses/:id`    | Update an expense        |
| DELETE | `/expenses/:id`    | Delete an expense        |
| Get    | `/expenses/report` | Monthly report           |

---

## Hours Spent

| Task                       | Estimated Hours   |
| -------------------------- | ----------------- |
| Project Setup              | 1 hour            |
| Authentication Integration | 1 hours           |
| Expense CRUD Functionality | 2 hours           |
| Filtering & Monthly Report | 1.5 hours         |
| Styling (Tailwind CSS)     | 1.5 hours         |
| README & Documentation     | 20 mins           |
| Testing Setup              | 40 mins           |
| **Total**                  | **about 8 hours** |

and that's all folks.

made by,<br/>
_**Hossam Barakat**_
