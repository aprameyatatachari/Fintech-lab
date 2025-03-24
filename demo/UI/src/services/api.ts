import { CustomerData } from '../App';

/**
 * Submit customer data to the server
 * This is a mock implementation that simulates an API call
 * In a real application, this would make an actual HTTP request
 */
export const submitCustomerData = async (data: CustomerData): Promise<{ success: boolean }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Log the data that would be sent to the server
  console.log('Submitting data to /api/customer-details:', data);
  
  // Simulate a successful response
  // In a real application, you would handle errors appropriately
  return { success: true };
};