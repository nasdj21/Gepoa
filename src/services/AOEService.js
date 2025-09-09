import { BaseService } from './BaseService'

class AOEServiceClass extends BaseService {
  constructor() {
    super('GEPOA_AOE')
  }

  async getAsGeoJson() {
    const rows = await this.rpc('get_gepoa_aoe')

    return {
      type: 'FeatureCollection',
      name: 'GEPOA_AOE_4326',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
      },
      features: rows.map((r) => ({
        type: 'Feature',
        properties: {
          COD: r.cod,
          NOMBRE: r.nombre,
        },
        geometry: r.geometry,
      })),
    }
  }
}

export const AOEService = new AOEServiceClass()
