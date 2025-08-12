import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const query = new URLSearchParams(location.search).get("q");

useEffect(() => {
  if (!query) return;

  setLoading(true);
  fetch("http://localhost:5000/products") 
    .then((res) => res.json())
    .then((data) => {
     
      const filtered = data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, [query]);


  if (loading) {
    return (
       <div className="text-center"><span className="loading loading-spinner text-primary "></span></div>
    );
  }

  return (
    <div className="w-11/12  mx-auto px-4 py-8 mt-9">
      <h2 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-blue-600">{query}</span>
      </h2>

      {products.length === 0 ? (
        <p className="text-red-500">No products found..</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          { products.map((product, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Save Badge */}
              <div className="absolute top-3 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-md z-10">
                Save: {product.save_amount}৳ ({product.discount})
              </div>

              {/* Product Image */}
              <Link to={`/product/${product._id}`}>
                <div className="p-4 flex justify-center items-center h-40">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-full"
                  />
                </div>

                {/* Product Title */}
                <div className="px-4 pb-4 text-center">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>

                  {/* Price Section */}
                  <div className="text-red-600 font-bold text-lg">
                    {product.price}৳{" "}
                    <span className="line-through text-sm text-gray-500 ml-2">
                      {product.previous_price}৳
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
