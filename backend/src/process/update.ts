import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Processo from './../model/Processo';

/**
 * Atualiza um processo existente pelo ID fornecido.
 *
 * @param {Request} req - Objeto da requisição contendo o parâmetro `id` e o corpo com os dados do processo.
 * @param {Response} res - Objeto da resposta para enviar confirmação ou erro.
 * @returns {Promise<void>} - Retorna uma Promise que resolve sem valor, enviando a resposta HTTP.
 *
 * @throws Retorna status 400 se o ID for inválido.
 * @throws Retorna status 404 se o processo não for encontrado.
 * @throws Retorna status 500 em caso de erro no servidor.
 */
export default async function updateProcess(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { system_id, process_name, steps } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const updated = await Processo.findByIdAndUpdate(
      id,
      { system_id, process_name, steps },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'Processo não encontrado' });
      return;
    }

    res.status(200).json({
      message: 'Process updated successfully',
      timestamp: updated.updatedAt
    });
  } catch (error: any) {
    res.status(500).json( `Erro ao atualizar processo: ${error}`);
  }
}
