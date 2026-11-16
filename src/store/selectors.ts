import { useShopStore } from './';
import {useShallow} from 'zustand/react/shallow'

// Everything below is a HOOK; each component subscribes only to what it needs.

export const useAllShops = () => useShopStore((s) => s.allShops);
export const useNearbyShops = () => useShopStore((s) => s.nearbyShops);
export const useLocation = () => useShopStore((s) => s.location);
export const useDataStatus = () => useShopStore((s) => s.dataStatus);
export const useLocationStatus = () => useShopStore((s) => s.locationStatus);

export const useFilters = () => useShopStore((s) => s.filters);

export const useSort = () =>
  useShopStore(useShallow((s) => ({ by: s.sortBy, order: s.sortOrder })));

// ✅ Computed selector — only re-renders when the RESULT changes
export const useVisibleShops = () =>
  useShopStore(
    useShallow((s)=>{

    let list = s.nearbyShops

    console.log(list)
    if (s.filters.category) {
      console.log("working")
      list = list.filter((x) => x.subCategory?.toLowerCase() == s.filters.category?.toLowerCase());
    }

    

    list = list.filter((x) => x.distance <= s.filters.maxDistance);
    
    
    const dir = s.sortOrder === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => {
      if (s.sortBy === 'distance') return (a.distance - b.distance) * dir;
      if (s.sortBy === 'name') return a.name.localeCompare(b.name) * dir;
      return a.category.localeCompare(b.category) * dir;
    })
    
  })
);

// ✅ Derived: only the selected shop object
export const useSelectedShop = () =>
  useShopStore(useShallow((s) =>
    s.selectedShopId == null
      ? null
      : s.nearbyShops.find((x) => x.id === s.selectedShopId) ?? null
  ));

// ✅ Derived: shops being compared
export const useCompareShops = () =>
  useShopStore(useShallow((s) =>
    s.compareIds
      .map((id) => s.nearbyShops.find((x) => x.id === id))
      .filter((x): x is NonNullable<typeof x> => x != null)
  ))

// ✅ Derived: unique categories from nearby shops
export const useCategories = () =>
  useShopStore(useShallow((s) =>
    Array.from(new Set(s.nearbyShops.map((x) => x.category))).sort()
  ));

// ✅ Derived: favorite shops
export const useFavoriteShops = () =>
  useShopStore(useShallow((s) =>
    s.nearbyShops.filter((x) => s.favorites.includes(x.id))
  ))