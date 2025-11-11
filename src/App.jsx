import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import DonorsPage from './pages/DonorsPage';
import RequestBloodPage from './pages/RequestBloodPage';
import BecomeDonorPage from './pages/BecomeDonorPage';
import RequestsListPage from './pages/RequestsListPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import BloodBanksPage from './pages/BloodBanksPage';
import EducationPage from './pages/EducationPage';



import BlogSection from "./components/BlogSection";
import BlogDetails from "./components/BlogDetails";

import ScrollToTop from "./components/ScrollToTop";



function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex flex-col min-h-screen">


            <ScrollToTop /> {/* 👈 ensures top scroll on navigation */}


            <Navbar />

            <main className="grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />

                  {/* /blog */}
                  <Route path="/blog" element={<BlogSection />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />

                <Route path="/donors" element={<DonorsPage />} />
                <Route path="/requests" element={<RequestsListPage />} />
                <Route path="/blood-banks" element={<BloodBanksPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* Auth Routes */}
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <LoginPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <RegisterPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/request-blood"
                  element={
                    <ProtectedRoute>
                      <RequestBloodPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/become-donor"
                  element={
                    <ProtectedRoute>
                      <BecomeDonorPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>





            </main>

            <Footer />
          </div>
          <ToastContainer />
        </Router>
      </DataProvider>
    </AuthProvider>

  );
}

export default App;
