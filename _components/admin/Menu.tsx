'use client';
import * as React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Rating,
  CircularProgress,
} from '@mui/material';
import PageContainer from '@/_components/container/PageContainer';
import DashboardCard from '@/_components/shared/DashboardCard';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import PaginationControlled from '@/_components/Pagination';
import MenuForm from '@/_components/modalForm/MenuForm';
import { Menu } from '@/types/Menu';
import { Category } from '@/types/Category';
import ActionButtons from '@/_components/ActionButtons';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchDishesWithPagination,
  removeDish,
  setSelectedCategoryMenu,
  setSortOrder,
} from '@/store/slice/menusSlice';
import { setSelectedCategories } from '@/store/slice/categorySlice';
import { AppDispatch } from '@/store/index';
import MenuDetailModal from '@/_components/modalForm/MenuItemForm';
import { formatPrice } from '@/utils/priceVN';
import SideBarManagerCategory from '@/_components/SideBarManger';
import {
  selectMenus,
  selectMenusLoading,
  selectCurrentPage,
  selectTotalPages,
  selectItemsPerPage,
} from '@/store/selector/menusSelector';
import Spinner from '@/_components/Spinner';
import toast from 'react-hot-toast';

const ProductCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  },
}));

const Menus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menus = useSelector(selectMenus);
  const isLoading = useSelector(selectMenusLoading);
  const currentPage = useSelector(selectCurrentPage);
  const rowsPerPage = useSelector(selectItemsPerPage);
  const totalPages = useSelector(selectTotalPages);

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Menu | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<Menu | null>(
    null
  );
  const [showSpinnerForMin, setShowSpinnerForMin] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const fetchData = React.useCallback(() => {
    setIsRefreshing(true);
    dispatch(
      fetchDishesWithPagination({
        page: currentPage,
        limit: rowsPerPage,
        filters: selectedCategory ? { category_id: selectedCategory._id } : {},
      })
    ).finally(() => {
      setIsRefreshing(false);
    });
  }, [currentPage, rowsPerPage, selectedCategory, dispatch]);

  React.useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setShowSpinnerForMin(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const handleEdit = async (row: Menu) => {
    setSelectedRow(row);
    setFormType('edit');
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedRow(null);
    setFormType('add');
    setOpenModal(true);
  };

  const handleDelete = async (menu_id: string) => {
    if (!menu_id) {
      console.error('Menu ID is missing');
      return;
    }
    try {
      await dispatch(removeDish(menu_id)).unwrap();
      fetchData();
      toast.success(`Xóa món thành công`);
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleProductClick = (product: Menu) => {
    setSelectedMenuItem(product);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedMenuItem(null);
  };

  const handleSubmit = async (): Promise<void> => {
    handleCloseModal();
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  const handleChangePage = (newPage: number) => {
    dispatch(
      fetchDishesWithPagination({
        page: newPage,
        limit: rowsPerPage,
        filters: selectedCategory ? { category_id: selectedCategory._id } : {},
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    dispatch(
      fetchDishesWithPagination({
        page: 1,
        limit: newRowsPerPage,
        filters: selectedCategory ? { category_id: selectedCategory._id } : {},
      })
    );
  };

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
    dispatch(setSelectedCategoryMenu(category ? category._id : undefined));
    dispatch(setSelectedCategories(category));
    dispatch(
      fetchDishesWithPagination({
        page: 1,
        limit: rowsPerPage,
        filters: category ? { category_id: category._id } : {},
      })
    );
  };

  const handleSortChange = (sort: string) => {
    const sortOrder =
      sort === 'Giá: Cao đến thấp'
        ? 'price_desc'
        : sort === 'Giá: Thấp đến cao'
        ? 'price_asc'
        : 'price_asc';

    dispatch(setSortOrder(sortOrder));
    dispatch(
      fetchDishesWithPagination({
        page: 1,
        limit: rowsPerPage,
        filters: {
          ...(selectedCategory ? { category_id: selectedCategory._id } : {}),
          sort: sortOrder,
        },
      })
    );
  };

  return (
    <PageContainer title="Món ăn" description="Danh sách các món ăn">
      <DashboardCard
        title="Món ăn"
        action={<ActionButtons onAdd={handleAdd} add />}
        menuModal={
          <MenuForm
            open={openModal}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            initialData={selectedRow}
            formType={formType}
          />
        }
      >
        <Box display="flex">
          <SideBarManagerCategory
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />
          <Box flexGrow={1} p={3}>
            {isLoading || showSpinnerForMin || isRefreshing ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                <React.Suspense fallback={<Spinner />}>
                  {menus.map((product: Menu, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id || index}>
                      <ProductCard>
                        <Box>
                          {product.img && typeof product.img === 'string' && (
                            <Image
                              priority
                              onClick={() => handleProductClick(product)}
                              src={`${product.img}`}
                              alt={product.name}
                              width={150}
                              height={200}
                              style={{
                                objectFit: 'cover',
                                marginBottom: '16px',
                              }}
                            />
                          )}
                          <Typography variant="h6" gutterBottom>
                            {product.name}
                          </Typography>
                          {product.variant && product.variant.length > 0 ? (
                            <Typography variant="body2" color="text.secondary">
                              {formatPrice(
                                Math.min(...product.variant.map((v) => v.price))
                              )}
                            </Typography>
                          ) : (
                            product.price && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {formatPrice(product.price)}
                              </Typography>
                            )
                          )}
                          <Rating value={3} readOnly />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '16px',
                          }}
                        >
                          <ActionButtons
                            onEdit={() => handleEdit(product)}
                            onDelete={() => handleDelete(product._id!)}
                            edit
                            delete
                          />
                        </Box>
                      </ProductCard>
                    </Grid>
                  ))}
                </React.Suspense>
              </Grid>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '24px',
              }}
            >
              <PaginationControlled
                count={totalPages}
                page={currentPage}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </Box>
      </DashboardCard>
      <MenuDetailModal
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        menu={selectedMenuItem}
      />
    </PageContainer>
  );
};

export default Menus;
