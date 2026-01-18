'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Layout from "@/components/ui/Layout";
import { service } from "@/services/services";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Paper,
  Avatar
} from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import LayersIcon from '@mui/icons-material/Layers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    variants: 0
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prodRes, catRes, varRes, userRes] = await Promise.all([
          service('products'),
          service('product-categories'),
          service('product-variants'),
          service('user')
        ]);

        setStats({
          products: prodRes.data?.length || 0,
          categories: catRes.data?.length || 0,
          variants: varRes.data?.length || 0
        });

        if (!userRes.error) {
          setUser(userRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const DashboardCard = ({ title, count, icon, color, href }: any) => (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Card sx={{
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 30px 0 rgba(0,0,0,0.1)' }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 56, height: 56 }}>
              {icon}
            </Avatar>
            <Typography variant="h4" fontWeight="bold">
              {count}
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight="medium" gutterBottom>
            {title}
          </Typography>
          <Button
            component={Link}
            href={href}
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: 1, textTransform: 'none', fontWeight: 'bold' }}
          >
            Manage
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%' }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ width: '100%', pb: 5 }}>
        {/* Welcome Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            color: 'white'
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Hello, {user?.name || 'Admin'}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
            Welcome to your UAS Project Management Dashboard. Here's what's happening today.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" component={Link} href="/product/create" color="primary" sx={{ borderRadius: 2 }}>
              Add Product
            </Button>
            <Button variant="outlined" component={Link} href="/profile" sx={{ borderRadius: 2, color: 'white', borderColor: 'white', '&:hover': { borderColor: '#e2e8f0', bgcolor: 'rgba(255,255,255,0.1)' } }}>
              View Profile
            </Button>
          </Box>
        </Paper>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: 'black' }}>
          System Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          <DashboardCard
            title="Total Products"
            count={stats.products}
            icon={<InventoryIcon />}
            color="primary"
            href="/product"
          />
          <DashboardCard
            title="Product Categories"
            count={stats.categories}
            icon={<CategoryIcon />}
            color="secondary"
            href="/product-category"
          />
          <DashboardCard
            title="Product Variants"
            count={stats.variants}
            icon={<LayersIcon />}
            color="success"
            href="/product-variant"
          />
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: 'black' }}>
          Quick Navigation
        </Typography>
        <Grid container spacing={2}>
          {['Product', 'Product Category', 'Product Variant'].map((label) => (
            <Grid key={label} size={{ xs: 12, sm: 4 }}>
              <Button
                component={Link}
                href={`/${label.toLowerCase().replace(' ', '-')}`}
                fullWidth
                variant="outlined"
                sx={{
                  py: 2,
                  borderRadius: 3,
                  justifyContent: 'flex-start',
                  px: 3,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' }
                }}
              >
                Go to {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}
