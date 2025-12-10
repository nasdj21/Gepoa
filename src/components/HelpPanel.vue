<template>
  <section class="help-panel">
    <div class="help-panel__content">
      <h1>Cómo usar el geoportal</h1><br>
      <p>
        Explora las zonas disponibles usando el panel lateral. Selecciona una variable, una zona, y un rango
        de fechas para visualizar la serie temporal correspondiente.
      </p><br>

      <h3>Variables</h3>
      <ul>
        <li>SST:    Temperatura superficial del mar    [ºC]</li>
          <p>Se utiliza para evaluar el estado térmico del océano, identificar olas de calor marinas, 
            estudiar fenómenos ENSO (El Niño/La Niña) y analizar la interacción océano-atmósfera.</p>
        <li>SSTA:   Anomalía de la temperatura superficial del mar    [ºC]</li>
          <p>Mide desviaciones respecto a la climatología. Es fundamental para detección temprana de 
          eventos climáticos, monitoreo de calentamiento regional y análisis de variabilidad interanual.</p>
        <li>SO:     Salinidad    [psu]</li>
        <p>Indica la concentración de sales en el agua de mar. Es clave para evaluar procesos de mezcla, 
          balance hídrico, circulación oceánica y estabilidad de la columna de agua.</p>
        <li>ZOS:    Altura de la superficie del mar sobre el geoide    [m]</li>
        <p>Se usa para estudiar el aumento del nivel del mar, variabilidad estacional, corrientes 
          geostróficas, mareas y efectos locales de calentamiento.</p>
        <li>CURM:   Magnitud de la corriente superficial del mar    [m/s]</li>
        <p>Indica la velocidad del flujo superficial. Se emplea para modelar transporte de nutrientes, 
          dispersión de contaminantes, deriva de objetos, navegación y dinámica costera.</p>
        <li>CURD:   Dirección de la corriente superficial del mar    [º]</li>
        <p>Complementa a la magnitud; es vital para predicción de trayectorias, transporte de masas 
          de agua y análisis de circulación regional.</p>
        <li>T2M:    Temperatura a 2 metros sobre la superficie    [ºC]</li>
        <p>Variable estándar meteorológica. Permite describir condiciones atmosféricas en superficie, 
          estimar confort térmico, evaluar clima local y modelar intercambios aire-mar.</p>
        <li>WINM:   Magnitud del viento a 10 metros    [m/s]</li>
        <p>Usada para meteorología marina, modelado de oleaje, dispersión de aerosoles, 
          energía eólica y análisis de eventos extremos (tormentas, ciclones).</p>
        <li>WIND:   Dirección del viento a 10 metros    [º]</li>
        <p>Permite interpretar patrones de circulación atmosférica, evaluar forzamiento sobre las 
          corrientes oceánicas y analizar transporte atmosférico.</p>
        <li>SPR:    Presión superficial    [hPa]</li>
        <p>Indicador clave de sistemas meteorológicos: anticiclones, ciclones, frentes. 
          Útil para predicción del tiempo, análisis sinóptico y eventos extremos.</p>
        <li>PPT:    Precipitación  [mm]</li>
        <p>Fundamental para el ciclo hidrológico, recarga hídrica, detección de tormentas, 
          análisis de sequías y estudios de variabilidad climática.</p>
      </ul>
     
    </div>
  </section>
</template>
