import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Coords, Filters, Shop, ShopWithDistance, SortBy, SortOrder } from '../types/types';
import { getDistance, isValidCoord } from '../constants/functions';
import shops from '../../data/stores.json'

// ---------- State shape ----------
interface ShopState {
  // raw data
  allShops: Shop[];
  // computed
  nearbyShops: ShopWithDistance[];
  // location
  location: Coords | null;
  locationStatus: 'idle' | 'loading' | 'success' | 'error';
  locationError: string | null;
  // UI filters
  filters: Filters;
  sortBy: SortBy;
  sortOrder: SortOrder;
  // selections
  selectedShopId: number | null;
  compareIds: number[];        // compare up to 3 shops side-by-side
  favorites: number[];         // persisted across reloads
  dataStatus: 'idle' | 'loading' | 'ready' | 'error';
  dataError: string | null;

  // -------- actions --------
  loadShops: () => Promise<void>;
  fetchUserLocation: () => Promise<void>;
  setFilters: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
  setSort: (by: SortBy, order?: SortOrder) => void;
  selectShop: (id: number | null) => void;
  toggleFavorite: (id: number) => void;
  toggleCompare: (id: number) => void;
  clearCompare: () => void;

  // -------- derived helper (not reactive, just convenience) --------
  getVisibleShops: () => ShopWithDistance[];
}

// ---------- Store creation ----------
export const useShopStore = create<ShopState>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          allShops: [],
          nearbyShops: [],
          location: null,
          locationStatus: 'idle',
          locationError: null,

          filters: {
            category: null,
            maxDistance: 3,
            status: null,
            searchQuery: '',
            openNow: false,
          },
          sortBy: 'distance',
          sortOrder: 'asc',

          selectedShopId: null,
          compareIds: [],
          favorites: [],

          dataStatus: 'idle',
          dataError: null,

          // ============================================================
          // Load shops from JSON
          // ============================================================
          loadShops: async () => {
            set((s) => {
              s.dataStatus = 'loading';
              s.dataError = null;
            });


            try {
              // const res = await fetch('../../data/store.json'); // or import at build time
              // if (!res.ok) throw new Error(`HTTP ${res.status}`);
              // const json = await res.json();

              // const rawArr: any[] = Array.isArray(json) ? json : json.shops ?? [];
              const validShops: Shop[] = shops.shops
                .map((raw) => {
                  const lat = Number(raw.lat);
                  const lng = Number(raw.lng);
                  if (!isValidCoord(lat, lng)) return null;
                  return {
                    id: raw.id,
                    name: raw.name,
                    lat,
                    lng,
                    category: raw.category,
                    subCategory: raw.subCategory,
                    address: raw.address,
                  } as Shop;
                })
                .filter((s): s is Shop => s !== null);
              set((s) => {
                s.allShops = validShops;
                s.dataStatus = 'ready';
              });
            } catch (err) {
              set((s) => {
                s.dataStatus = 'error';
                s.dataError = err instanceof Error ? err.message : String(err);
              });
            }
          },

          // ============================================================
          // Fetch user location + compute distances
          // ============================================================
          fetchUserLocation: async () => {
            set((s) => {
              s.locationStatus = 'loading';
              s.locationError = null;
            });

            try {
              const pos = await new Promise<GeolocationPosition>(
                (resolve, reject) =>
                  navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                  })
              );
              const loc: Coords = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              };

              const allShops = get().allShops;

              const enriched: ShopWithDistance[] = allShops
                .map((s) => ({
                  ...s,
                  distance: getDistance(loc.lat, loc.lng, s.lat, s.lng),
                })).filter((s)=>(
                  s.distance <= get().filters.maxDistance
                )
                )


              set((s) => {
                s.location = loc;
                s.locationStatus = 'success';
                s.nearbyShops = enriched;
              });
            } catch (err) {
              set((s) => {
                s.locationStatus = 'error';
                s.locationError =
                  err instanceof GeolocationPositionError
                    ? err.message
                    : 'Location failed';
              });
            }
          },

          // ============================================================
          // Filters
          // ============================================================
          setFilters: (patch) =>
            set((s) => {
              Object.assign(s.filters, patch);
            }),

          resetFilters: () =>
            set((s) => {
              s.filters = {
                category: null,
                maxDistance: 3,
                searchQuery: '',
                openNow: false,
              };
              s.sortBy = 'distance';
              s.sortOrder = 'asc';
            }),

          // ============================================================
          // Sorting
          // ============================================================
          setSort: (by, order = 'asc') =>
            set((s) => {
              s.sortBy = by;
              s.sortOrder = order;
            }),

          // ============================================================
          // Selection
          // ============================================================
          selectShop: (id) =>
            set((s) => {
              s.selectedShopId = id;
            }),

          toggleFavorite: (id) =>
            set((s) => {
              const idx = s.favorites.indexOf(id);
              if (idx >= 0) s.favorites.splice(idx, 1);
              else s.favorites.push(id);
            }),

          toggleCompare: (id) =>
            set((s) => {
              const idx = s.compareIds.indexOf(id);
              if (idx >= 0) {
                s.compareIds.splice(idx, 1);
              } else {
                if (s.compareIds.length >= 3) s.compareIds.shift();
                s.compareIds.push(id);
              }
            }),

          clearCompare: () =>
            set((s) => {
              s.compareIds = [];
            }),

          // ============================================================
          // Derived: filtered + sorted shop list
          // ============================================================
          getVisibleShops: () => {
            const { nearbyShops, filters, sortBy, sortOrder } = get();
            let list = nearbyShops;

            // filter: category
            if (filters.category) {
              list = list.filter((s) => s.category === filters.category);
            }

            // filter: distance
            list = list.filter((s) => s.distance <= filters.maxDistance);
            // filter: search query
            

            // sort
            const dir = sortOrder === 'asc' ? 1 : -1;
            const sorted = [...list].sort((a, b) => {
              if (sortBy === 'distance') return (a.distance - b.distance) * dir;
              if (sortBy === 'name') return a.name.localeCompare(b.name) * dir;
              return a.category.localeCompare(b.category) * dir;
            });

            return sorted;
          },
        }))
      ),
      {
        name: 'shop-finder',
        // Only persist user preferences, NOT fetched data
        partialize: (state) => ({
          favorites: state.favorites,
          filters: state.filters,
          sortBy: state.sortBy,
          sortOrder: state.sortOrder,
        }),
      }
    ),
    { name: 'ShopStore' }
  )
);