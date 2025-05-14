// Front End Code --> Para chamdaas e uso do fetch

class APIBack {
    ROTAS = {
        "STEP": '/step'
    }

    ENV_HOST = "http://localhost:3000"

    get(rota){
        console.log(`${this.ENV_HOST}${rota}`)

        return {data: []}
    }
}

const a = new APIBack()

console.log(a.get(a.ROTAS.STEP))