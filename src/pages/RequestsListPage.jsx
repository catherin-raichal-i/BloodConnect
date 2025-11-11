import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import RequestCard from '../components/RequestCard';
import { toast } from 'react-toastify';
import { AlertTriangle, TrendingUp, Clock, Users } from 'lucide-react';

const RequestsListPage = () => {
  const { requests } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');

  // Get unique cities for filter dropdown
  const cities = useMemo(() => {
    return [...new Set(requests.map(request => request.city))].sort();
  }, [requests]);

  // Filter requests based on search criteria
  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodGroup = !bloodGroupFilter || request.bloodGroup === bloodGroupFilter;
      const matchesCity = !cityFilter || request.city === cityFilter;
      const matchesUrgency = !urgencyFilter || request.urgency === urgencyFilter;

      return matchesSearch && matchesBloodGroup && matchesCity && matchesUrgency;
    });
  }, [requests, searchTerm, bloodGroupFilter, cityFilter, urgencyFilter]);

  // Sort requests by urgency and date
  const sortedRequests = useMemo(() => {
    return [...filteredRequests].sort((a, b) => {
      const urgencyOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
      const urgencyDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      
      if (urgencyDiff !== 0) return urgencyDiff;
      
      // If same urgency, sort by date (newest first)
      return new Date(b.dateRequested).getTime() - new Date(a.dateRequested).getTime();
    });
  }, [filteredRequests]);

  const handleContactForDonation = (request) => {
    toast.success(
      `Contact ${request.patientName} at ${request.contactNumber} for blood donation. Hospital: ${request.hospital}`,
      {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const getUrgencyStats = () => {
    return {
      Critical: requests.filter(r => r.urgency === 'Critical').length,
      High: requests.filter(r => r.urgency === 'High').length,
      Medium: requests.filter(r => r.urgency === 'Medium').length,
      Low: requests.filter(r => r.urgency === 'Low').length
    };
  };

  const urgencyStats = getUrgencyStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Requests</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help save lives by responding to blood donation requests in your area. Every donation matters.
          </p>
        </div>

        {/* Urgency Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{urgencyStats.Critical}</div>
            <div className="text-sm text-gray-600">Critical</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{urgencyStats.High}</div>
            <div className="text-sm text-gray-600">High</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{urgencyStats.Medium}</div>
            <div className="text-sm text-gray-600">Medium</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{urgencyStats.Low}</div>
            <div className="text-sm text-gray-600">Low</div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by patient, hospital, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Blood Group Filter */}
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Blood Groups</option>
              {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>

            {/* City Filter */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Urgency Filter */}
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Urgency Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSearchTerm('');
                setBloodGroupFilter('');
                setCityFilter('');
                setUrgencyFilter('');
              }}
              className="bg-gray-100 cursor-pointer text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedRequests.length} of {requests.length} blood requests
            {urgencyFilter && ` (${urgencyFilter} urgency)`}
            {bloodGroupFilter && ` (${bloodGroupFilter} blood type)`}
            {cityFilter && ` (in ${cityFilter})`}
          </p>
        </div>

        {/* Request Cards Grid */}
        {sortedRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onContactClick={handleContactForDonation}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <AlertTriangle className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Blood Requests Found</h3>
              <p className="text-gray-600 mb-4">
                {requests.length === 0 
                  ? "There are currently no blood requests in the system."
                  : "Try adjusting your search criteria or filters to find more requests."
                }
              </p>
              {requests.length > 0 && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setBloodGroupFilter('');
                    setCityFilter('');
                    setUrgencyFilter('');
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {sortedRequests.length > 0 && (
          <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Save a Life?</h3>
            <p className="text-gray-600 mb-4">
              If you match any of these blood requests and are eligible to donate, please contact the requesters directly.
            </p>
            <div className="text-sm text-gray-500">
              <p>Remember: You can donate whole blood every 56 days and must be in good health.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsListPage;
