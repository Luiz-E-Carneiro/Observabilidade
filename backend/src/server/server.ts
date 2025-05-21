
import {config } from 'dotenv'
import mongoose from 'mongoose';
config({
    path:"",
    debug: true
})

const URL_DB: string = `mongodb+srv://${process.env.USER as string}:${process.env.PASSWORD as string}@cluster0.ykbb1b2.mongodb.net/${process.env.DATABASE as string}`;

/**
 * Realiza a conexão com o banco de dados MongoDB usando Mongoose.
 *
 * @async
 * @function connectToDatabase
 * @returns {Promise<void>} Retorna uma Promise que resolve quando a conexão é estabelecida.
 *
 * @throws {Error} Lança erro no console caso a conexão falhe.
 */
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(URL_DB);
        console.log("Conectado ao Banco");
    } catch (err) {
        console.error("Erro ao tentar se conectar ao banco", err);
    }
};

export const disconnectDatabase = () => mongoose.connection.close();