# PIMS Simple Backend

## Setup

```bash
npm install
cp .env.example .env
```

Create the database by running:

```sql
source src/config/schema.sql;
```

Or paste `src/config/schema.sql` into MySQL Workbench / phpMyAdmin.

Start the backend:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```
