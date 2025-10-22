import { BaseService } from './BaseService'
import { supabase } from './supabase'

class OISSTServiceClass extends BaseService {
  constructor() {
    super('GEPOA_OISST')
  }

  async getValuesByCodAndDate(cod, variable, start, end) {
    const baseSelect = `fecha,"${variable}"`
    const codColumn = 'COD'

    let query = supabase
      .from('GEPOA_OISST')
      .select(`${baseSelect},${codColumn}`)
      .eq(codColumn, cod)

    if (start) query = query.gte('fecha', start)
    if (end) query = query.lte('fecha', end)

    const { data, error } = await query.order('fecha', { ascending: true })
    if (error) {
      console.error('Error OISST getValuesByCodAndDate:', error)
      return []
    }

    return (data || []).map((row) => {
      const cleaned = { ...row }
      delete cleaned['COD']
      return cleaned
    })
  }
}

export const OISSTService = new OISSTServiceClass()
