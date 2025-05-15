import React from "react";

function SingleFeaturedProduct({ product }) {
  console.log(product);
  return (
    <div className="w-32 h-32 flex flex-col items-center justify-center text-center bg-base-100 shadow-2xl p-4 rounded-2xl">
      <Link
        to={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
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
  );
}

export default SingleFeaturedProduct;
