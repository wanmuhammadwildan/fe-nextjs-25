'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/ui/Layout';
import { service, servicePost } from '@/services/services';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    MenuItem,
    CircularProgress,
    Grid
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function CreateProductPage() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await service('product-categories');
                if (!response.error) {
                    setCategories(response.data);
                }
            } catch (error) {
                toast.error('Failed to load categories');
            } finally {
                setFetching(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            name,
            code,
            product_category_id: categoryId,
        };

        try {
            const response = await servicePost('products', data);
            if (response.error) {
                toast.error(response.message);
            } else {
                toast.success('Product created successfully!');
                router.push('/product');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10, width: '100%' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxWidth="sm">
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                    Add New Product
                </Typography>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Product Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Gaming Laptop"
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Product Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="e.g. LAP-001"
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    label="Category"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={12}>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={loading}
                                        sx={{ flexGrow: 1 }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Product'}
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/product"
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
