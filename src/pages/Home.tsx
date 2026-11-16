import { useEffect } from 'react';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useShopStore } from '../store';
import { useDataStatus, useLocation, useLocationStatus } from '../store/selectors';
import Filter from '../components/Filter';

const Home = () => {

  const {loadShops, fetchUserLocation, resetFilters} = useShopStore()
  const dataStatus = useDataStatus()
  const locationStatus = useLocationStatus()
    const location = useLocation();
  

    
    useEffect(()=>{
      resetFilters()
      loadShops()
  }, [])

  
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
        <main className="w-full h-screen">
          <Navbar />
        <div className="flex gap-4 w-full h-full">
        <Sidebar />
          <Outlet />
        </div>
            
      </main>
      )
}

export default Home