import type { FC } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import type { Commune } from '../../types'
import 'leaflet/dist/leaflet.css'

interface MapViewProps {
  communes: Commune[]
}

const couleurs: Record<string, string> = {
  'Forte tension': '#e1000f',
  'Tension modérée': '#e67e22',
  'Normal': '#18753c',
  'Sous-capacité': '#0063cb'
}

// Couleur dominante du cluster selon les communes qu'il contient
const getClusterColor = (markers: any) => {
  const children = markers.getAllChildMarkers()
  const counts: Record<string, number> = {
    'Forte tension': 0,
    'Tension modérée': 0,
    'Normal': 0,
    'Sous-capacité': 0
  }

  children.forEach((marker: any) => {
    const niveau = marker.options.niveau
    if (niveau) counts[niveau]++
  })

  if (counts['Forte tension'] > 0) return '#e1000f'
  if (counts['Tension modérée'] > 0) return '#e67e22'
  if (counts['Normal'] > 0) return '#18753c'
  return '#0063cb'
}

// Icône cluster personnalisée
const createClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount()
  const color = getClusterColor(cluster)

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 13px;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        ${count}
      </div>
    `,
    className: '',
    iconSize: [40, 40]
  })
}

const MapView: FC<MapViewProps> = ({ communes }) => {
  return (
    <MapContainer
      center={[46.6, 2.3]}
      zoom={6}
      style={{ height: '600px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterIcon}
      >
        {communes
          .filter(c => c.latitude && c.longitude)
          .map((commune, index) => (
            <CircleMarker
              key={index}
              center={[commune.latitude!, commune.longitude!]}
              radius={6}
              fillColor={couleurs[commune.niveau_tension]}
              color={couleurs[commune.niveau_tension]}
              fillOpacity={0.7}
              weight={1}
              // @ts-ignore
              niveau={commune.niveau_tension}
            >
              <Popup>
                <strong>{commune.Commune}</strong><br />
                Département : {commune.Département}<br />
                Ratio : {commune.ratio_eleves_par_classe.toFixed(1)} élèves/classe<br />
                Niveau : {commune.niveau_tension}<br />
                Type : {commune.type_commune}
              </Popup>
            </CircleMarker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapView