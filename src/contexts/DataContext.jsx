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
    city: 'Chennai',
    phone: '+1-555-0101',
    email: 'john.smith@email.com',
    age: 28,
    lastDonation: '2025-01-15',
    available: true,
    hospital: 'IRED Hospital'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    bloodGroup: 'A+',
    city: 'Tharamani, Chennai.',
    phone: '+1-555-0102',
    email: 'sarah.j@email.com',
    age: 32,
    lastDonation: '2025-02-01',
    available: true,
    hospital: 'Billroth Hospitals'
  },
  {
    id: '3',
    name: 'Michael Brown',
    bloodGroup: 'B+',
    city: 'Egmore, Chennai.',
    phone: '+1-555-0103',
    email: 'mike.brown@email.com',
    age: 25,
    lastDonation: '2025-01-20',
    available: false,
    hospital: 'The Madras Medical Mission Hospital'
  },
  {
    id: '4',
    name: 'Emily Davis',
    bloodGroup: 'AB+',
    city: 'Velachery, Chennai',
    phone: '+1-555-0104',
    email: 'emily.davis@email.com',
    age: 29,
    lastDonation: '2025-02-05',
    available: true,
    hospital: 'Hindu Mission Hospital'
  },
  {
    id: '5',
    name: 'David Wilson',
    bloodGroup: 'O-',
    city: 'Siruseri, Chennai',
    phone: '+1-555-0105',
    email: 'david.w@email.com',
    age: 34,
    lastDonation: '2025-01-10',
    available: true,
    hospital: 'MGM Healthcare'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    bloodGroup: 'A-',
    city: 'Padur, Chennai',
    phone: '+1-555-0106',
    email: 'lisa.anderson@email.com',
    age: 27,
    lastDonation: '2025-01-25',
    available: true,
    hospital: 'Annai Arul Hospital'
  }
];

const sampleRequests = [
  {
    id: '1',
    patientName: 'Robert Martinez',
    bloodGroup: 'O+',
    city: 'Hosur',
    hospital: 'Emergency Medical Center',
    contactNumber: '+1-555-2001',
    urgency: 'Critical',
    unitsNeeded: 3,
    dateRequested: '2025-12-08',
    additionalNotes: 'Accident victim, immediate surgery required'
  },
  {
    id: '2',
    patientName: 'Maria Garcia',
    bloodGroup: 'A+',
    city: 'Chengalpattu, TamilNadu',
    hospital: 'Cedars Medical Center',
    contactNumber: '+1-555-2002',
    urgency: 'High',
    unitsNeeded: 2,
    dateRequested: '2025-12-07',
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
