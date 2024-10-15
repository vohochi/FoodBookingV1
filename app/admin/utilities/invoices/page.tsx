'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Invoice } from '@/types/Invoices'; // Import Invoice interface
import SearchBar from '@/_components/Search';
import InvoiceGrid from '@/_components/TopInvoices'; // Assuming you have a component for top invoices
import InvoicesForm from '@/_components/modalForm/InvoiceForm'; // Import InvoicesForm
import ActionButtons from '@/_components/ActionButtons';

const initialRows: Invoice[] = [
  {
    invoice_id: 1,
    order_id: 1,
    payment_method: 'cash',
    payment_status: 'pending',
    due_date: new Date('2024-01-15'),
    created_at: new Date('2024-01-01'),
  },
  {
    invoice_id: 2,
    order_id: 2,
    payment_method: 'card',
    payment_status: 'completed',
    due_date: new Date('2024-01-20'),
    created_at: new Date('2024-01-03'),
  },
  // Add more sample data here...
];

export default function DataTable() {
  const [rows, setRows] = React.useState<Invoice[]>(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Invoice | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

  const handleEdit = (row: Invoice) => {
    setSelectedRow(row);
    setFormType('edit');
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedRow(null);
    setFormType('add');
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter((row) => row.invoice_id !== id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSubmit = (newInvoice: Invoice) => {
    if (formType === 'add') {
      const newId =
        rows.length > 0
          ? Math.max(...rows.map((row) => row.invoice_id)) + 1
          : 1;
      setRows([...rows, { ...newInvoice, invoice_id: newId }]);
    } else {
      setRows(
        rows.map((row) =>
          row.invoice_id === newInvoice.invoice_id ? newInvoice : row
        )
      );
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'invoice_id',
      headerName: 'Mã Hóa Đơn',
      width: 150,
    },
    {
      field: 'order_id',
      headerName: 'Mã Đơn Hàng',
      width: 150,
    },
    {
      field: 'payment_method',
      headerName: 'Phương thức thanh toán',
      width: 150,
    },
    {
      field: 'payment_status',
      headerName: 'Trạng thái thanh toán',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['pending', 'completed', 'failed'], // Update valueOptions for Invoice status
      renderCell: (params) => (
        <select
          value={params.value}
          onChange={(event) =>
            handleUpdateStatus(
              params.row.invoice_id,
              event.target.value as string
            )
          }
          style={{
            backgroundColor: '#f0f0f0', // Light gray background
            border: '1px solid #ddd', // Light gray border
            borderRadius: '8px', // More rounded corners
            padding: '10px 16px', // More padding
            fontSize: '16px', // Larger font size
            appearance: 'none', // Remove default browser styles
            cursor: 'pointer', // Add cursor pointer
          }}
        >
          <option value="pending">Chờ xử lý</option>
          <option value="completed">Hoàn thành</option>
          <option value="failed">Thất bại</option>
        </select>
      ),
    },
    {
      field: 'due_date',
      headerName: 'Ngày đến hạn',
      width: 150,
      type: 'date',
    },
    {
      field: 'created_at',
      headerName: 'Ngày Tạo',
      width: 150,
      type: 'date',
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <ActionButtons
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row.invoice_id)}
          edit
          delete
        />
      ),
    },
  ];

  return (
    <>
      <InvoiceGrid /> {/* Use InvoiceGrid component */}
      <Paper sx={{ height: 400, width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add /> {/* Add the button */}
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.invoice_id}
        />
        <InvoicesForm // Use InvoicesForm component
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={selectedRow}
          formType={formType}
        />
      </Paper>
    </>
  );
}
