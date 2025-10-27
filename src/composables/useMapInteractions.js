export function useMapInteractions({ onZoneSelect } = {}) {
  function bindZoneInteractions({ feature, layer }) {
    const cod = feature.properties?.COD
    const nombre = feature.properties?.NOMBRE

    if (nombre || cod) {
      layer.bindTooltip(
        `<b>${nombre ?? 'Zona'}</b>${cod ? `<br>Codigo: ${cod}` : ''}`,
        {
          sticky: true,
          direction: 'top',
          opacity: 0.9,
        }
      )
    }

    layer.on('click', () => {
      if (typeof onZoneSelect === 'function') {
        onZoneSelect(cod)
      }
    })
  }

  return {
    bindZoneInteractions,
  }
}
