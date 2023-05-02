# Server Side

To run server:
```
yarn install
yarn dev
```

To initialize PostgreSQL db and schemas (provided that the `DATABASE_URL` string is in `.env`):
```
npx prisma migrate dev --name init
npx generate
```