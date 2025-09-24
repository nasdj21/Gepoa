import { BaseService } from './BaseService'
import { supabase } from './supabase'

class MCServiceClass extends BaseService {
  constructor() {
    super('GEPOA_MC')
  }

  async getValuesByCodAndDate(cod, variable, start, end) {
    let query = supabase
      .from('GEPOA_MC')
      .select(`Fecha,"${variable}"`)
      .eq('COD', cod)

    if (start) query = query.gte('Fecha', start)
    if (end) query = query.lte('Fecha', end)

    const { data, error } = await query.order('Fecha', { ascending: true })
    if (error) {
      console.error('Error MC getValuesByCodAndDate:', error)
      return []
    }
    return data
  }
}

export const MCService = new MCServiceClass()
