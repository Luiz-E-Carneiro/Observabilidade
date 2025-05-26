import Processo from './../model/Processo';
import { Request, Response } from "express";

/**
 * Cria um novo processo no banco de dados a partir dos dados recebidos na requisição.
 *
 * @param {Request} req - Objeto da requisição contendo no corpo os campos `system_id`, `process_name` e `steps`.
 * @param {Response} res - Objeto da resposta para enviar o status e mensagem ao cliente.
 * @returns {Promise<void>} - Retorna uma Promise que resolve sem valor, enviando a resposta HTTP.
 *
 * @throws Retorna status 400 caso os dados estejam ausentes ou incorretos.
 * @throws Retorna status 500 em caso de erro interno ao salvar o processo.
 */
export default async function createProcess(req: Request, res: Response): Promise<void> {
    try {
        const { system_id, process_name, steps } = req.body;

        if (!system_id || !process_name || !Array.isArray(steps)) {
            res.status(400).json({ error: 'Dados incorretos ou inválidos' });
            return;
        }

        const novoProcesso = new Processo({
            system_id,
            process_name,
            steps,
        });

        const processoSalvo = await novoProcesso.save();

        res.status(200).json({
            message: 'Processo criado com sucesso',
            timestamp: processoSalvo.createdAt
        });

    } catch (error: any) {
        res.status(500).json({ error: `Erro ao criar processo: ${error}` });
    }
}