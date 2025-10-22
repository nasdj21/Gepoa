import { BaseService } from './BaseService'


class MCServiceClass extends BaseService {
  constructor() {
    super('GEPOA_MC')
  }


}

export const MCService = new MCServiceClass()
