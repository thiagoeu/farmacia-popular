export interface Product {
  id: number;
  name: string;
  batch: string;
  price: number;
  stock: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedProducts {
  data: Product[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, 'ASC' | 'DESC'][];
    search?: string;
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}
