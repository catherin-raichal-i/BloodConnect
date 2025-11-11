import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import DonorCard from '../components/DonorCard';
import SearchFilters from '../components/SearchFilters';
import { toast } from 'react-toastify';

const DonorsPage = () => {
  const { donors } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  // Get unique cities for filter dropdown
  const cities = useMemo(() => {
    return [...new Set(donors.map(donor => donor.city))].sort();
  }, [donors]);

  // Filter donors based on search criteria
  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const matchesSearch =
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodGroup = !bloodGroupFilter || donor.bloodGroup === bloodGroupFilter;
      const matchesCity = !cityFilter || donor.city === cityFilter;
      const matchesAvailability = !availableOnly || donor.available;

      return matchesSearch && matchesBloodGroup && matchesCity && matchesAvailability;
    });
  }, [donors, searchTerm, bloodGroupFilter, cityFilter, availableOnly]);

  const handleContactDonor = (donor) => {
    toast.success(
      `Contact information for ${donor.name} is available. Call ${donor.phone} or email ${donor.email}`,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Blood Donors</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search our database of registered blood donors to find the help you need in your area.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          bloodGroupFilter={bloodGroupFilter}
          setBloodGroupFilter={setBloodGroupFilter}
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
          cities={cities}
          placeholder="Search by donor name or city..."
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDonors.length} of {donors.length} donors
            {availableOnly && ' (available only)'}
            {bloodGroupFilter && ` with ${bloodGroupFilter} blood type`}
            {cityFilter && ` in ${cityFilter}`}
          </p>
        </div>

        {/* Donor Cards Grid */}
        {filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} onContactClick={handleContactDonor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Donors Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more donors.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setBloodGroupFilter('');
                  setCityFilter('');
                  setAvailableOnly(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{donors.length}</div>
              <div className="text-sm text-gray-600">Total Donors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{donors.filter((d) => d.available).length}</div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{cities.length}</div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {new Set(donors.map((d) => d.bloodGroup)).size}
              </div>
              <div className="text-sm text-gray-600">Blood Types</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorsPage;
