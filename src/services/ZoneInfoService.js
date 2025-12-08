import { supabase } from './supabase'

const TABLE = 'GEPOA_AOE'

const mapRowToInfo = (row) => {
  if (!row) return null

  const summary = row.desc || ''
  const name = row.nombre

  return {
    cod: row.cod,
    name,
    summary,
  }
}

export const ZoneInfoService = {
  async getByCod(cod) {
    if (!cod) return null

    const { data, error } = await supabase.from(TABLE).select('*').eq('cod', cod).limit(1)
    if (error) {
      console.error('Error cargando informacion de zona:', error)
      return null
    }

    const row = Array.isArray(data) ? data[0] : data
    return mapRowToInfo(row)
  },
}
