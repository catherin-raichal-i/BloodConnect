import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';

const BloodBanksPage = () => {
  const [searchCity, setSearchCity] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');

  const bloodBanks = [
    {
      id: '1',
      name: 'City General Blood Bank',
      address: '123 Medical Center Dr',
      city: 'New York',
      phone: '+1 (555) 123-4567',
      hours: '24/7',
      bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      rating: 4.8,
      distance: '0.5 miles',
      emergency: true
    },
    {
      id: '2',
      name: 'Metro Blood Services',
      address: '456 Health Plaza',
      city: 'Los Angeles',
      phone: '+1 (555) 234-5678',
      hours: '6:00 AM - 10:00 PM',
      bloodTypes: ['O+', 'A+', 'B+', 'AB+'],
      rating: 4.6,
      distance: '1.2 miles',
      emergency: false
    },
    {
      id: '3',
      name: 'Regional Blood Center',
      address: '789 Care Ave',
      city: 'Chicago',
      phone: '+1 (555) 345-6789',
      hours: '7:00 AM - 9:00 PM',
      bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-'],
      rating: 4.7,
      distance: '2.1 miles',
      emergency: true
    },
    {
      id: '4',
      name: 'Community Blood Bank',
      address: '321 Wellness St',
      city: 'Houston',
      phone: '+1 (555) 456-7890',
      hours: '8:00 AM - 6:00 PM',
      bloodTypes: ['O+', 'A+', 'B+'],
      rating: 4.4,
      distance: '3.5 miles',
      emergency: false
    },
    {
      id: '5',
      name: 'University Medical Blood Bank',
      address: '654 Campus Blvd',
      city: 'Phoenix',
      phone: '+1 (555) 567-8901',
      hours: '24/7',
      bloodTypes: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      rating: 4.9,
      distance: '1.8 miles',
      emergency: true
    },
    {
      id: '6',
      name: 'Central Blood Services',
      address: '987 Main Street',
      city: 'Philadelphia',
      phone: '+1 (555) 678-9012',
      hours: '6:00 AM - 8:00 PM',
      bloodTypes: ['O+', 'A+', 'B+', 'AB+', 'O-'],
      rating: 4.5,
      distance: '2.7 miles',
      emergency: false
    }
  ];

  const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const cities = [...new Set(bloodBanks.map(bank => bank.city))].sort();

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesCity = !searchCity || bank.city.toLowerCase().includes(searchCity.toLowerCase());
    const matchesBloodType = !selectedBloodType || bank.bloodTypes.includes(selectedBloodType);
    return matchesCity && matchesBloodType;
  });

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'O+': 'bg-red-100 text-red-800',
      'O-': 'bg-red-200 text-red-900',
      'A+': 'bg-blue-100 text-blue-800',
      'A-': 'bg-blue-200 text-blue-900',
      'B+': 'bg-green-100 text-green-800',
      'B-': 'bg-green-200 text-green-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900'
    };
    return colors[bloodType] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Banks Directory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find blood banks and donation centers near you. Get contact information, hours, and available blood types.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Search by City
              </label>
              <input
                type="text"
                id="city"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter city name..."
              />
            </div>

            <div>
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-2">
                Blood Type Available
              </label>
              <select
                id="bloodType"
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Blood Types</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchCity('');
                  setSelectedBloodType('');
                }}
                className="w-full cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBloodBanks.length} blood bank{filteredBloodBanks.length !== 1 ? 's' : ''}
            {searchCity && ` in ${searchCity}`}
            {selectedBloodType && ` with ${selectedBloodType} available`}
          </p>
        </div>

        {/* Blood Banks Grid */}
        {filteredBloodBanks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBloodBanks.map((bank) => (
              <div key={bank.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{bank.name}</h3>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(bank.rating)}
                        <span className="text-sm text-gray-600 ml-1">({bank.rating})</span>
                      </div>
                    </div>
                    {bank.emergency && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        24/7 Emergency
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <p>{bank.address}</p>
                        <p>{bank.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Navigation className="h-4 w-4 text-gray-400" />
                      <span>{bank.distance} away</span>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{bank.phone}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{bank.hours}</span>
                    </div>
                  </div>

                  {/* Available Blood Types */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Available Blood Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {bank.bloodTypes.map((type) => (
                        <span
                          key={type}
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getBloodTypeColor(type)}`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 cursor-pointer bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200">
                      Call Now
                    </button>
                    <button className="flex-1 cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Blood Banks Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria to find blood banks in your area.
              </p>
              <button
                onClick={() => {
                  setSearchCity('');
                  setSelectedBloodType('');
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Emergency Notice */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Blood Needs?</h3>
            <p className="text-red-700 mb-4">
              For critical emergencies, contact our 24/7 emergency helpline or visit the nearest hospital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-800-DONATE"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-center"
              >
                Call Emergency Line: 1-800-DONATE
              </a>
              <button className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200">
                Find Nearest Hospital
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBanksPage;
