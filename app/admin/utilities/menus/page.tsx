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

// Sample product data (replace with your actual data)
const products: Menu[] = [
  {
    menu_id: 1,
    category_id: 1,
    name: 'The Psychology of Money',
    description: 'A book about financial psychology',
    price: 125,
    image_url: '/path/to/image1.jpg', // Replace with actual image path
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    menu_id: 2,
    category_id: 2,
    name: 'Red Velvet Dress',
    description: 'A beautiful red velvet dress',
    price: 150,
    image_url: '/path/to/image2.jpg', // Replace with actual image path
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    menu_id: 3,
    category_id: 3,
    name: 'Short & Sweet Purse',
    description: 'A small and stylish purse',
    price: 175,
    image_url: '/path/to/image3.jpg', // Replace with actual image path
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    menu_id: 4,
    category_id: 3,
    name: 'Short & Sweet Purse',
    description: 'A small and stylish purse',
    price: 175,
    image_url: '/path/to/image3.jpg', // Replace with actual image path
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    menu_id: 5,
    category_id: 3,
    name: 'Short & Sweet Purse',
    description: 'A small and stylish purse',
    price: 175,
    image_url: '/path/to/image3.jpg', // Replace with actual image path
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    menu_id: 6,
    category_id: 3,
    name: 'Short & Sweet Purse',
    description: 'A small and stylish purse',
    price: 175,
    image_url: '/path/to/image3.jpg', // Replace with actual image path
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// Styled component for the product card
const ProductCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Shadow = () => {
  const [rows, setRows] = React.useState<Menu[]>(products);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Menu | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

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

  const handleSubmit = (newMenu: Menu) => {
    if (formType === 'add') {
      const newId =
        rows.length > 0 ? Math.max(...rows.map((row) => row.menu_id)) + 1 : 1;
      setRows([...rows, { ...newMenu, menu_id: newId }]);
    } else {
      setRows(
        rows.map((row) => (row.menu_id === newMenu.menu_id ? newMenu : row))
      );
    }
    handleCloseModal();
  };

  return (
    <PageContainer title="Shadow" description="this is Shadow">
      <DashboardCard
        title="Shadow"
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
                  <ProductCard elevation={3}>
                    <Box>
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={150}
                        height={200}
                        style={{ objectFit: 'cover', marginBottom: '16px' }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price}
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
              <PaginationControlled />
            </Box>{' '}
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
