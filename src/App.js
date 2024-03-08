// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoiceListPage from './components/InvoiceListPage';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Invoice App</h1>
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/invoices">Invoices</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<InvoiceForm />} />
          <Route path="/invoices" element={<InvoiceListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
