'use client';

import Layout from '@/components/ui/Layout';
import { service } from '@/services/services';
import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmDelete from '@/components/ui/ConfirmDelete';
import Link from 'next/link';

export default function ProductVariantPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const apiEndpoint = 'product-variants';

  const [open, setOpen] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState({
    id: '',
    name: '',
  });

  const handleClickOpen = (id: string, name: string) => {
    setSelectedDelete({ id, name });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDelete({ id: '', name: '' });
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await service(apiEndpoint);
      if (!response.error) {
        setRows(response.data);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'variant_name', headerName: 'Variant Name', width: 200 },
      { 
        field: 'product', 
        headerName: 'Product', 
        width: 200,
        valueGetter: (params, row: any) => row?.product?.name || '-'
      },
      { field: 'additional_price', headerName: 'Price (+)', width: 130, type: 'number' },
      { field: 'stock', headerName: 'Stock', width: 100, type: 'number' },
      {
        field: 'action',
        headerName: 'Action',
        width: 120,
        renderCell: (params) => (
          <>
            <IconButton component={Link} href={`/product-variant/edit/${params.row.id}`} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleClickOpen(params.row.id, params.row.variant_name)}
            >
              <DeleteOutlineIcon fontSize="small" color="error" />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="flex w-full justify-between items-center my-4">
        <h1 className="text-black text-2xl font-bold">Product Variants</h1>
        <Button component={Link} href="/product-variant/create" variant="contained">Add New Variant</Button>
      </div>

      <div style={{ minHeight: 400, width: '100%' }}>
        <div className="flex justify-end mb-2">
          <IconButton onClick={getData} disabled={isLoading}>
            <RefreshIcon />
          </IconButton>
        </div>
        <DataGrid
          loading={isLoading}
          rows={rows}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
        />
      </div>

      <ConfirmDelete
        isOpen={open}
        onClose={handleClose}
        hrefDelete={apiEndpoint}
        id={selectedDelete.id}
        name={selectedDelete.name}
        refresh={getData}
      />
    </Layout>
  );
}
