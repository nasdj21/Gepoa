import { supabase } from './supabase'

export class BaseService {
  constructor(table) {
    this.table = table
  }

  async select(columns = '*') {
    const { data, error } = await supabase.from(this.table).select(columns)
    if (error) throw error
    return data
  }

  async rpc(functionName, params = {}) {
    const { data, error } = await supabase.rpc(functionName, params)
    if (error) throw error
    return data
  }
}
