export type Customer = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
};

const STORAGE_KEY = "toora_customers";

export function loadCustomers(): Customer[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as Customer[];
  } catch {
    return [];
  }
}

export function saveCustomer(customer: Customer) {
  const customers = loadCustomers();
  customers.unshift(customer);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export function updateCustomer(updatedCustomer: Customer) {
  const customers = loadCustomers().map((customer) =>
    customer.id === updatedCustomer.id ? updatedCustomer : customer
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export function deleteCustomer(id: string) {
  const customers = loadCustomers().filter((customer) => customer.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export function generateCustomerId() {
  const customers = loadCustomers();
  const id = customers.length + 1;

  return "KH" + id.toString().padStart(5, "0");
}