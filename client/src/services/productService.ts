import api from '../shared/api/api';
import type {
  Product,
  PaginatedProducts,
  ProductFilters,
} from '../shared/types/product.ts';
export const productService = {
  // Listar produtos com paginação
  getProducts: async (filters?: ProductFilters): Promise<PaginatedProducts> => {
    const params = new URLSearchParams();

    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const response = await api.get(`/produto?${params}`);
    return response.data;
  },

  // Buscar produto por ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/produto/${id}`);
    return response.data;
  },

  // Criar produto (admin)
  createProduct: async (productData: any): Promise<Product> => {
    const response = await api.post('/produto', productData);
    return response.data;
  },

  // Atualizar produto (admin)
  updateProduct: async (id: number, productData: any): Promise<Product> => {
    const response = await api.patch(`/produto/${id}`, productData);
    return response.data;
  },

  // Deletar produto (admin)
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/produto/${id}`);
  },
};
