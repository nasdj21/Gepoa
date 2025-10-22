import { supabase } from './supabase'

export class BaseService {
  constructor(table, { codColumn = 'COD', dateColumn = 'fecha' } = {}) {
    this.table = table
    this.codColumn = codColumn
    this.dateColumn = dateColumn
  }

  query(columns = '*') {
    return supabase.from(this.table).select(columns)
  }



  async getValuesByCodAndDate(cod, variable, start, end) {
  const baseSelect = `${this.dateColumn},"${variable}"`
  let query = supabase
    .from(this.table)
    .select(`${baseSelect},${this.codColumn}`)
    .eq(this.codColumn, cod)

  if (start) query = query.gte(this.dateColumn, start)
  if (end) query = query.lte(this.dateColumn, end)

  const { data, error } = await query.order(this.dateColumn, { ascending: true })
  if (error) {
    console.error(`Error ${this.table} getValuesByCodAndDate:`, error)
    return []
  }

  return (data || []).map((record) => {
  const cleaned = { ...record }
  delete cleaned[this.codColumn]
  return cleaned
  })

}

}
