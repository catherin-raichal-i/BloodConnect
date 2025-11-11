import React from 'react';
import { Clock, MapPin, Phone, AlertTriangle, Users } from 'lucide-react';

const RequestCard = ({ request, onContactClick }) => {
  const getUrgencyColor = (urgency) => {
    const colors = {
      Low: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-orange-100 text-orange-800',
      Critical: 'bg-red-100 text-red-800',
    };
    return colors[urgency] || 'bg-gray-100 text-gray-800';
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'O+': 'bg-red-100 text-red-800',
      'O-': 'bg-red-200 text-red-900',
      'A+': 'bg-blue-100 text-blue-800',
      'A-': 'bg-blue-200 text-blue-900',
      'B+': 'bg-green-100 text-green-800',
      'B-': 'bg-green-200 text-green-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900',
    };
    return colors[bloodGroup] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.patientName}</h3>
            <p className="text-sm text-gray-600">{request.hospital}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getBloodGroupColor(
                request.bloodGroup
              )}`}
            >
              {request.bloodGroup}
            </span>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                request.urgency
              )}`}
            >
              {request.urgency === 'Critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
              {request.urgency}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{request.city}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{request.contactNumber}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Users className="h-4 w-4 text-gray-400" />
            <span>
              {request.unitsNeeded} unit{request.unitsNeeded > 1 ? 's' : ''} needed
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>Requested on {formatDate(request.dateRequested)}</span>
          </div>
        </div>

        {/* Additional Notes */}
        {request.additionalNotes && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Notes:</span> {request.additionalNotes}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onContactClick && onContactClick(request)}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Contact for Donation
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
