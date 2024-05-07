#!/bin/sh
npx prisma db push --accept-data-loss &&
npx prisma studio &
npm install &&
npm run build && npm run start:prod