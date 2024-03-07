import React, { useState } from 'react';

const ProductAutocomplete = ({ products, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleSelectProduct = (selectedProduct) => {
        setSearchTerm('');
        setFilteredProducts([]);
        onSelect(selectedProduct);
    };

    return (
        <div className="mt-4">
            <input
                type="text"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ul className="mt-2">
                {filteredProducts.map((product) => (
                    <li
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-100"
                    >
                        {product.name} - Stock: {product.stock} - Price: {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductAutocomplete;
