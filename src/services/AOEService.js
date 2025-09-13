import { BaseService } from './BaseService'
import { supabase } from './supabase'

class AOEServiceClass extends BaseService {
  constructor() {
    super('GEPOA_AOE')
  }

  async getAsGeoJson() {
    const rows = await this.rpc('get_gepoa_aoe')

    return {
      type: 'FeatureCollection',
      name: 'GEPOA_AOE_4326',
      features: rows.map((r) => ({
        type: 'Feature',
        properties: {
          COD: r.cod,
          NOMBRE: r.nombre,
        },
        geometry: typeof r.geometry === 'string' ? JSON.parse(r.geometry) : r.geometry,
      })),
    }
  }

  async getAllZones() {
    const { data, error } = await supabase
      .from('GEPOA_AOE')
      .select('cod, nombre')   // 👈 seleccionamos solo lo necesario

    if (error) {
      console.error('Error cargando zonas:', error)
      return []
    }
    return data
  }
}

export const AOEService = new AOEServiceClass()
