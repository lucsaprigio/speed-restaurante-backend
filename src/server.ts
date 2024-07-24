import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());
app.use(bodyParser.text({ type: 'text/html' }));
app.use(router);

app.listen(8082, () => {
  console.log("Servidor rodando na porta 8082!")
});