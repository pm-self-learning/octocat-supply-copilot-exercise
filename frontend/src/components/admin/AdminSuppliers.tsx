import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../api/config';

interface Supplier {
  supplierId: number;
  name: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
}

type SortField = 'name' | 'contactPerson' | 'email' | 'phone';
type SortOrder = 'asc' | 'desc';

export default function AdminSuppliers() {
  const { isAdmin } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${api.baseURL}${api.endpoints.suppliers}`);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    let aValue: string | number = '';
    let bValue: string | number = '';

    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'contactPerson':
        aValue = a.contactPerson;
        bValue = b.contactPerson;
        break;
      case 'email':
        aValue = a.email;
        bValue = b.email;
        break;
      case 'phone':
        aValue = a.phone;
        bValue = b.phone;
        break;
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const renderSortIcon = (field: SortField) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleDelete = async (supplierId: number) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await axios.delete(`${api.baseURL}${api.endpoints.suppliers}/${supplierId}`);
        fetchSuppliers();
      } catch (error) {
        console.error('Error deleting supplier:', error);
        alert('Error deleting supplier');
      }
    }
  };

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-light">Manage Suppliers</h1>
          <button
            onClick={() => {
              setEditingSupplier(undefined);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-primary hover:bg-accent text-white rounded"
          >
            Add New Supplier
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-dark rounded-lg overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSort('name')}
                >
                  Name {renderSortIcon('name')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSort('contactPerson')}
                >
                  Contact Person {renderSortIcon('contactPerson')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSort('email')}
                >
                  Email {renderSortIcon('email')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSort('phone')}
                >
                  Phone {renderSortIcon('phone')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-light uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-light uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedSuppliers.map(supplier => (
                <tr key={supplier.supplierId} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-light">{supplier.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-light">{supplier.contactPerson}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-light">{supplier.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-light">{supplier.phone}</td>
                  <td className="px-6 py-4 text-light">
                    <div className="max-w-xs truncate">{supplier.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(supplier)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.supplierId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-xl font-bold text-light mb-4">
                {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
              </h2>
              <p className="text-gray-400 mb-4">
                Supplier form functionality would be implemented here.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement supplier form functionality
                    setShowForm(false);
                    fetchSuppliers();
                  }}
                  className="px-4 py-2 bg-primary hover:bg-accent text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}