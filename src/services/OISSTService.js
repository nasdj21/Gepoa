import { BaseService } from './BaseService'

class OISSTServiceClass extends BaseService {
  constructor() {
    super('GEPOA_OISST')
  }

  async getByCod(cod) {
    return this.select('*').eq('properties->>COD', cod)
  }
}

export const OISSTService = new OISSTServiceClass()
