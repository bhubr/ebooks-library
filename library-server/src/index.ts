import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import oauthRouter from './routes/oauth';
// import { User } from './entity/User';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/oauth', oauthRouter);


async function bootstrap() {
  await createConnection();

  const port = process.env.PORT;
  app.listen(port, () => console.log(`Listening on ${port}`));
}

bootstrap()
  .catch((error) => console.log(error));

// 
//   .then(async (connection) => {
//     console.log('Inserting a new user into the database...');
//     const user = new User();
//     user.firstName = 'Timber';
//     user.lastName = 'Saw';
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await connection.manager.find(User);
//     console.log('Loaded users: ', users);

//     console.log('Here you can setup and run express/koa/any other framework.');
//   })
//   .catch((error) => console.log(error));
