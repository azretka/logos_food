import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const pinIcon = L.icon({
  iconUrl: '/images/wearehere.png',
  iconSize: [80, 80],
  iconAnchor: [40, 80],
  popupAnchor: [0, -80],
});

const LOCATION = [55.8243, 37.3395];
const MAP_CENTER = [55.8252, 37.3242]; // сдвиг центра влево — пин появляется правее

export default function Map({ className = '' }) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
      className={`map-container ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={LOCATION} icon={pinIcon}>
        <Popup>Мы здесь</Popup>
      </Marker>
    </MapContainer>
  );
}
