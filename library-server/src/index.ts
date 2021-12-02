import 'reflect-metadata';
import express from 'express';
import expressJwt from 'express-jwt';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';

import './env';
import oauthRouter from './routes/oauth';
import authRouter from './routes/auth';

const app = express();
app.use(morgan('dev'));
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_APP_ORIGIN]
}));
app.use(express.json());
app.use(cookieParser());
const jwtMiddleware = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  getToken: function fromHeaderOrQuerystring (req) {
    const { jwt } = req.cookies;
    return jwt || null;
  },
});

app.use('/api/oauth', oauthRouter);
app.use('/api/auth', jwtMiddleware, authRouter);

async function bootstrap() {
  await createConnection();

  const port = process.env.PORT;
  app.listen(port, () => console.log(`Listening on ${port}`));
}

bootstrap()
  .catch((error) => console.log(error));
