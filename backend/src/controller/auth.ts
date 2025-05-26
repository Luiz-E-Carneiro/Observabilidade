import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de autenticação baseado em API Key no cabeçalho.
 *
 * Verifica se o cabeçalho "x-api-key" está presente e confere se corresponde à chave configurada
 * no ambiente (process.env.API_KEY). Se válido, permite que a requisição prossiga; caso contrário,
 * responde com status 401 (Não autorizado).
 *
 * @param {Request} req - Objeto da requisição HTTP.
 * @param {Response} res - Objeto da resposta HTTP.
 * @param {NextFunction} next - Função para passar o controle para o próximo middleware/handler.
 */
export default function auth(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers["x-api-key"]

    if (apiKey == process.env.API_KEY) {
        next();
    } else {
        res.status(401).send(
            {
                messsage: "Não autorizado"
            }
        )

    }

}