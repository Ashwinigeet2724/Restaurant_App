import axios from "axios";
import { getCSRFToken } from "../utils/csrf";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

api.defaults.headers.post["X-CSRFToken"] = getCSRFToken();

// FOOD
export const getAllFoodItems = () => api.get("/api/food-items/");
export const getFoodItemsByCategory = (category) =>
  api.get(`/api/food-items/?category=${category}`);

// CART
export const getCartApi = () => api.get("/api/cart/");

export const addToCartApi = (foodId, quantity = 1) =>
  api.post("/api/cart/add/", {
    food_id: foodId,
    quantity: quantity,
  });

export const updateCartApi = (foodId, quantity) =>
  api.post("/api/cart/", {
    food_id: foodId,
    quantity: quantity,
  });

export const removeFromCartApi = (foodId) =>
  api.post("/api/cart/remove/", {
    food_id: foodId,
  });

export const clearCartApi = () => api.post("/api/cart/clear/");

// ORDER
export const createOrderApi = (data) =>
  api.post("/api/order/create/", data);

export default api;
