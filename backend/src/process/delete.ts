import Processo from './../model/Processo';
import mongoose from 'mongoose';
import { Request, Response } from "express";


// Função para deletar um processo
export default async function deleteProcess(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const result = await Processo.findByIdAndDelete(id);
    
    if (!result) {
      res.status(404).json({ error: 'Process not found' });
      return;
    }

    res.status(200).json({ message: 'Process deleted successfully' });
    
  } catch (error: any) {

    console.error('Erro ao deletar processo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });

  }
}