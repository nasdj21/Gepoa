export class TimelineCsvExporter {
  static download({ rows, variable, zone, dateStart, dateEnd }) {
    if (!Array.isArray(rows) || rows.length === 0) return

    const filename = this.buildFilename({ zone, variable, dateStart, dateEnd })
    const valueKey = variable || 'valor'
    const header = ['fecha', valueKey]

    const csvLines = [header, ...rows.map((row) => [row.fecha, row[variable] ?? row[valueKey] ?? ''])].map((line) =>
      line.join(',')
    )

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    this.triggerDownload(blob, filename)
  }

  static buildFilename({ zone, variable, dateStart, dateEnd }) {
    const zonePart = zone ? `_${zone}` : ''
    const variablePart = variable ? `_${variable}` : ''
    const datePart = [dateStart, dateEnd]
      .filter(Boolean)
      .map((d) => this.toISODate(d))
      .join('_a_')
    const dateSuffix = datePart ? `_${datePart}` : ''
    return `gepoa${zonePart}${variablePart}${dateSuffix}.csv`
  }

  static triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  static toISODate(val) {
    if (!val) return null
    const d = typeof val === 'string' ? new Date(val) : val
    if (Number.isNaN(d?.getTime?.())) return null
    return d.toISOString().slice(0, 10)
  }
}
