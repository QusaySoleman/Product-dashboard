import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    ourProducts: [],
  },
  reducers: {
    addProducts: function (state, action) {
      state.ourProducts.push(action.payload);
    },
    deleteProduct: function (state, action) {
      state.ourProducts = state.ourProducts.filter(
        (prod) => prod.id !== action.payload
      );
    },
    updateProduct: function (state, action) {
      state.ourProducts.map((product) => {
        if (product.id === action.payload.id) {
          product.Name = action.payload.name;
          product.Desc = action.payload.description;
          product.Price = action.payload.price;
        }
      });
    },
  },
});
export const { addProducts, deleteProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
