import { create } from 'zustand';
import { ProductCategory, SortOption } from '@/features/products/types';

export interface ShopFiltersState {
  searchQuery: string;
  selectedCategory: ProductCategory | 'all';
  selectedSort: SortOption;
  selectedPriceRange: [number, number];
  selectedRating: number | null;
  selectedColors: string[];
  selectedTags: string[];
  viewMode: 'grid' | 'list';
  currentPage: number;
  itemsPerPage: number;
  isFilterDrawerOpen: boolean;
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory | 'all') => void;
  setSelectedSort: (sort: SortOption) => void;
  setSelectedPriceRange: (range: [number, number]) => void;
  setSelectedRating: (rating: number | null) => void;
  setSelectedColors: (colors: string[]) => void;
  setSelectedTags: (tags: string[]) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setCurrentPage: (page: number) => void;
  setFilterDrawerOpen: (open: boolean) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

const initialState: Omit<ShopFiltersState, 'setSearchQuery' | 'setSelectedCategory' | 'setSelectedSort' | 'setSelectedPriceRange' | 'setSelectedRating' | 'setSelectedColors' | 'setSelectedTags' | 'setViewMode' | 'setCurrentPage' | 'setFilterDrawerOpen' | 'resetFilters' | 'hasActiveFilters'> = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedSort: 'featured',
  selectedPriceRange: [0, 500],
  selectedRating: null,
  selectedColors: [],
  selectedTags: [],
  viewMode: 'grid',
  currentPage: 1,
  itemsPerPage: 12,
  isFilterDrawerOpen: false,
};

export const useShopFilters = create<ShopFiltersState>((set, get) => ({
  ...initialState,
  
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category, currentPage: 1 }),
  
  setSelectedSort: (sort) => set({ selectedSort: sort }),
  
  setSelectedPriceRange: (range) => set({ selectedPriceRange: range, currentPage: 1 }),
  
  setSelectedRating: (rating) => set({ selectedRating: rating, currentPage: 1 }),
  
  setSelectedColors: (colors) => set({ selectedColors: colors, currentPage: 1 }),
  
  setSelectedTags: (tags) => set({ selectedTags: tags, currentPage: 1 }),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setFilterDrawerOpen: (open) => set({ isFilterDrawerOpen: open }),
  
  resetFilters: () => set(() => ({
    ...initialState,
    viewMode: get().viewMode,
    itemsPerPage: get().itemsPerPage,
  })),
  
  hasActiveFilters: () => {
    const state = get();
    return (
      state.searchQuery !== '' ||
      state.selectedCategory !== 'all' ||
      state.selectedPriceRange[0] !== 0 ||
      state.selectedPriceRange[1] !== 500 ||
      state.selectedRating !== null ||
      state.selectedColors.length > 0 ||
      state.selectedTags.length > 0
    );
  },
}));
