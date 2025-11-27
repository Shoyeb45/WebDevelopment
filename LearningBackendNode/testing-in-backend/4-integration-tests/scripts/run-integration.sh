sudo docker-compose up -d
echo 'Waiting for database to ready...'
ls
./scripts/wait-for-it.sh  "postgresql://postgres:mysecretpassword@localhost:5432/postgres" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
npm run test
sudo docker-compose down 
