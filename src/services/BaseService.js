import { supabase } from './supabase'

export class BaseService {
  constructor(table) {
    this.table = table
  }

  query(columns = '*') {
    return supabase.from(this.table).select(columns)
  }

  async rpc(functionName, params = {}) {
    const { data, error } = await supabase.rpc(functionName, params)
    if (error) throw error
    return data
  }
}
