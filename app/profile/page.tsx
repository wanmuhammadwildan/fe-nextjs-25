'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/ui/Layout';
import { service } from '@/services/services';
import {
    Box,
    Container,
    Typography,
    Paper,
    Avatar,
    Divider,
    CircularProgress,
    Grid,
    Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await service('user');
                if (!response.error) {
                    setUser(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width: '100%' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: 'black' }}>
                        User Profile
                    </Typography>
                    <Button component={Link} href="/profile/edit" variant="contained">
                        Edit Profile
                    </Button>
                </Box>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'primary.main',
                                mr: 3,
                                fontSize: 40
                            }}
                        >
                            {user?.name?.charAt(0) || <PersonIcon fontSize="large" />}
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold' }}>
                                {user?.name || 'User'}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black', opacity: 0.7 }}>
                                {user?.email || 'email@example.com'}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box>
                                <Typography variant="overline" sx={{ color: 'black', fontWeight: 'bold' }}>
                                    Full Name
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'black', fontWeight: 500 }}>
                                    {user?.name}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box>
                                <Typography variant="overline" sx={{ color: 'black', fontWeight: 'bold' }}>
                                    Email Address
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'black', fontWeight: 500 }}>
                                    {user?.email}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box>
                                <Typography variant="overline" sx={{ color: 'black', fontWeight: 'bold' }}>
                                    Account Created
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'black', fontWeight: 500 }}>
                                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box>
                                <Typography variant="overline" sx={{ color: 'black', fontWeight: 'bold' }}>
                                    Email Verified
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'black', fontWeight: 500 }}>
                                    {user?.email_verified_at ? 'Yes' : 'No'}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    );
}
