import Processo from './../model/Processo';
import { Types } from 'mongoose';
import { Request, Response } from "express";

/**
 * Controlador que lida com a busca de processos.
 *
 * - Se nenhum filtro for aplicado, retorna os últimos 10 processos atualizados.
 * - Se algum filtro (_id, sys_id, name) for aplicado, retorna todos os que correspondem.
 *
 * Filtros:
 * - `_id`: busca exata por ObjectId.
 * - `sys_id`: busca parcial e case-insensitive no campo `system_id`.
 * - `name`: busca parcial e case-insensitive no campo `process_name`.
 *
 * @param {Request} req - Objeto da requisição Express. Espera os filtros em `req.query`.
 * @param {Response} res - Objeto da resposta Express.
 *
 * @returns {Promise<void>} Retorna uma resposta JSON com os processos encontrados ou erro 500 em caso de falha.
 */
export default async function process(req: Request, res: Response) {
  try {
    const { _id, sys_id, name } = req.query;

    const filters: any = {};

    if (_id && typeof _id === 'string') {
      if (Types.ObjectId.isValid(_id)) {
        filters._id = new Types.ObjectId(_id);
      } else {
        filters._id = null;
      }
    }

    if (sys_id && typeof sys_id === 'string') {
      filters.system_id = { $regex: sys_id, $options: 'i' };
    }

    if (name && typeof name === 'string') {
      filters.process_name = { $regex: name, $options: 'i' };
    }

    const hasAnyFilter = Object.keys(filters).length > 0;

    const query = Processo.find(filters).sort({ updatedAt: -1 });

    if (!hasAnyFilter) {
      query.limit(10);
    }

    const results = await query.exec();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar processos' });
  }
}