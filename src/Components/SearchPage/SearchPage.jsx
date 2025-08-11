import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q") || "";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery) {
            setLoading(true);
            axios
                .get(`http://localhost:5000/search?q=${encodeURIComponent(searchQuery)}`)
                .then((res) => {
                    setResults(res.data);
                })
                .catch((err) => {
                    console.error("Search error:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [searchQuery]);

    return (
        <div className="p-4">
            <h1 className="mb-4 text-xl font-semibold">
                Search Results for: "{searchQuery}"
            </h1>

            {loading && <p>Loading...</p>}

            {!loading && results.length === 0 && (
                <p>No products found for "{searchQuery}"</p>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {results.map((product) => (
                    <div
                        key={product._id}
                        className="p-4 border rounded-lg shadow hover:shadow-lg"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="object-cover w-full h-40 rounded"
                        />
                        <h2 className="mt-2 text-lg font-bold">{product.title}</h2>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="mt-1 font-semibold text-green-600">
                            ${product.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
