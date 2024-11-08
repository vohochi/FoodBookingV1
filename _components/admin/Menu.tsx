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
  selectmenus,
  selectmenusLoading,
} from '@/store/selector/menusSelector';
import {
  fetchDishesWithPagination,
  removeDish,
} from '@/store/slice/menusSlice';
import { AppDispatch } from '../../store/index';
import MenuDetailModal from '@/_components/modalForm/MenuItemForm';
import { formatPrice } from '@/utils/priceVN';
import SideBarManagerCategory from '@/_components/SideBarManger';

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
  const menus = useSelector(selectmenus);
  const isLoading = useSelector(selectmenusLoading);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Menu | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<Menu | null>(
    null
  );

  React.useEffect(() => {
    dispatch(
      fetchDishesWithPagination({
        page: currentPage,
        limit: rowsPerPage,
      })
    );
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
    dispatch(removeDish(menu_id) as any);
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

  const handleSubmit = async (newMenu: Menu): Promise<void> => {
    if (formType === 'add') {
      // Dispatch add action here
    } else {
      // Dispatch update action here
    }
    handleCloseModal();
  };

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
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
            {isLoading ? (
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
                {menus.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ProductCard>
                      <Box>
                        <Image
                          onClick={() => handleProductClick(product)}
                          src={product.img}
                          alt={product.name}
                          width={150}
                          height={200}
                          style={{
                            objectFit: 'cover',
                            marginBottom: '16px',
                          }}
                        />
                        <Typography variant="h6" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(product.price)}
                        </Typography>
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
                          onDelete={() => handleDelete(product._id)}
                          edit
                          delete
                        />
                      </Box>
                    </ProductCard>
                  </Grid>
                ))}
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
                count={100} // Adjust the total count as needed
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
