import express from 'express';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/users.js';
import cors from 'cors';

export const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const port = 4000;

app.use(`/api/users`, userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server listening at http://localhost${process.env.PORT}`);
});
