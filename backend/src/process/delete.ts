import Processo from './../model/Processo';
import mongoose from 'mongoose';
import { Request, Response } from "express";

/**
 * Remove um processo do banco de dados pelo ID fornecido nos parâmetros da requisição.
 *
 * @param {Request} req - Objeto da requisição contendo o parâmetro `id` do processo a ser deletado.
 * @param {Response} res - Objeto da resposta para enviar status e mensagem ao cliente.
 * @returns {Promise<void>} - Retorna uma Promise que resolve sem valor, enviando a resposta HTTP.
 *
 * @throws Retorna status 400 se o ID fornecido for inválido.
 * @throws Retorna status 404 se o processo não for encontrado.
 * @throws Retorna status 500 em caso de erro interno ao tentar deletar o processo.
 */
export default async function deleteProcess(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const result = await Processo.findByIdAndDelete(id);
    
    if (!result) {
      res.status(404).json({ error: 'Processo não encontrado' });
      return;
    }

    res.status(200).json({ message: 'Processo deletado com sucesso' });
    
  } catch (error: any) {

    console.error('Erro ao deletar processo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });

  }
}