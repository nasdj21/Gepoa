import { BaseService } from './BaseService'
import { supabase } from './supabase'

class AOEServiceClass extends BaseService {
  constructor() {
    super('GEPOA_AOE')
  }

  async getAsGeoJson() {
    const { data, error } = await supabase
      .from('GEPOA_AOE')
      .select('cod, nombre, geom')

    if (error) {
      console.error('Error cargando geometrías:', error)
      return { type: 'FeatureCollection', name: 'GEPOA_AOE_4326', features: [] }
    }

    return {
      type: 'FeatureCollection',
      name: 'GEPOA_AOE_4326',
      features: (data || []).map((row) => ({
        type: 'Feature',
        properties: {
          COD: row.cod,
          NOMBRE: row.nombre,
        },
        geometry:
          typeof row.geom === 'string'
            ? JSON.parse(row.geom)
            : row.geom,
      })),
    }
  }

  async getAllZones() {
    const { data, error } = await supabase
      .from('GEPOA_AOE')
      .select('cod, nombre')
    if (error) {
      console.error('Error cargando zonas:', error)
      return []
    }
    return data
  }
}

export const AOEService = new AOEServiceClass()
