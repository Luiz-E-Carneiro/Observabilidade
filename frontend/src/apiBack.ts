/**
 * Classe para interagir com a API backend dos processos.
 */
class APIBack {
  // Rotas usadas pela API
  ROTAS = {
    PROCESSOS: '/processo',
    PROCESSO_POR_ID: (id: string) => `/processo/${id}`,
  };

  // Retorna a URL base da API (host) definida nas variáveis de ambiente
  get ENV_HOST() {
    return process.env.NEXT_PUBLIC_HOST_BACK;
  }

  // Cabeçalhos HTTP usados nas requisições
  get HEADERS() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
    };
  }

  /**
   * Busca todos os processos do backend.
   * @returns {Promise<any[]>} Lista dos processos ou array vazio em caso de erro.
   */
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

  /**
   * Busca um processo específico pelo seu ID.
   * @param {string} id - ID do processo.
   * @returns {Promise<any | null>} Dados do processo ou null em caso de erro.
   */
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