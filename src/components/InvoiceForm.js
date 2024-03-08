import React, { useState } from 'react';
import ProductAutocomplete from './ProductAutoComplete';

const InvoiceForm = () => {
    const [invoiceData, setInvoiceData] = useState({
        date: '',
        customer: '',
        salesperson: '',
        notes: '',
        products: [],
    });

    const productsData = [
        { id: 1, name: 'Product 1', stock: 10, price: 20 },
        { id: 2, name: 'Product 2', stock: 5, price: 15 },
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleProductSelection = (selectedProduct) => {
        const isProductSelected = invoiceData.products.some(
            (product) => product.id === selectedProduct.id
        );

        if (!isProductSelected) {
            setInvoiceData((prevData) => ({
                ...prevData,
                products: [...prevData.products, selectedProduct],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        const isValidForm = validateForm();
        if (!isValidForm) {
            setIsValid(false);
            return;
        }

        // Proceed with API call and form submission
        setIsSubmitting(true);
        setIsValid(true);

        try {
            const apiUrl = 'http://localhost:3000/invoices';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData),
            });

            if (response.ok) {
                // Show notification pop-up upon successful submission
                alert('Invoice submitted successfully!');
                setInvoiceData({
                    date: '',
                    customerName: '',
                    salespersonName: '',
                    notes: '',
                    products: [],
                });
            } else {
                alert('Failed to submit invoice. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting invoice:', error);
            alert("error submit")
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateForm = () => {
        // Check for empty input fields
        return (
            invoiceData.date.trim() !== '' &&
            invoiceData.customer.trim() !== '' &&
            invoiceData.salesperson.trim() !== '' &&
            invoiceData.products.length > 0
        );
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={invoiceData.date}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold">Customer Name:</label>
                        <input
                            type="text"
                            name="customer"
                            value={invoiceData.customer}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold">Salesperson Name:</label>
                        <input
                            type="text"
                            name="salesperson"
                            value={invoiceData.salesperson}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold">Notes:</label>
                        <textarea
                            name="notes"
                            value={invoiceData.notes}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>

                {/* Autocomplete for product input */}
                <ProductAutocomplete products={productsData} onSelect={handleProductSelection} />

                {/* Display selected products */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Selected Products:</h3>
                    <ul>
                        {invoiceData.products.map((product, index) => (
                            <li key={index} className="mb-1">
                                {product.name} - Stock: {product.stock} - Price: {product.price}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Show warning message for invalid inputs */}
                {!isValid && (
                    <p className="text-red-500 text-sm mt-2">
                        Please fill in all required fields before submitting.
                    </p>
                )}

                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Invoice'}
                </button>
            </form>
        </div>
    );
};

export default InvoiceForm;
