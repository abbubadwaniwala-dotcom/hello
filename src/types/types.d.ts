export interface FormData {

    name: string,
    email: string,
    password: string
}


export interface Shop {
    id: number;
    name: string;
    lat: number;
    lng: number;
    category: string;
    subCategory: string;
    address: string;
  }
  
  export interface ShopWithDistance extends Shop {
    distance: number;   // km
  }
  
  export type SortBy = 'distance' | 'name' | 'category';
  export type SortOrder = 'asc' | 'desc';
  
  export interface Filters {
    category: string | null;
    maxDistance: number;       // km
    searchQuery: string;
    openNow: boolean;
    status: string | null;
  }
  
  export interface Coords {
    lat: number;
    lng: number;
  }