import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet'

import {
  useLocation,
  useVisibleShops,
} from '../store/selectors';
import { useShopStore } from '../store';

const shopIcon = new L.DivIcon({
  className: 'shop-marker',
  html: `<div style="background:#e11d48;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const userIcon = new L.DivIcon({
  className: 'user-marker',
  html: `<div style="background:#2563eb;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 6px rgba(37,99,235,0.25);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function Map() {
  // ---- actions (stable reference, no re-render) ----
  const {selectShop, filters} = useShopStore();

  // ---- state ----
  const location = useLocation();
  const shops = useVisibleShops();

  // ---- bootstrap ----

  console.log(shops, filters)

  return (
    
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lng]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <Circle center={[location.lat, location.lng]} radius={500}
              pathOptions={{ color: '#2563eb', fillOpacity: 0.1 }} />
            {shops.map((shop) => (
              <Marker
                key={shop.id}
                position={[shop.lat, shop.lng]}
                icon={shopIcon}
                eventHandlers={{ click: () => selectShop(shop.id) }}
              >
                <Popup>
                  <b>{shop.name}</b><br />
                  {shop.category}<br />
                  {shop.distance.toFixed(2)} km
                </Popup>
              </Marker>
            ))}
          </MapContainer>
 
  );

}



