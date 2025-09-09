import { BaseService } from './BaseService'

class MCServiceClass extends BaseService {
  constructor() {
    super('GEPOA_MC')
  }

  async getByCod(cod) {
    return this.select('*').eq('properties->>COD', cod)
  }
}

export const MCService = new MCServiceClass()
