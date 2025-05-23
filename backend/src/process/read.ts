import Processo from './../model/Processo';

import { Request, Response } from "express";

// Função para retornar todos os processos
export async function process(req: Request, res: Response): Promise<void> {
    
    try {
        const processos = await Processo.find();
        res.status(200).send(processos);
    } catch (error: any) {
        res.status(500).send(error.message || "Erro no servidor");
    }

}

// Função para encontrar um processo através do id
export async function findProcess(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        const processo = await Processo.findById(id);
        res.status(2000).send(processo);
    } catch (err: any) {
        res.status(500).send(`Id não encontrado. \n ${err}`);        
    }
}