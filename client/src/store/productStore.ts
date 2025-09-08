// src/store/productStore.ts
import { create } from 'zustand';
import { productService } from '../services/productService';
import type {
  Product,
  PaginatedProducts,
  ProductFilters,
} from '../shared/types/product';

interface ProductState {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  loading: boolean;
  error: string | null;
  filters: ProductFilters;

  // Actions
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
  clearFilters: () => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  },
  loading: false,
  error: null,
  filters: {},

  fetchProducts: async (filters = {}) => {
    set({ loading: true, error: null });

    try {
      const response: PaginatedProducts =
        await productService.getProducts(filters);
      set({
        products: response.data,
        pagination: {
          currentPage: response.meta.currentPage,
          totalPages: response.meta.totalPages,
          totalItems: response.meta.totalItems,
          itemsPerPage: response.meta.itemsPerPage,
        },
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao carregar produtos',
        loading: false,
      });
    }
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  nextPage: () => {
    const { pagination, filters, fetchProducts } = get();
    if (pagination.currentPage < pagination.totalPages) {
      const newFilters = { ...filters, page: pagination.currentPage + 1 };
      set({ filters: newFilters });
      fetchProducts(newFilters);
    }
  },

  prevPage: () => {
    const { pagination, filters, fetchProducts } = get();
    if (pagination.currentPage > 1) {
      const newFilters = { ...filters, page: pagination.currentPage - 1 };
      set({ filters: newFilters });
      fetchProducts(newFilters);
    }
  },
}));
