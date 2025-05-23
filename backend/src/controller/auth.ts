export default function auth(req: any, res: any, next: any) {
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