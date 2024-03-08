import React from 'react';

const InvoiceCard = ({ invoice }) => {
    const { customer, salesperson, totalAmountPaid, notes } = invoice;
    console.log("data", invoice)
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
