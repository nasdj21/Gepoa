import { BaseService } from './BaseService'
import { supabase } from './supabase'

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

  async getValuesByCodAndDate(cod, variable, start, end) {
    const baseSelect = `fecha,"${variable}"`
    const codColumn = 'COD'

    let query = supabase
      .from('GEPOA_ERA5')
      .select(`${baseSelect},${codColumn}`)
      .eq(codColumn, cod)

    if (start) query = query.gte('fecha', start)
    if (end) query = query.lte('fecha', end)

    const { data, error } = await query.order('fecha', { ascending: true })
    if (error) {
      console.error('Error ERA5 getValuesByCodAndDate:', error)
      return []
    }

    return (data || []).map((row) => {
      const cleaned = { ...row }
      delete cleaned['COD']
      return cleaned
    })
  }
}

export const ERA5Service = new ERA5ServiceClass()
