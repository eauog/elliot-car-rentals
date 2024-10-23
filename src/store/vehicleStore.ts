// import { create } from 'zustand';

// // Define the vehicle type based on your model
// interface Vehicle {
//   _id: string;
//   make: string;
//   model: string;
//   year: number;
//   availability: boolean;
//   pricePerDay: number;
//   maintenanceSchedule: Date[];
//   imageUrl: string;
// }

// // Define the store's state and actions
// interface VehicleStore {
//   vehicles: Vehicle[];
//   fetchVehicles: () => Promise<void>;
//   getVehicleById: (id: string) => Vehicle[];
//   filterVehicles: (searchTerm: string) => Vehicle[];
//   addVehicle: (vehicle: Omit<Vehicle, '_id'>) => Promise<void>;
//   updateVehicle: (id: string, updatedVehicle: Partial<Vehicle>) => Promise<void>;
//   deleteVehicle: (id: string) => Promise<void>;
// }

// export const useVehicleStore = create<VehicleStore>((set, get) => ({
//   vehicles: [],

//   // Fetch vehicles from the backend API and update the state
//   fetchVehicles: async () => {
//     try {
//       const response = await fetch('/api/vehicles');
//       if (!response.ok) {
//         throw new Error('Failed to fetch vehicles');
//       }
//       const data: Vehicle[] = await response.json();
//       set({ vehicles: data });
//     } catch (error) {
//       console.error('Error fetching vehicles:', error);
//     }
//   },

//   getVehicleById: async (id: string) {
      
//   },

//   // Filter vehicles by make or model (client-side filtering)
//   filterVehicles: (searchTerm: string) => {
//     const { vehicles } = get(); // Get the current list of vehicles from the state
//     return vehicles.filter((vehicle) =>
//       vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   },

//   // Add a new vehicle (POST request)
//   addVehicle: async (newVehicle) => {
//     try {
//       const response = await fetch('/api/vehicles/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newVehicle),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add vehicle');
//       }

//       const addedVehicle: Vehicle = await response.json();
//       // Update the state by adding the new vehicle
//       set((state) => ({ vehicles: [...state.vehicles, addedVehicle] }));
//     } catch (error) {
//       console.error('Error adding vehicle:', error);
//     }
//   },

//   // Update an existing vehicle (PUT request)
//   updateVehicle: async (id, updatedVehicle) => {
//     try {
//       const response = await fetch(`/api/vehicles/${id}/update`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedVehicle),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update vehicle');
//       }

//       const updatedVehicleData: Vehicle = await response.json();
//       // Update the state by replacing the updated vehicle
//       set((state) => ({
//         vehicles: state.vehicles.map((vehicle) =>
//           vehicle._id === id ? updatedVehicleData : vehicle
//         ),
//       }));
//     } catch (error) {
//       console.error('Error updating vehicle:', error);
//     }
//   },

//   // Delete a vehicle (DELETE request)
//   deleteVehicle: async (id) => {
//     try {
//       const response = await fetch(`/api/vehicles/${id}/delete`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete vehicle');
//       }

//       // Update the state by removing the deleted vehicle
//       set((state) => ({
//         vehicles: state.vehicles.filter((vehicle) => vehicle._id !== id),
//       }));
//     } catch (error) {
//       console.error('Error deleting vehicle:', error);
//     }
//   },
// }));


import { create } from 'zustand';
import axiosInstance from '@/utils/axiosInstance'; // Import your configured Axios instance

// Define the vehicle type based on your model
interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  availability: boolean;
  pricePerDay: number;
  maintenanceSchedule: Date[];
  imageUrl: string;
}

// Define the store's state and actions
interface VehicleStore {
  vehicles: Vehicle[];
  fetchVehicles: () => Promise<void>;
  getVehicleById: (id: string) => Vehicle | undefined;
  filterVehicles: (searchTerm: string) => Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, '_id'>) => Promise<void>;
  updateVehicle: (id: string, updatedVehicle: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: [],

  // Fetch vehicles from the backend API using axiosInstance
  fetchVehicles: async () => {
    try {
      const response = await axiosInstance.get('/vehicles');
      const data: Vehicle[] = response.data; // Assume the data is in response.data
      set({ vehicles: data });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  },

  // Get a vehicle by ID
  getVehicleById: (id: string) => {
    const { vehicles } = get();
    return vehicles.find((vehicle) => vehicle._id === id);
  },

  // Filter vehicles by make or model (client-side filtering)
  filterVehicles: (searchTerm: string) => {
    const { vehicles } = get();
    return vehicles.filter(
      (vehicle) =>
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  // Add a new vehicle (POST request) using axiosInstance
  addVehicle: async (newVehicle) => {
    try {
      const response = await axiosInstance.post('/vehicles/add', newVehicle);
      const addedVehicle: Vehicle = response.data; // Assume the added vehicle is in response.data
      set((state) => ({ vehicles: [...state.vehicles, addedVehicle] }));
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  },

  // Update an existing vehicle (PUT request) using axiosInstance
  updateVehicle: async (id, updatedVehicle) => {
    try {
      const response = await axiosInstance.put(`/vehicles/${id}/update`, updatedVehicle);
      const updatedVehicleData: Vehicle = response.data; // Assume the updated vehicle is in response.data
      set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle._id === id ? updatedVehicleData : vehicle
        ),
      }));
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  },

  // Delete a vehicle (DELETE request) using axiosInstance
  deleteVehicle: async (id) => {
    try {
      await axiosInstance.delete(`/vehicles/${id}/delete`);
      set((state) => ({
        vehicles: state.vehicles.filter((vehicle) => vehicle._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  },
}));
