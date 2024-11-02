'use client';

import * as React from 'react';

import { Paper, Box, Grid, Typography, Rating } from '@mui/material';
import PageContainer from '@/_components/container/PageContainer';
import DashboardCard from '@/_components/shared/DashboardCard';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import SideBarManger from '@/_components/SideBarManger';
import PaginationControlled from '@/_components/Pagination';
import MenuForm from '@/_components/modalForm/MenuForm'; // Import MenuForm
import { Menu } from '@/types/Menu'; // Import Menu interface
import ActionButtons from '@/_components/ActionButtons'; // Import ActionButtons
import { useMemo, useState, useEffect } from 'react';
import { getDishesWithPagi } from '@/_lib/menus'; // Import getDishesWithPagi
import { formatPrice } from '@/utils/priceVN';
import MenuDetailModal from '@/_components/modalForm/MenuItemForm';

// Styled component for the product card
const ProductCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Menus = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9); // Set rowsPerPage to 9
  const products = useMemo(() => menu, [menu]);
  const [rows, setRows] = React.useState<Menu[]>(products);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Menu | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<Menu | null>(
    null
  );

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await getDishesWithPagi(currentPage, rowsPerPage);
      setMenu(response);
      console.log(response);
    };
    fetchDishes();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    setRows(menu); // Update rows with the latest menu data
  }, [menu]);

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

  const handleDelete = (menu_id: number) => {
    setRows(rows.filter((row) => row.menu_id !== menu_id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };
  const handleProductClick = (product: Menu) => {
    setSelectedMenuItem(product);
    setOpenDetailModal(true);
  };

  // Thêm hàm đóng modal chi tiết
  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedMenuItem(null);
  };

  const handleSubmit = async (newMenu: Menu): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (formType === 'add') {
        // Generate a new _id for the new menu
        const newId =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        setRows([...rows, { ...newMenu, _id: newId }]);
      } else {
        setRows(
          rows.map((row) => (row.menu_id === newMenu.menu_id ? newMenu : row))
        );
      }
      handleCloseModal();
      resolve();
    });
  };

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  return (
    <PageContainer title="Món ăn" description="Đây là món ăn">
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
          <SideBarManger />
          {/* Main content */}
          <Box flexGrow={1} p={3}>
            <Grid container spacing={2}>
              {rows.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ProductCard
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition for hover effect
                      '&:hover': {
                        transform: 'scale(1.05)', // Scale the card slightly on hover
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                      },
                    }}
                    elevation={3}
                    onClick={() => handleProductClick(product)}
                  >
                    <Box>
                      <Image
                        src={`http://localhost:3002/images/${product.image}`}
                        alt={product.name}
                        width={150}
                        height={200}
                        style={{ objectFit: 'cover', marginBottom: '16px' }}
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
                        justifyContent: 'center', // Align buttons to center
                        marginTop: '16px',
                      }}
                    >
                      <ActionButtons // Replace Buy Now with ActionButtons
                        onEdit={() => handleEdit(product)}
                        onDelete={() => handleDelete(product.menu_id)}
                        edit
                        delete
                      />
                    </Box>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '24px',
              }}
            >
              <PaginationControlled
                count={100} // Adjust the total number of pages/items
                page={currentPage}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Box>{' '}
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
