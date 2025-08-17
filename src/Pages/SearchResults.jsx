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
    fetch("https://gadget-zone-server-ashy.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {

        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        
        setLoading(false);
      });
  }, [query]);


  if (loading) {
    return (
      <div className="text-center"><span className="loading loading-spinner text-primary "></span></div>
    );
  }

  return (
    <div className="w-11/12 px-4 py-8 mx-auto mt-9">
      <h2 className="mb-6 text-2xl font-bold">
        Search results for: <span className="text-blue-600">{query}</span>
      </h2>

      {products.length === 0 ? (
        <p className="text-red-500">No products found..</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-2xl"
            >
              {/* Save Badge */}
              <div className="absolute z-10 px-2 py-1 text-xs text-white bg-purple-600 rounded-md top-3 left-2">
                Save: {product.save_amount}৳ ({product.discount})
              </div>

              {/* Product Image */}
              <Link to={`/product/${product._id}`}>
                <div className="flex items-center justify-center h-40 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-full"
                  />
                </div>

                {/* Product Title */}
                <div className="px-4 pb-4 text-center">
                  <h2 className="mb-2 text-sm font-semibold text-gray-800">
                    {product.title}
                  </h2>

                  {/* Price Section */}
                  <div className="text-lg font-bold text-red-600">
                    {product.price}৳{" "}
                    <span className="ml-2 text-sm text-gray-500 line-through">
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
