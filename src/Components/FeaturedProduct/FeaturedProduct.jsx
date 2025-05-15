import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeaturedProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/FeaturedProduct.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Failed to load featured products:", err);
      });
  }, []);

  return (
    <div className="my-10 w-10/12 mx-auto">
      <h1 className="text-lg text-center md:text-2xl">Featured Products</h1>
      <p className="text-center text-gray-600 mb-6">
        Get Your Desired Product from Featured Products!
      </p>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Loading products…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="w-32 h-32 flex flex-col items-center justify-center text-center bg-base-100 shadow-2xl p-4 rounded-2xl"
            >
              <Link className="flex flex-col items-center">
                <div className="w-20 h-20 mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-medium">{product.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedProduct;
