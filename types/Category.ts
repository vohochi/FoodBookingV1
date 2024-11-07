export interface Category {
  _id?: string;
  name: string;
  description: string;
  img: string | File;
  createdAt?: string;
  updateAt?: string;
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
