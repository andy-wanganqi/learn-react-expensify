import { v4 as uuid } from 'uuid';

const expenses = [
  { id: uuid(), description: 'Gum', note: '5', amount: 195, createdAt: 0 },
  { id: uuid(), description: 'Rent', note: '1', amount: 109500, createdAt: 1000 },
  { id: uuid(), description: 'Credit Card', note: '2', amount: 4500, createdAt: 2000 },
  { id: uuid(), description: 'Power Bill', note: '3', amount: 30000, createdAt: 4000 },
  { id: uuid(), description: 'Water Bill', note: '4', amount: 20000, createdAt: 3000 },
];

export default expenses;
