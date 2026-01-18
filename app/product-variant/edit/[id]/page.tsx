'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/ui/Layout';
import { service, serviceShow, servicePut } from '@/services/services';
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
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function EditProductVariantPage() {
    const [variantName, setVariantName] = useState('');
    const [productId, setProductId] = useState('');
    const [additionalPrice, setAdditionalPrice] = useState('0');
    const [stock, setStock] = useState('0');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const fetchData = useCallback(async () => {
        setFetching(true);
        try {
            // Fetch products
            const prodListRes = await service('products');
            if (!prodListRes.error) {
                setProducts(prodListRes.data);
            }

            // Fetch variant data
            const varRes = await serviceShow('product-variants', id);
            if (!varRes.error) {
                setVariantName(varRes.data.variant_name);
                setProductId(varRes.data.product_id.toString());
                setAdditionalPrice(varRes.data.additional_price.toString());
                setStock(varRes.data.stock.toString());
            } else {
                toast.error(varRes.message);
                router.push('/product-variant');
            }
        } catch (error) {
            toast.error('Failed to load data');
        } finally {
            setFetching(false);
        }
    }, [id, router]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            product_id: productId,
            variant_name: variantName,
            additional_price: Number(additionalPrice),
            stock: Number(stock),
        };

        try {
            const response = await servicePut('product-variants', id, data);
            if (response.error) {
                toast.error(response.message);
            } else {
                toast.success('Product Variant updated successfully!');
                router.push('/product-variant');
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
                    Edit Product Variant
                </Typography>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    label="Select Product"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                >
                                    {products.map((product) => (
                                        <MenuItem key={product.id} value={product.id.toString()}>
                                            {product.name} ({product.code})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Variant Name"
                                    value={variantName}
                                    onChange={(e) => setVariantName(e.target.value)}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    label="Additional Price"
                                    value={additionalPrice}
                                    onChange={(e) => setAdditionalPrice(e.target.value)}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    label="Stock"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
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
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Variant'}
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/product-variant"
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
