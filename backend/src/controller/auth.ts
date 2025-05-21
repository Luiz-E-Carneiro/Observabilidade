export default function auth(req: any, res: any, next: any) {
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