class APIBack {
  ROTAS = {
    PROCESSOS: '/processo',
    PROCESSO_POR_ID: (id: string) => `/processo/${id}`,
  };

  get ENV_HOST() {
    return process.env.NEXT_PUBLIC_HOST_BACK;
  }

  get HEADERS() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    };
  }

  async getAllProcesses() {
    try {
      const res = await fetch(this.ENV_HOST + this.ROTAS.PROCESSOS, {
        headers: this.HEADERS,
      });
      return await res.json();
    } catch (e) {
      console.error('Erro ao buscar processos:', e);
      return [];
    }
  }

  async getProcessById(id: string) {
    try {
      const res = await fetch(this.ENV_HOST + this.ROTAS.PROCESSO_POR_ID(id), {
        headers: this.HEADERS,
      });
      return await res.json();
    } catch (e) {
      console.error('Erro ao buscar processo:', e);
      return null;
    }
  }
}

export const apiBack = new APIBack();