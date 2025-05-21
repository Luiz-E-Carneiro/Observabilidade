import Processo from './../model/Processo';
import { Request, Response } from "express";

// Função para criar um processo novo
export default async function createProcess(req: Request, res: Response): Promise<void> {
    try {
        const { system_id, process_name, steps } = req.body;

        if (!system_id || !process_name || !Array.isArray(steps)) {
            res.status(400).json({ error: 'Invalid or incorrect data.' });
            return;
        }

        const novoProcesso = new Processo({
            system_id,
            process_name,
            steps,
        });

        const processoSalvo = await novoProcesso.save();

        res.status(200).json({
            message: 'Process created successfully',
            timestamp: processoSalvo.createdAt
        });

    } catch (error: any) {
        console.error('Erro ao criar processo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}