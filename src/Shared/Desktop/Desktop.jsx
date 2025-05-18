import React, { useState } from 'react';

const desktopPCs = [
  {
    id: 1,
    name: "AMD Ryzen 5 5600G PC",
    processor: "Ryzen 5",
    ram: "8GB",
    ssd: "256GB",
    price: "21600",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-7-7700x-gaming-desktop-pc-36343-002-228x228.webp"
  },
  {
    id: 2,
    name: "Intel Core i3 12100 PC",
    processor: "Core i3",
    ram: "8GB",
    ssd: "512GB",
    price: "31785",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/ryzen-7-5800x-gaming-desktop-pc-0001-228x228.webp"
  },
  {
    id: 3,
    name: "Ryzen 7 5700X Gaming PC",
    processor: "Ryzen 7",
    ram: "16GB",
    ssd: "512GB",
    price: "42000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-8400f-desktop-pc-004-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
  {
    id: 4,
    name: "AMD Ryzen 5 Custom Build",
    processor: "Ryzen 5",
    ram: "16GB",
    ssd: "256GB",
    price: "37000",
    image: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-5-5500-gaming-pc-228x228.webp"
  },
];

function Desktop() {
  const [filters, setFilters] = useState({
    processor: "",
    ram: "",
    ssd: ""
  });

  const [priceRange, setPriceRange] = useState({
    min: '',
    max: 50000
  });

  const handleChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? "" : value
    }));
  };

  const handlePriceChange = (e, type) => {
    const value = Number(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const filteredData = desktopPCs.filter(pc => {
    const priceNumber = Number(pc.price.replace(/,/g, ''));
    return (
      (!filters.processor || pc.processor === filters.processor) &&
      (!filters.ram || pc.ram === filters.ram) &&
      (!filters.ssd || pc.ssd === filters.ssd) &&
      priceNumber >= priceRange.min &&
      priceNumber <= priceRange.max
    );
  });

  return (
    <div className='mt-28 min-h-screen bg-gray-100 p-4'>
      <h1 className="text-2xl font-bold mb-6 text-center">🖥️ Desktop PC Catalog</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="space-y-6 bg-white p-4 rounded shadow-md">
          {/* Price Range */}
          <div>
            <h4 className="font-bold mb-2">Price Range</h4>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
                className="w-full border px-2 py-1 rounded"
                min={0}
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Processor</h4>
            {["Ryzen 5", "Ryzen 7", "Core i3"].map(item => (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.processor === item}
                    onChange={() => handleChange("processor", item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-bold mb-2">RAM</h4>
            {["8GB", "16GB"].map(item => (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.ram === item}
                    onChange={() => handleChange("ram", item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-bold mb-2">SSD</h4>
            {["256GB", "512GB"].map(item => (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.ssd === item}
                    onChange={() => handleChange("ssd", item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="md:col-span-3">
          {filteredData.length === 0 ? (
            <p className="text-center text-red-500 font-semibold">
              No PCs found with selected filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredData.map(pc => (
                <div key={pc.id} className="border rounded-lg p-4 shadow-md bg-white">
                  <img
                    src={pc.image}
                    alt={pc.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="font-semibold mt-2">{pc.name}</h2>
                  <p className="text-sm text-gray-600">Processor: {pc.processor}</p>
                  <p className="text-sm text-gray-600">RAM: {pc.ram} | SSD: {pc.ssd}</p>
                  <p className="text-red-600 font-bold mt-2">{Number(pc.price).toLocaleString()} ৳</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Desktop;
