// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [customers, setCustomers] = useState([]);
//   const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [updatedCustomer, setUpdatedCustomer] = useState({ name: '', email: '', phone: '' });
//   const [viewingCustomer, setViewingCustomer] = useState(null); // State for viewing a customer

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/customers');
//       setCustomers(response.data);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//   };

//   const addCustomer = async () => {
//     try {
//       await axios.post('http://localhost:5000/customers', newCustomer);
//       fetchCustomers();
//       setNewCustomer({ name: '', email: '', phone: '' });
//     } catch (error) {
//       console.error('Error adding customer:', error);
//     }
//   };

//   const deleteCustomer = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/customers/${id}`);
//       fetchCustomers();
//     } catch (error) {
//       console.error('Error deleting customer:', error);
//     }
//   };

//   const startEditingCustomer = (customer) => {
//     setEditingCustomer(customer.id);
//     setUpdatedCustomer({ name: customer.name, email: customer.email, phone: customer.phone });
//   };

//   const updateCustomer = async () => {
//     try {
//       await axios.put(`http://localhost:5000/customers/${editingCustomer}`, updatedCustomer);
//       fetchCustomers();
//       setEditingCustomer(null);
//       setUpdatedCustomer({ name: '', email: '', phone: '' });
//     } catch (error) {
//       console.error('Error updating customer:', error);
//     }
//   };

//   // Function to view customer details by ID
//   const viewCustomer = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/customers/${id}`);
//       setViewingCustomer(response.data); // Set the fetched customer details to view
//     } catch (error) {
//       console.error('Error fetching customer details:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Customer CRUD Operations</h1>

//       <div className="card mb-4">
//         <div className="card-header">Add New Customer</div>
//         <div className="card-body">
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Name"
//               value={newCustomer.name}
//               onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Email"
//               value={newCustomer.email}
//               onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Phone"
//               value={newCustomer.phone}
//               onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
//             />
//           </div>
//           <button className="btn btn-primary" onClick={addCustomer}>Add Customer</button>
//         </div>
//       </div>

//       <h2 className="text-center mb-4">Customer List</h2>

//       <ul className="list-group mb-4">
//         {customers.map((customer) => (
//           <li key={customer.id} className="list-group-item d-flex justify-content-between align-items-center">
//             <div>
//               {customer.name} - {customer.email} - {customer.phone}
//             </div>
//             <div>
//               <button className="btn btn-info btn-sm me-2" onClick={() => viewCustomer(customer.id)}>View</button>
//               <button className="btn btn-warning btn-sm me-2" onClick={() => startEditingCustomer(customer)}>Edit</button>
//               <button className="btn btn-danger btn-sm" onClick={() => deleteCustomer(customer.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {viewingCustomer && (
//         <div className="card mb-4">
//           <div className="card-header">Customer Details</div>
//           <div className="card-body">
//             <h5>Name: {viewingCustomer.name}</h5>
//             <p>Email: {viewingCustomer.email}</p>
//             <p>Phone: {viewingCustomer.phone}</p>
//             <button className="btn btn-secondary" onClick={() => setViewingCustomer(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       {editingCustomer && (
//         <div className="card">
//           <div className="card-header">Edit Customer</div>
//           <div className="card-body">
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Name"
//                 value={updatedCustomer.name}
//                 onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, name: e.target.value })}
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email"
//                 value={updatedCustomer.email}
//                 onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, email: e.target.value })}
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Phone"
//                 value={updatedCustomer.phone}
//                 onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, phone: e.target.value })}
//               />
//             </div>
//             <button className="btn btn-success" onClick={updateCustomer}>Update Customer</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';

function App() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const addOrUpdateCustomer = async (customer) => {
    try {
      if (editingCustomer) {
        await axios.put(`http://localhost:5000/customers/${editingCustomer.id}`, customer);
        setEditingCustomer(null);
      } else {
        await axios.post('http://localhost:5000/customers', customer);
      }
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const viewCustomer = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/customers/${id}`);
      setViewingCustomer(response.data);
    } catch (error) {
      console.error('Error viewing customer:', error);
    }
  };

  const handleCloseView = () => {
    setViewingCustomer(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Customer CRUD Operations</h1>

      <CustomerForm
        onSubmit={addOrUpdateCustomer}
        customer={editingCustomer}
        isEditing={!!editingCustomer}
      />

      <h2 className="text-center mb-4">Customer List</h2>

      <CustomerList
        customers={customers}
        onDelete={deleteCustomer}
        onEdit={setEditingCustomer}
        onView={viewCustomer}
      />

      <CustomerDetails
        customer={viewingCustomer}
        onClose={handleCloseView}
      />
    </div>
  );
}

export default App;
