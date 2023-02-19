import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { childRouter } from './routers/child';
import { giftRouter } from './routers/gift';
import './utils/db';
import { handleError } from './utils/errors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());

app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);

app.listen(3001, 'localhost', () => {
  console.log('Listening on http://localhost:3001');
});
