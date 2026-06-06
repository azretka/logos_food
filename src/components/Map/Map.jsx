import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

delete L.Icon.Default.prototype._getIconUrl;

const pinIcon = L.divIcon({
  html: '<img src="/images/wearehere.png" style="width:80px;height:80px;display:block;" />',
  iconSize: [80, 80],
  iconAnchor: [40, 40],
  className: '',
});

const LOCATION = [55.8250, 37.3500];
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
// Mobile: contacts block covers top ~484px of the 700px map.
// Shift center 0.005° north so pin renders at ~557px from top (close below contacts).
const MOBILE_CENTER = [55.830, 37.3500];
const DESKTOP_CENTER = [55.8243, 37.3369];
const MAP_CENTER = isMobile ? MOBILE_CENTER : DESKTOP_CENTER;

export default function Map({ className = '', pinCentered = false }) {
  const center = pinCentered ? LOCATION : MAP_CENTER;
  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
      className={`map-container ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={LOCATION} icon={pinIcon} />
    </MapContainer>
  );
}
