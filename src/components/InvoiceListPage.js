// src/components/InvoiceListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceCard from './InvoiceCard';

const InvoiceListPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [invoicesPerPage, setInvoicesPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch invoices using GET API
        const fetchInvoices = async () => {
            try {
                const apiUrl = `http://localhost:3000/invoices?page=${currentPage}&pageSize=${invoicesPerPage}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setInvoices(data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, [currentPage, invoicesPerPage]);

    const totalPages = Math.ceil(invoices.length / invoicesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleInvoicesPerPageChange = (newPerPage) => {
        setInvoicesPerPage(newPerPage);
        setCurrentPage(1); // Reset to the first page when changing the number of invoices per page
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Invoice List</h1>
            <div className="flex justify-between mb-4">
                <div>
                    <label className="mr-2">Invoices per Page:</label>
                    <select
                        value={invoicesPerPage}
                        onChange={(e) => handleInvoicesPerPageChange(Number(e.target.value))}
                        className="border rounded-md p-2"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div>
                    <span className="mr-2">Page {currentPage} of {totalPages}</span>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 p-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            {invoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
        </div>
    );
};

export default InvoiceListPage;
