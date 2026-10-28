export interface BankAccount {
  id: string;
  name: string;
  subType: string;
  accountNumberMasked: string;
  accountNumberFull: string;
  routingNumber: string;
  balance: number;
  availableBalance: number;
  category: 'checking' | 'savings' | 'credit' | 'investment';
  status: 'Active' | 'Restricted' | 'Review Required';
  interestRate?: string;
  rewardsPoints?: number;
  creditLimit?: number;
}

export interface CustomerProfile {
  surname: string;
  middleName: string;
  lastName: string;
  fullName: string;
  preferredName: string;
  username: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  gender: string;
  occupation: string;
  avatarUrl: string;
  tier: string;
  memberSince: string;
  totalAvailableBalance: number;
  securityStatus: string;
  clientRelationshipManager: {
    name: string;
    office: string;
    phone: string;
    email: string;
  };
}

export const DEMO_CREDENTIALS = {
  username: 'Michaelbaumann10',
  passwords: ['Password123!', 'Baumann2026!', 'BankPass2026!'],
  displayPasswordHint: 'Password123!',
};

export const customerProfile: CustomerProfile = {
  surname: 'Baumann',
  middleName: 'Michael',
  lastName: 'Andreas',
  fullName: 'Michael Andreas Baumann',
  preferredName: 'Michael Baumann',
  username: 'Michaelbaumann10',
  email: 'michaelbaumann48@example.com',
  dateOfBirth: '15 October 1973',
  phone: '+1 (920) 254-9754',
  country: 'United States',
  state: 'California',
  city: 'San Diego',
  address: '3775 Sixth Ave, San Diego, CA 92103',
  postalCode: '92103',
  gender: 'Male',
  occupation: 'Petroleum Engineer',
  avatarUrl: '/images/profile-placeholder.jpg',
  tier: 'Preferred Rewards Platinum Honors',
  memberSince: 'March 2018',
  totalAvailableBalance: 8724000.0,
  securityStatus: 'Notice on file: Transfer capabilities paused',
  clientRelationshipManager: {
    name: 'Sarah Jennings, VP Senior Private Client Advisor',
    office: 'San Diego Private Wealth Branch #0412',
    phone: '+1 (888) 555-0199',
    email: 'privateclient.advisory@bankofamerica.com',
  },
};

export const bankAccounts: BankAccount[] = [
  {
    id: 'checking-3432',
    name: 'Business Adv Checking',
    subType: 'Bank of America Advantage Checking',
    accountNumberMasked: '...3432',
    accountNumberFull: '4830 2910 3432',
    routingNumber: '026009593',
    balance: 6224000.0,
    availableBalance: 6224000.0,
    category: 'checking',
    status: 'Active',
  },
  {
    id: 'savings-0193',
    name: 'Business Adv Savings',
    subType: 'Advantage High-Yield Growth Savings',
    accountNumberMasked: '...0193',
    accountNumberFull: '8839 1045 0193',
    routingNumber: '026009593',
    balance: 2500000.0,
    availableBalance: 2500000.0,
    category: 'savings',
    interestRate: '4.85% APY',
    status: 'Active',
  },
  {
    id: 'credit-9832',
    name: 'CORP Account - Business Advantage Cash Rewards',
    subType: 'World Elite Mastercard',
    accountNumberMasked: '...9832',
    accountNumberFull: '4532 9012 3418 9832',
    routingNumber: 'N/A',
    balance: 982.53,
    availableBalance: 99017.47,
    category: 'credit',
    creditLimit: 100000.0,
    rewardsPoints: 48920,
    status: 'Active',
  },
  {
    id: 'merrill-5102',
    name: 'Merrill Lynch Wealth Management',
    subType: 'Platinum Honors Institutional Portfolio',
    accountNumberMasked: '...5102',
    accountNumberFull: '6741 0923 5102',
    routingNumber: 'N/A',
    balance: 3450890.0,
    availableBalance: 3450890.0,
    category: 'investment',
    status: 'Active',
  },
];
