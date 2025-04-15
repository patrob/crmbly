import { Customer } from "../types/customer";

// For demo purposes, we'll use a mock API
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    status: "active",
    phone: "555-0123",
    lastContact: new Date("2025-04-01"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    company: "TechStart",
    status: "lead",
    phone: "555-0124",
    lastContact: new Date("2025-04-10"),
  },
];

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    // Simulating API call
    return Promise.resolve(MOCK_CUSTOMERS);
  },

  getCustomer: async (id: string): Promise<Customer | undefined> => {
    return Promise.resolve(MOCK_CUSTOMERS.find((c) => c.id === id));
  },

  createCustomer: async (customer: Omit<Customer, "id">): Promise<Customer> => {
    const newCustomer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
    };
    MOCK_CUSTOMERS.push(newCustomer);
    return Promise.resolve(newCustomer);
  },

  updateCustomer: async (
    id: string,
    customer: Partial<Customer>
  ): Promise<Customer> => {
    const index = MOCK_CUSTOMERS.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Customer not found");

    MOCK_CUSTOMERS[index] = { ...MOCK_CUSTOMERS[index], ...customer };
    return Promise.resolve(MOCK_CUSTOMERS[index]);
  },

  deleteCustomer: async (id: string): Promise<void> => {
    const index = MOCK_CUSTOMERS.findIndex((c) => c.id === id);
    if (index !== -1) {
      MOCK_CUSTOMERS.splice(index, 1);
    }
    return Promise.resolve();
  },
};

