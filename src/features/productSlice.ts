import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (params: { limit: number; page: number; filter: string }) => {
  const response = await axios.get(`${API_URL}`, {
    params: { limit: params.limit, skip: (params.page - 1) * params.limit, [params.filter]: params.filter },
  });
  return response.data;
});

interface ProductState {
  products: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  totalProducts: number;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  totalProducts: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
