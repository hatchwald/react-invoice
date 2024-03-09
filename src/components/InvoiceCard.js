import React from 'react';

const InvoiceCard = ({ invoice }) => {
    let { customer, salesperson, notes, } = invoice;
    const products = invoice.productSolds
    const totalAmountPaid = products.reduce((sum, entry) => sum + entry.total_price, 0)

    return (
        <div className="border p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">{customer}</h3>
            <p>Salesperson: {salesperson}</p>
            <p>Total Amount Paid: {totalAmountPaid}</p>
            <p>Notes: {notes}</p>
        </div>
    );
};

export default InvoiceCard;
