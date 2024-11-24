export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
  data: object;
  totalMenuItems: number;
  img: string;
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

