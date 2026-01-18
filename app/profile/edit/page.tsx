'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/ui/Layout';
import { service, servicePut } from '@/services/services';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Grid
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function EditProfilePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const router = useRouter();

    const fetchData = useCallback(async () => {
        setFetching(true);
        try {
            const response = await service('user');
            if (!response.error) {
                setName(response.data.name);
                setEmail(response.data.email);
            } else {
                toast.error(response.message);
                router.push('/profile');
            }
        } catch (error) {
            toast.error('Failed to load user data');
        } finally {
            setFetching(false);
        }
    }, [router]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password && password !== passwordConfirmation) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        const data: any = {
            name,
            email,
        };

        if (password) {
            data.password = password;
            data.password_confirmation = passwordConfirmation;
        }

        try {
            const response = await servicePut('user/profile', '', data); // Empty string for ID since it's /user/profile
            if (response.error) {
                toast.error(response.message);
            } else {
                toast.success('Profile updated successfully!');
                router.push('/profile');
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
                    Edit Profile
                </Typography>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Leave password fields blank if you don't want to change it.
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Confirm New Password"
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/profile"
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
