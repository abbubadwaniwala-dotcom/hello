import { useEffect } from 'react';

import {
  useCategories,
  useDataStatus,
  useFilters,
  useLocation,
  useLocationStatus,
  useSelectedShop,
  useVisibleShops,
} from '../store/selectors';
import { useShopStore } from '../store';



export default function App() {
  // ---- actions (stable reference, no re-render) ----
  const {loadShops, allShops, nearbyShops, resetFilters} = useShopStore()
  const fetchUserLocation = useShopStore((s) => s.fetchUserLocation);
  const setFilters = useShopStore((s) => s.setFilters);
  const selectShop = useShopStore((s) => s.selectShop);
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);
  const favorites = useShopStore((s) => s.favorites);

  // ---- state ----
  const dataStatus = useDataStatus();
  const locationStatus = useLocationStatus();
  const location = useLocation();
  const filters = useFilters();
  const categories = useCategories();
  const shops = useVisibleShops();
  const selected = useSelectedShop();

  // ---- bootstrap ----
  useEffect(() => {
    resetFilters()
    loadShops();
  }, []);



  useEffect(() => {
    if (dataStatus === 'ready') fetchUserLocation();
  }, [dataStatus, fetchUserLocation]);

  // ---- render ----
  if (dataStatus === 'loading') return <div>Loading shops…</div>;
  if (dataStatus === 'error') return <div>Failed to load shops</div>;
  if (locationStatus === 'loading') return <div>Finding your location…</div>;
  if (locationStatus === 'error') return <div>Please enable location</div>;
  if (!location) return <div>Waiting for location…</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Filter bar */}
      

      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: 340, overflowY: 'auto', background: '#f9fafb' }}>
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => selectShop(shop.id)}
              style={{
                padding: 12,
                borderBottom: '1px solid #eee',
                background: selected?.id === shop.id ? '#e0f2fe' : '#fff',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{shop.name}</strong>
                <span>{shop.distance.toFixed(2)} km</span>
              </div>
              <div style={{ fontSize: 12, color: '#666' }}>{shop.category}</div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}



//   return (
//     <main className="w-full h-screen">
//       <Navbar />
//     <div className="flex gap-4 w-full h-full">
//     <Sidebar />
//       <Outlet />
//     </div>
        
//   </main>
//   );
// }