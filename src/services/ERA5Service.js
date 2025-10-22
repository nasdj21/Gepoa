import { BaseService } from './BaseService'


class ERA5ServiceClass extends BaseService {
  constructor() {
    super('GEPOA_ERA5')
  }

}

export const ERA5Service = new ERA5ServiceClass()
