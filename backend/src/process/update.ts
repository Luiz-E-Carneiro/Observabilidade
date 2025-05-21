import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Processo from './../model/Processo';

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
      res.status(404).json({ error: 'Process not found' });
      return;
    }

    res.status(200).json({
      message: 'Process updated successfully',
      timestamp: updated.updatedAt
    });
  } catch (error: any) {
    console.error('Erro ao atualizar processo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
