import { BaseService } from './BaseService'

class OISSTServiceClass extends BaseService {
  constructor() {
    super('GEPOA_OISST')
  }

  async getByCod(cod) {
    const data = await this.select('*').eq('properties.COD', cod)
    return data[0] || null
  }
}

export const OISSTService = new OISSTServiceClass()
