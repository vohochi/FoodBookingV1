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
import ActionButtons from '@/_components/ActionButtons';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchDishesWithPagination,
  removeDish,
} from '@/store/slice/menusSlice';
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

// Styled component for the product card
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

  React.useEffect(() => {
    dispatch(
      fetchDishesWithPagination({
        page: currentPage,
        limit: rowsPerPage,
      })
    );

    // Set a timeout to ensure the spinner shows for at least 3 seconds
    const timer = setTimeout(() => {
      setShowSpinnerForMin(false);
    }, 2000); // 3 seconds timeout

    // Cleanup the timeout if component unmounts
    return () => clearTimeout(timer);
  }, [currentPage, rowsPerPage, dispatch]);

  const handleEdit = (row: Menu) => {
    setSelectedRow(row);
    setFormType('edit');
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedRow(null);
    setFormType('add');
    setOpenModal(true);
  };

  const handleDelete = (menu_id: string) => {
    if (!menu_id) {
      console.error('Menu ID is missing');
      return;
    }
    dispatch(removeDish(menu_id));
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
  };

  const handleChangePage = (newPage: number) => {
    dispatch(fetchDishesWithPagination({ page: newPage, limit: rowsPerPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    dispatch(fetchDishesWithPagination({ page: 1, limit: newRowsPerPage }));
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
          <SideBarManagerCategory />
          <Box flexGrow={1} p={3}>
            {isLoading || showSpinnerForMin ? (
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
                  {menus.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <ProductCard>
                        <Box>
                          {product.img && typeof product.img === 'string' && (
                            <Image
                              onClick={() => handleProductClick(product)}
                              src={`https://foodbookingapi.onrender.com/images/${product.img}`}
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
                              {` ${formatPrice(
                                Math.min(...product.variant.map((v) => v.price))
                              )}`}
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

                          {/* Optional: Show available variants */}
                          {product.variant && product.variant.length > 0 && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {/* {product.variant.map((v) => v.size).join(', ')} */}
                            </Typography>
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
                count={totalPages} // Use the total pages from Redux state
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
