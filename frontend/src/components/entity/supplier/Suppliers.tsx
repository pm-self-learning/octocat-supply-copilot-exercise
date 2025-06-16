import axios from 'axios';
import { useQuery } from 'react-query';
import { api } from '../../../api/config';

interface Supplier {
  supplierId: number;
  name: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
}

const fetchSuppliers = async (): Promise<Supplier[]> => {
  const { data } = await axios.get(`${api.baseURL}${api.endpoints.suppliers}`);
  return data;
};

export default function Suppliers() {
  const { data: suppliers, isLoading, error } = useQuery('suppliers', fetchSuppliers);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-red-500 text-center">Failed to fetch suppliers</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-6">Suppliers</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers?.map((supplier) => (
            <div key={supplier.supplierId} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(118,184,82,0.3)]">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-light mb-3">{supplier.name}</h3>
                <p className="text-gray-400 mb-4">{supplier.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-primary font-medium w-20">Contact:</span>
                    <span className="text-light">{supplier.contactPerson}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-primary font-medium w-20">Email:</span>
                    <a 
                      href={`mailto:${supplier.email}`}
                      className="text-light hover:text-primary transition-colors"
                    >
                      {supplier.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-primary font-medium w-20">Phone:</span>
                    <a 
                      href={`tel:${supplier.phone}`}
                      className="text-light hover:text-primary transition-colors"
                    >
                      {supplier.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}