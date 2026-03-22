import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomePage.css";
import vegSnacksImg from "../assets/images/vegsnacks.jpg";
import nonVegSnacksImg from "../assets/images/nonveg_snacks.jpg";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Banner */}
      <div className="banner"></div>

      {/* Categories */}
      <div className="home-container">
        <h2 className="section-title">Categories</h2>

        <div className="category-grid">
          <div
            className="category-card veg"
            onClick={() => navigate("/items/veg")}
          >
            <h3>Veg</h3>
            <p>Fresh & Healthy</p>
          </div>
          
          

<Link to="/items/veg_snacks" className="category-link">
  <div className="category-card">
    <img
      src={vegSnacksImg}
      alt="Veg Snacks"
      className="category-img"
    />
    <h3>Veg Snacks</h3>
  </div>
</Link>

<Link to="/items/nonveg_snacks" className="category-link">
  <div className="category-card">
    <img
      src={nonVegSnacksImg}
      alt="Non Veg Snacks"
      className="category-img"
    />
    <h3>Non Veg Snacks</h3>
  </div>
</Link>


          <div
            className="category-card nonveg"
            onClick={() => navigate("/items/nonveg")}
          >
            <h3>Non-Veg</h3>
            <p>Rich & Spicy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
