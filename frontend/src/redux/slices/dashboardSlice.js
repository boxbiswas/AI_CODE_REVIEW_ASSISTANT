import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios';

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/dashboard');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to load dashboard data');
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        stats: {
            totalReviews: 0,
            averageScore: 0,
            statusBreakdown: { PENDING: 0, ANALYZING: 0, AI_REVIEW: 0, COMPLETED: 0, FAILED: 0 }
        },
        recentReviews: [],
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload.stats;
                state.recentReviews = action.payload.recentReviews;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;