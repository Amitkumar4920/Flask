import React from 'react';

const CustomerList = ({ customers, onDelete, onEdit, onView }) => {
  return (
    <ul className="list-group mb-4">
      {customers.map((customer) => (
        <li key={customer.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            {customer.name} - {customer.email} - {customer.phone}
          </div>
          <div>
            <button className="btn btn-info btn-sm me-2" onClick={() => onView(customer.id)}>View</button>
            <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(customer)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(customer.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CustomerList;
