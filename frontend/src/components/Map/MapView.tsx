import type { FC } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

import type { Commune } from "../../types";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  communes: Commune[];
}

interface ClusterMarker {
  getAllChildMarkers(): Array<{
    options: {
      children?: React.ReactNode;
      [key: string]: unknown;
    };
  }>;
}

const couleurs: Record<string, string> = {
  "Forte tension": "#e1000f",
  "Tension modérée": "#e67e22",
  Normal: "#18753c",
  "Sous-capacité": "#0063cb",
};

// Couleur dominante du cluster selon les communes qu'il contient
const getClusterColor = (markers: ClusterMarker) => {
  const children = markers.getAllChildMarkers();
  const counts: Record<string, number> = {
    "Forte tension": 0,
    "Tension modérée": 0,
    Normal: 0,
    "Sous-capacité": 0,
  };

  children.forEach((marker: any) => {
    const niveau = marker.options.niveau;
    if (niveau) counts[niveau]++;
  });

  if (counts["Forte tension"] > 0) return "#e1000f";
  if (counts["Tension modérée"] > 0) return "#e67e22";
  if (counts["Normal"] > 0) return "#18753c";
  return "#0063cb";
};

// Icône cluster personnalisée
const createClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  const color = getClusterColor(cluster);

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
    className: "",
    iconSize: [40, 40],
  });
};

const MapView: FC<MapViewProps> = ({ communes }) => {
  return (
    <MapContainer
      center={[46.6, 2.3]}
      zoom={6}
      style={{ height: "600px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon}>
        {communes
          .filter((c) => c.latitude && c.longitude)
          .map((commune, index) => (
            <CircleMarker
              key={index}
              center={[commune.latitude!, commune.longitude!]}
              radius={6}
              fillColor={couleurs[commune.tensionLevel]}
              color={couleurs[commune.tensionLevel]}
              fillOpacity={0.7}
              weight={1}
              // @ts-ignore
              niveau={commune.tensionLevel}
            >
              <Popup>
                <strong>{commune.name}</strong>
                <br />
                Département : {commune.department}
                <br />
                Ratio : {commune.studentClassRatio.toFixed(1)} élèves/classe
                <br />
                Niveau : {commune.tensionLevel}
                <br />
                Type : {commune.communeType}
              </Popup>
            </CircleMarker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapView;
