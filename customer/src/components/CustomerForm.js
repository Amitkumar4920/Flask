import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onSubmit, customer, isEditing }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (customer) {
      setFormData(customer);  // Pre-fill form when editing
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Call the parent component's function
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="card mb-4">
      <div className="card-header">{isEditing ? 'Edit Customer' : 'Add New Customer'}</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary">{isEditing ? 'Update Customer' : 'Add Customer'}</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
