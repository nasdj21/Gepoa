import { BaseService } from './BaseService'

class MCServiceClass extends BaseService {
  constructor() {
    super('GEPOA_MC')
  }

  async getByCod(cod) {
    const data = await this.select('*').eq('COD', cod)
    return data[0] || null
  }
}

export const MCService = new MCServiceClass()
