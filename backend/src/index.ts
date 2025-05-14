import {config } from 'dotenv';
import express, { Request, Response } from 'express';
import {connectToDatabase} from './server';
import { route} from './routes';
const cors =  require('cors');
config({
    path:"",
    debug: true
})

const app = express();
const PORT: string = process.env.PORT as string;
app.use(route);
app.use(cors());
connectToDatabase();

// app.get('/', (req: Request, res: Response) => {
//     res.send('Opa!');
//  });

app.listen(PORT, () => {
console.log(`Server rodando em http://localhost:${PORT}`);
});