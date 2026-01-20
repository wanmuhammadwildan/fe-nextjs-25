'use client';

import Layout from '@/components/ui/Layout';
import { serviceShow, servicePut } from '@/services/services';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductCategoryEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const getProductCategory = useCallback(async () => {
    setFetching(true);
    try {
      const response = await serviceShow('product-categories', id);
      if (!response.error) {
        setName(response.data.name);
        setDescription(response.data.description || '');
      } else {
        toast.error(response.message);
        router.push('/product-category');
      }
    } catch (error) {
      toast.error('Failed to load category');
    } finally {
      setFetching(false);
    }
  }, [id, router]);

  useEffect(() => {
    getProductCategory();
  }, [getProductCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        name,
        description,
      };

      const response = await servicePut('product-categories', id, data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('Product category updated successfully!');
        router.push('/product-category');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (fetching) {
    return (
      <Layout>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', py: 10, width: '100%' }}
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          Product Category Edit
        </Typography>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  variant="standard"
                  required
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  variant="standard"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{ flexGrow: 1 }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Update Category'
                    )}
                  </Button>
                  <Button
                    component={Link}
                    href="/product-category"
                    variant="outlined"
                    size="large"
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}
