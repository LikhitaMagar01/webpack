installation:
1. npm init -y
2. npm install fastify mongoose dotenv fastify-cors
3. npm install @types/node @types/mongoose typescript ts-node-dev -D
4. npm install nodemon

create tsconfig.json
1. npx tsc --init

create mongodb connection
1. create db in mongo
2. /src/config/db.ts

create nodemon.json file
1. touch nodemon.json
2. add followings
3. make changes in scripts

create index.ts to make connection and add route

to run the backend:
dev: npm run dev
prod: npx tsc 
      npm run build
      npm start