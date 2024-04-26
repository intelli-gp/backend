#!/bin/sh
npx prisma db push &&
npx prisma studio &
npm install &&
npm run build && npm run start:prod