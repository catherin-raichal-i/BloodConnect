import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, MapPin, Phone, Mail, CreditCard as Edit3, Activity, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { donors, requests, getStatistics } = useData();
  const [stats, setStats] = useState({
    totalDonors: 0,
    availableDonors: 0,
    totalRequests: 0,
    recentRequests: 0
  });

  useEffect(() => {
    setStats(getStatistics());
  }, [getStatistics]);

  const userDonations = user?.role === 'donor' ? 
    donors.filter(d => d.email === user.email) : [];
  
  const userRequests = user?.role === 'recipient' ? 
    requests.filter(r => r.contactNumber === user.phone) : [];

  const recentActivity = [
    { id: 1, type: 'donation', message: 'New donor registered in your area', time: '2 hours ago' },
    { id: 2, type: 'request', message: 'Urgent blood request for O+ in New York', time: '4 hours ago' },
    { id: 3, type: 'match', message: 'Donor matched with recipient', time: '6 hours ago' },
    { id: 4, type: 'donation', message: 'Blood donation completed successfully', time: '1 day ago' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'donation':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'request':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'match':
        return <Users className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'admin' 
              ? 'Manage the BloodConnect platform and monitor activities'
              : user?.role === 'donor'
              ? 'Thank you for being a life-saver in our community'
              : 'Find the blood donors you need in your area'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Now</p>
                <p className="text-2xl font-bold text-gray-900">{stats.availableDonors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.recentRequests}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Profile</h2>
                <Link
                  to="/profile"
                  className="text-red-600 hover:text-red-700"
                >
                  <Edit3 className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Heart className="h-4 w-4 text-white fill-current" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  
                  {user?.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  
                  {user?.city && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{user.city}</span>
                    </div>
                  )}
                  
                  {user?.bloodGroup && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span>Blood Group: {user.bloodGroup}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    Member since {new Date(user?.createdAt || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/donors"
                  className="block w-full bg-red-600 text-white text-center py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Find Donors
                </Link>
                <Link
                  to="/request-blood"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Request Blood
                </Link>
                {user?.role === 'donor' && (
                  <Link
                    to="/become-donor"
                    className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Update Donor Info
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User-specific content */}
            {user?.role === 'donor' && userDonations.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Donor Profile</h3>
                {userDonations.map((donation) => (
                  <div key={donation.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Blood Group: {donation.bloodGroup}</p>
                        <p className="text-sm text-gray-600">Last donation: {donation.lastDonation}</p>
                        <p className="text-sm text-gray-600">Location: {donation.city}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        donation.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {donation.available ? 'Available' : 'Not Available'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {user?.role === 'recipient' && userRequests.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Blood Requests</h3>
                <div className="space-y-4">
                  {userRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{request.patientName}</p>
                          <p className="text-sm text-gray-600">Blood Group: {request.bloodGroup}</p>
                          <p className="text-sm text-gray-600">Hospital: {request.hospital}</p>
                          <p className="text-sm text-gray-600">Units needed: {request.unitsNeeded}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          request.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                          request.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                          request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.urgency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900">Emergency Blood Request</h3>
                  <p className="text-red-700">
                    For critical emergencies, call our 24/7 helpline: 
                    <span className="font-bold ml-1">1-800-DONATE</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
