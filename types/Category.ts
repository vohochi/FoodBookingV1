export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: Date | string;
  updateAt?: Date | string;
  img: string | File;
}

export interface CategoriesResponse {
  success: boolean;
  data: {
    categories: Category[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface CreateCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}
