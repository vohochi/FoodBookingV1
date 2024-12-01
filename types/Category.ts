export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: Date | string;
  updateAt?: Date | string;
  data: object;
  totalMenuItems: number;
  img: string | File;
  imgUrl?: string;
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
