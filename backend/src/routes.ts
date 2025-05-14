import Processo from "../models/Processo";
import { Router } from "express";
import { Request, Response  } from "express";

export const route = Router();

function auth(req: any, res: any, next: any) {
    const apiKey = req.headers["x-api-key"]

    if (apiKey == 123456789) {
        next();
    } else {
        res.status(401).send(
            {
                messsage: "Não autorizado"
            }
        )

    }

}

function cliente(req: any, res: any, next: any) {
    return res.status(200).send({
        nome: "Gabriel zamboni"
    })
}

route.post('/cliente', auth, cliente);

// ----------------------------------------------------------------------

async function process(req: Request, res: Response, next:any) {
    try {
        const processos = await Processo.find();
        res.status(200).send(processos);
    } catch (error: any) {
        res.status(500).send(error.message || "Erro no servidor");
    }
}
route.get("/processo", auth, process);