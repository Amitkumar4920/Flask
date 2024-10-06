import React from 'react';

const CustomerDetails = ({ customer, onClose }) => {
  if (!customer) return null;  // Do not render if no customer is selected

  return (
    <div className="card mb-4">
      <div className="card-header">Customer Details</div>
      <div className="card-body">
        <h5>Name: {customer.name}</h5>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomerDetails;
