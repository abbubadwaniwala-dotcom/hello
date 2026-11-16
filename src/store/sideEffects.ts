// src/store/sideEffects.ts
import { useShopStore } from './';

// Log every time the user changes the sort
useShopStore.subscribe(
  (s) => s.sortBy,
  (sortBy, prev) => console.log(`Sort changed: ${prev} → ${sortBy}`)
);

// Auto-fetch location as soon as data loads
useShopStore.subscribe(
  (s) => s.dataStatus,
  (status) => {
    if (status === 'ready') useShopStore.getState().fetchUserLocation();
  }
);

// Auto-recompute nearby shops when location changes
useShopStore.subscribe(
  (s) => s.location,
  (loc) => {
    if (loc) console.log('Location updated → recompute distances');
  }
);