# pims-project

## 1. Run the database file

Open MySQL and run schema.sql.

Example:

SOURCE /full/path/to/pims-project/schema.sql;

## 2. Start backend

cd server
npm run dev

## 3. Start frontend

cd client
npm run dev

## Notes

- Backend runs on port 1434
- Frontend runs on port 5173
- Auth uses Username and hashed Password
- Add your own backend features inside controllers and routes
- Add your own frontend screens inside client/src/pages
