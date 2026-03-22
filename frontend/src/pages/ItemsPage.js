import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";
import "./ItemsPage.css";

function ItemsPage() {
  const { category } = useParams();
  const [foods, setFoods] = useState([]);
  const { cart, addToCart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    if (!category) return;

    api
      .get("/api/food-items/", {
        params: { category: category.toLowerCase() },
      })
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, [category]);

  // ✅ cart lookup
  const getCartItem = (foodId) =>
    cart.find((item) => item.food_item?.id === foodId);

  return (
    <div>
      <h2>{category.toUpperCase()} ITEMS</h2>

      <div className="items-container">
        {foods.map((food) => {
          const cartItem = getCartItem(food.id);

          return (
            <div key={food.id} className="item-card">
              <img
                src={food.image || "https://via.placeholder.com/150"}
                alt={food.name}
                className="food-img"
              />

              <h4>{food.name}</h4>
              <p>₹{food.price}</p>

              {!cartItem ? (
                <button
                  className="add-btn"
                  onClick={() => addToCart(food.id)}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="qty-control">
                  <button
                    disabled={cartItem.quantity <= 1}
                    onClick={() =>
                      updateQuantity(food.id, cartItem.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{cartItem.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(food.id, cartItem.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsPage;
