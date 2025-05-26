import Processo from './../model/Processo';

import { Request, Response } from "express";

/**
 * Recupera todos os processos do banco de dados.
 *
 * @param {Request} req - Objeto da requisição.
 * @param {Response} res - Objeto da resposta para enviar os processos ou erro.
 * @returns {Promise<void>} - Retorna uma Promise que resolve sem valor, enviando a resposta HTTP.
 *
 * @throws Retorna status 500 em caso de erro no servidor.
 */
export async function process(req: Request, res: Response): Promise<void> {
    
    try {
        const processos = await Processo.find();
        res.status(200).send(processos);
    } catch (error: any) {
        res.status(500).send(error.message || "Erro no servidor");
    }

}

/**
 * Busca um processo específico pelo ID fornecido nos parâmetros da requisição.
 *
 * @param {Request} req - Objeto da requisição contendo o parâmetro `id` do processo.
 * @param {Response} res - Objeto da resposta para enviar o processo encontrado ou erro.
 * @returns {Promise<void>} - Retorna uma Promise que resolve sem valor, enviando a resposta HTTP.
 *
 * @throws Retorna status 200 com o processo encontrado.
 * @throws Retorna status 500 em caso de erro no servidor ou ID inválido.
 */
export async function findProcess(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        const processo = await Processo.findById(id);
        res.status(2000).send(processo);
    } catch (err: any) {
        res.status(500).send(`Id não encontrado. \n ${err}`);        
    }
}