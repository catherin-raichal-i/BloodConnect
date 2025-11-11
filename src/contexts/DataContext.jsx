import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

const STORAGE_KEYS = {
  DONORS: 'bloodDonation_donors',
  REQUESTS: 'bloodDonation_requests'
};

// Sample data
const sampleDonors = [
  {
    id: '1',
    name: 'John Smith',
    bloodGroup: 'O+',
    city: 'New York',
    phone: '+1-555-0101',
    email: 'john.smith@email.com',
    age: 28,
    lastDonation: '2024-01-15',
    available: true,
    hospital: 'City General Hospital'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    bloodGroup: 'A+',
    city: 'Los Angeles',
    phone: '+1-555-0102',
    email: 'sarah.j@email.com',
    age: 32,
    lastDonation: '2024-02-01',
    available: true,
    hospital: 'Metro Medical Center'
  },
  {
    id: '3',
    name: 'Michael Brown',
    bloodGroup: 'B+',
    city: 'Chicago',
    phone: '+1-555-0103',
    email: 'mike.brown@email.com',
    age: 25,
    lastDonation: '2024-01-20',
    available: false,
    hospital: 'North Side Hospital'
  },
  {
    id: '4',
    name: 'Emily Davis',
    bloodGroup: 'AB+',
    city: 'Houston',
    phone: '+1-555-0104',
    email: 'emily.davis@email.com',
    age: 29,
    lastDonation: '2024-02-05',
    available: true,
    hospital: 'Memorial Hospital'
  },
  {
    id: '5',
    name: 'David Wilson',
    bloodGroup: 'O-',
    city: 'Phoenix',
    phone: '+1-555-0105',
    email: 'david.w@email.com',
    age: 34,
    lastDonation: '2024-01-10',
    available: true,
    hospital: 'Desert Medical Center'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    bloodGroup: 'A-',
    city: 'Philadelphia',
    phone: '+1-555-0106',
    email: 'lisa.anderson@email.com',
    age: 27,
    lastDonation: '2024-01-25',
    available: true,
    hospital: 'University Hospital'
  }
];

const sampleRequests = [
  {
    id: '1',
    patientName: 'Robert Martinez',
    bloodGroup: 'O+',
    city: 'New York',
    hospital: 'Emergency Medical Center',
    contactNumber: '+1-555-2001',
    urgency: 'Critical',
    unitsNeeded: 3,
    dateRequested: '2024-12-08',
    additionalNotes: 'Accident victim, immediate surgery required'
  },
  {
    id: '2',
    patientName: 'Maria Garcia',
    bloodGroup: 'A+',
    city: 'Los Angeles',
    hospital: 'Cedars Medical Center',
    contactNumber: '+1-555-2002',
    urgency: 'High',
    unitsNeeded: 2,
    dateRequested: '2024-12-07',
    additionalNotes: 'Scheduled surgery tomorrow'
  }
];

export function DataProvider({ children }) {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedDonors = localStorage.getItem(STORAGE_KEYS.DONORS);
    const storedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);

    if (storedDonors) {
      setDonors(JSON.parse(storedDonors));
    } else {
      setDonors(sampleDonors);
      localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(sampleDonors));
    }

    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    } else {
      setRequests(sampleRequests);
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(sampleRequests));
    }
  }, []);

  // Save donors to localStorage on change
  useEffect(() => {
    if (donors.length > 0) {
      localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
    }
  }, [donors]);

  // Save requests to localStorage on change
  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    }
  }, [requests]);

  const addDonor = (donorData) => {
    const newDonor = {
      ...donorData,
      id: Date.now().toString()
    };
    setDonors(prev => [...prev, newDonor]);
  };

  const addRequest = (requestData) => {
    const newRequest = {
      ...requestData,
      id: Date.now().toString(),
      dateRequested: new Date().toISOString().split('T')[0]
    };
    setRequests(prev => [...prev, newRequest]);
  };

  const updateDonorAvailability = (donorId, available) => {
    setDonors(prev =>
      prev.map(donor =>
        donor.id === donorId ? { ...donor, available } : donor
      )
    );
  };

  const getStatistics = () => {
    const totalDonors = donors.length;
    const availableDonors = donors.filter(d => d.available).length;
    const totalRequests = requests.length;
    const today = new Date().toISOString().split('T')[0];
    const recentRequests = requests.filter(r => r.dateRequested === today).length;

    return {
      totalDonors,
      availableDonors,
      totalRequests,
      recentRequests
    };
  };

  const value = {
    donors,
    requests,
    addDonor,
    addRequest,
    updateDonorAvailability,
    getStatistics
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
