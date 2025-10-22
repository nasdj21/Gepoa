import { BaseService } from './BaseService'

class OISSTServiceClass extends BaseService {
  constructor() {
    super('GEPOA_OISST')
  }

}

export const OISSTService = new OISSTServiceClass()
