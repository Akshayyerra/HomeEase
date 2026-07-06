"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function TrackingMap({
  customerLat,
  customerLng,
  workerLat,
  workerLng,
}: {
  customerLat: number;
  customerLng: number;
  workerLat: number;
  workerLng: number;
}) {
  const center = [
    customerLat,
    customerLng,
  ] as [number, number];

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{
        height: "500px",
        width: "100%",
      }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          customerLat,
          customerLng,
        ]}
      >
        <Popup>
          📍 Customer Location
        </Popup>
      </Marker>

      <Marker
        position={[
          workerLat,
          workerLng,
        ]}
      >
        <Popup>
          🚗 Worker Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}