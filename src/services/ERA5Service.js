import { BaseService } from './BaseService'

class ERA5ServiceClass extends BaseService {
  constructor() {
    super('GEPOA_ERA5')
  }

  async getByCod(cod) {
    return this.select('*').eq('properties->>COD', cod)
  }
}

export const ERA5Service = new ERA5ServiceClass()
