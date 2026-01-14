'use client';

import Link from "next/link";
import Layout from "@/components/ui/Layout";
import { useEffect, useState } from "react";
import { service } from "@/services/services";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  CircularProgress
} from "@mui/material";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await service('products');
        if (!response.error && Array.isArray(response.data)) {
          setProducts(response.data.slice(0, 4)); // Show top 4 products
        } else if (!response.error) {
          console.warn("API response data is not an array:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 10, 
            borderRadius: 4,
            textAlign: 'center',
            mb: 8,
            boxShadow: 3,
            background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)'
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              Welcome to Our Premium Store
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Discover our latest collection of high-quality products curated just for you.
            </Typography>
            <Button 
              component={Link} 
              href="/product" 
              variant="contained" 
              color="secondary" 
              size="large" 
              sx={{ py: 1.5, px: 4, fontWeight: 'bold' }}
            >
              Shop Now
            </Button>
          </Container>
        </Box>

        {/* Product Showcase Section */}
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Featured Products
            </Typography>
            <Button component={Link} href="/product" color="primary">View All Products &rarr;</Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {products.length > 0 ? products.map((product: any) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://picsum.photos/seed/${product.id}/400/300`}
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h3">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Code: {product.code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Category: {product.category?.name || 'Uncategorized'}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button 
                        component={Link} 
                        href={`/product-variant`} 
                        fullWidth 
                        variant="outlined" 
                        size="small"
                      >
                        View Details
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              )) : (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body1" textAlign="center" color="text.secondary">
                    No products featured yet. Stay tuned!
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </Box>
    </Layout>
  );
}
