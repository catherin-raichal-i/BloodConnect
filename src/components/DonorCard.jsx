import React from 'react';
import { Phone, Mail, MapPin, Calendar, Heart } from 'lucide-react';

const DonorCard = ({ donor, onContactClick }) => {
  const getBloodGroupColor = (bloodGroup) => {
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
    return colors[bloodGroup] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
              <p className="text-sm text-gray-600">Age {donor.age}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getBloodGroupColor(donor.bloodGroup)}`}>
              {donor.bloodGroup}
            </span>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              donor.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {donor.available ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{donor.city}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{donor.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{donor.email}</span>
          </div>
          {donor.hospital && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="h-4 w-4 bg-blue-500 rounded-full shrink-0" />
              <span>{donor.hospital}</span>
            </div>
          )}
        </div>

        {/* Last Donation */}
        <div className="flex items-center space-x-3 text-sm text-gray-600 mb-4">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Last donation: {formatDate(donor.lastDonation)}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onContactClick && onContactClick(donor)}
          disabled={!donor.available}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
            donor.available
              ? 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {donor.available ? 'Contact Donor' : 'Currently Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default DonorCard;
