import React, { useState, useEffect } from 'react';
import InvoiceCard from './InvoiceCard';

const InvoiceListPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const apiUrl = `http://localhost:3000/invoices?page=${page}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setInvoices([...data]);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, [page]);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Invoice List</h1>
            {invoices.map((invoice) => (
                <InvoiceCard key={invoice.invoice_no} invoice={invoice} />
            ))}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => setPage((prevPage) => prevPage + 1)}
            >
                Load More Invoices
            </button>
        </div>
    );
};

export default InvoiceListPage;
