import { BaseService } from './BaseService'

class ERA5ServiceClass extends BaseService {
  constructor() {
    super('GEPOA_ERA5')
  }

  async getAveragesByCodAndDate(cod, start, end) {
    const rows = await this.rpc('get_era5_avg_range', {
      cod_input: cod,
      start_date: start,
      end_date: end,
    })
    return rows[0] || null
  }
}

export const ERA5Service = new ERA5ServiceClass()
