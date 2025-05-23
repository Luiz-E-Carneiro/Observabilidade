import {config } from 'dotenv';
import express from 'express';
import {connectToDatabase} from './server/server';
import { route} from './routes';

const cors =  require('cors');

config({
    path:"",
    debug: true
})

const app = express();

const PORT: string = process.env.PORT as string ?? 300;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

app.use(route);

// Conexão com o BD
connectToDatabase();

app.listen(PORT, () => {
console.log(`Server rodando em http://localhost:${PORT}`);
});