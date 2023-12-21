# Generate Prisma Client types and push the Prisma schema state to the database
npx prisma db push

# Start the development server with Prisma Client connected to the DB in background
npx prisma studio & 
npm run start:dev;

# Remove all dangling images
docker image prune ;