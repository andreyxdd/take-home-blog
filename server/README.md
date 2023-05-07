# Server Side

To run server locally:
```
yarn install
yarn dev
```
Open [http://localhost:4000/api/docs](http://localhost:3000/api/docs) to view the API documentation (Swagger) in the browser.

To initialize PostgreSQL db and schemas (provided that the `DATABASE_URL` string is in `.env`):
```
npx prisma migrate dev --name init
npx generate
```
