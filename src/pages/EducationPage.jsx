import React, { useState } from 'react';
import { BookOpen, Heart, Users, Shield, AlertTriangle, CheckCircle, Info, Play } from 'lucide-react';

const EducationPage = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const tabs = [
    { id: 'basics', label: 'Donation Basics', icon: Heart },
    { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
    { id: 'process', label: 'Donation Process', icon: Users },
    { id: 'safety', label: 'Safety & Health', icon: Shield },
    { id: 'myths', label: 'Myths & Facts', icon: Info }
  ];

  const donationBasics = [
    {
      title: 'What is Blood Donation?',
      content: 'Blood donation is a voluntary procedure where you give blood that can be used to help save lives. Your donated blood is tested, processed, and stored until it is needed for transfusions.',
      icon: Heart
    },
    {
      title: 'Types of Blood Donations',
      content: 'Whole blood donation is the most common type, but you can also donate specific components like platelets, plasma, or red blood cells through apheresis.',
      icon: Users
    },
    {
      title: 'How Often Can You Donate?',
      content: 'You can donate whole blood every 56 days (8 weeks). Platelet donors can give every 7 days, up to 24 times per year.',
      icon: AlertTriangle
    }
  ];

  const eligibilityRequirements = [
    { requirement: 'Age: 17-65 years old (16 with parental consent in some states)', eligible: true },
    { requirement: 'Weight: At least 110 pounds (50 kg)', eligible: true },
    { requirement: 'Good general health and feeling well', eligible: true },
    { requirement: 'No recent tattoos or piercings (varies by location)', eligible: true },
    { requirement: 'Not pregnant or breastfeeding', eligible: true },
    { requirement: 'No recent travel to certain countries', eligible: true },
    { requirement: 'No history of certain medical conditions', eligible: true },
    { requirement: 'Not taking certain medications', eligible: true }
  ];

  const donationProcess = [
    {
      step: 1,
      title: 'Registration & Health History',
      description: 'Complete registration forms and answer health history questions.',
      duration: '10-15 minutes'
    },
    {
      step: 2,
      title: 'Mini Physical & Blood Test',
      description: 'Check vital signs, hemoglobin levels, and overall health.',
      duration: '5-10 minutes'
    },
    {
      step: 3,
      title: 'Blood Donation',
      description: 'The actual blood collection process.',
      duration: '8-12 minutes'
    },
    {
      step: 4,
      title: 'Rest & Refreshments',
      description: 'Relax and have snacks to help your body recover.',
      duration: '10-15 minutes'
    }
  ];

  const mythsAndFacts = [
    {
      myth: 'Blood donation is painful and dangerous',
      fact: 'Blood donation is safe and relatively painless. You might feel a brief pinch when the needle is inserted.',
      category: 'Safety'
    },
    {
      myth: 'Donating blood will make me weak or sick',
      fact: 'Your body quickly replaces the donated blood. Most people feel fine after donating and can resume normal activities.',
      category: 'Health'
    },
    {
      myth: 'I can get diseases from donating blood',
      fact: 'All equipment is sterile and used only once. There is no risk of contracting diseases from donating blood.',
      category: 'Safety'
    },
    {
      myth: 'My blood type is too common to be needed',
      fact: 'All blood types are needed. Common types like O+ are in high demand because they are used most frequently.',
      category: 'Need'
    },
    {
      myth: 'I need to fast before donating',
      fact: 'You should eat a healthy meal before donating. Avoid fatty foods and stay well-hydrated.',
      category: 'Preparation'
    }
  ];

  const safetyTips = [
    {
      title: 'Before Donation',
      tips: [
        'Eat a healthy meal 3 hours before donating',
        'Drink plenty of water',
        "Get a good night's sleep",
        'Avoid alcohol for 24 hours before',
        'Bring a valid ID'
      ]
    },
    {
      title: 'During Donation',
      tips: [
        'Relax and breathe normally',
        'Let staff know if you feel unwell',
        'Keep your arm straight',
        'Squeeze the stress ball as directed'
      ]
    },
    {
      title: 'After Donation',
      tips: [
        'Rest for 10-15 minutes',
        'Drink extra fluids for 24 hours',
        'Avoid heavy lifting for 24 hours',
        'Keep the bandage on for 4-6 hours',
        'Contact the center if you have concerns'
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basics':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {donationBasics.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Play className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Watch: Blood Donation Overview</h3>
              </div>
              <p className="text-blue-700 mb-4">
                Learn about the blood donation process in this informative video that covers everything from eligibility to recovery.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Watch Video
              </button>
            </div>
          </div>
        );

      case 'eligibility':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Eligibility Requirements</h3>
              <div className="space-y-3">
                {eligibilityRequirements.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">{item.requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-900">Important Notes</h3>
              </div>
              <ul className="text-yellow-800 space-y-2">
                <li>• Requirements may vary by location and blood center</li>
                <li>• Some medications may temporarily defer donation</li>
                <li>• Recent travel to certain areas may affect eligibility</li>
                <li>• When in doubt, contact your local blood center</li>
              </ul>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Step-by-Step Donation Process</h3>
              <div className="space-y-6">
                {donationProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <span className="text-sm text-blue-600 font-medium">Duration: {step.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Total Time: 45-60 minutes</h3>
              <p className="text-green-800">
                The entire process typically takes about an hour, with the actual blood collection taking only 8-12 minutes.
                Most of your time is spent on paperwork, health screening, and recovery.
              </p>
            </div>
          </div>
        );

      case 'safety':
        return (
          <div className="space-y-6">
            {safetyTips.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'myths':
        return (
          <div className="space-y-4">
            {mythsAndFacts.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 px-3 py-1 rounded-full">
                    <span className="text-red-800 text-sm font-medium">{item.category}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-red-600 mb-2">❌ Myth: {item.myth}</h4>
                  <p className="text-green-700">✅ <strong>Fact:</strong> {item.fact}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Donation Education</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn everything you need to know about blood donation, from eligibility requirements to the donation process.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {renderTabContent()}
        </div>

        {/* Call to Action */}
        <div className="bg-red-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Now that you know about blood donation, take the next step and find donation opportunities near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/become-donor"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Become a Donor
            </a>
            <a
              href="/blood-banks"
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-400 transition-colors border-2 border-red-400"
            >
              Find Blood Banks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
