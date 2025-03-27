import { http } from 'msw';
import { setupWorker } from 'msw/browser';
import { CustomerDetail } from './types';

// Mock database
let customers: CustomerDetail[] = [
  {
    name: {
      firstName: 'John',
      middleName: 'Edward',
      lastName: 'Doe',
    },
    dateOfBirth: '1985-07-15',
    contactDetails: [
      {
        type: 'Email',
        value: 'john.doe@example.com',
      },
      {
        type: 'Phone',
        value: '+1 555-123-4567',
      },
    ],
    address: {
      addressLine1: '123 Cosmic Avenue',
      addressLine2: 'Apt 42',
      city: 'Starlight City',
      state: 'Nebula',
      country: 'United States',
      zipCode: '12345',
    },
    identityProofs: [
      {
        type: 'Passport',
        value: 'P123456789',
        issuedDate: '2018-03-20',
        expiryDate: '2028-03-19',
      },
    ],
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    dateOfBirth: '1990-11-22',
    contactDetails: [
      {
        type: 'Email',
        value: 'jane.smith@example.com',
      },
    ],
    address: {
      addressLine1: '456 Galaxy Road',
      city: 'Moonlight',
      state: 'Nova',
      country: 'Canada',
      zipCode: 'M5V 2L7',
    },
    identityProofs: [
      {
        type: 'Driver License',
        value: 'DL987654321',
        issuedDate: '2019-05-15',
        expiryDate: '2024-05-14',
      },
    ],
  },
];

// Define handlers
const handlers = [
  // GET all customers
  http.get('/api/customer', () => {
    return new Response(
      JSON.stringify(customers),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }),
  
  // GET customer by ID
  http.get('/api/customer/:id', ({ params }) => {
    const { id } = params;
    const customerId = parseInt(id as string, 10);
    
    if (isNaN(customerId) || customerId < 0 || customerId >= customers.length) {
      return new Response(
        JSON.stringify({ message: 'Customer not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify(customers[customerId]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }),
  // POST new customer
  http.post('/api/customer', async ({ request }: { request: Request }) => {
    try {
      const newCustomer = await request.json() as CustomerDetail;
      
      // Validate required fields
      if (!newCustomer.name?.firstName || 
          !newCustomer.name?.lastName || 
          !newCustomer.dateOfBirth) {
        return new Response(
          JSON.stringify({ message: 'Missing required fields' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Add the new customer and return with ID
      customers.push(newCustomer);
      const id = customers.length - 1;
      
      return new Response(
        JSON.stringify({ 
          message: 'Customer created successfully',
          id 
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Invalid customer data format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }),
];

// Create the worker
const worker = setupWorker(...handlers);

// Export a function to start the worker
export const startMockWorker = () => {
  worker.start({
    onUnhandledRequest: 'bypass', // Don't warn about unhandled requests (useful for static assets)
  });
  
  console.log('[MSW] Mock API server running');
};
