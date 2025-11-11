import React from 'react';
import { Heart, Users, Shield, Phone, Mail, MapPin, Award, Clock, Droplets } from 'lucide-react';

const AboutPage = () => {
    const features = [
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Connecting donors and recipients in local communities to ensure quick response times and better outcomes.'
        },
        {
            icon: Shield,
            title: 'Safe & Secure',
            description: 'All donor information is verified and handled with the highest standards of privacy and security.'
        },
        {
            icon: Clock,
            title: '24/7 Availability',
            description: 'Our platform is available round the clock for emergency blood requests and donor connections.'
        },
        {
            icon: Award,
            title: 'Trusted Platform',
            description: 'Working with hospitals, blood banks, and medical institutions to maintain quality and reliability.'
        }
    ];

    const bloodFacts = [
        {
            icon: Droplets,
            stat: '4.5M',
            label: 'Americans need blood transfusions each year'
        },
        {
            icon: Heart,
            stat: '3',
            label: 'Lives can be saved with one donation'
        },
        {
            icon: Clock,
            stat: '2 seconds',
            label: 'Someone needs blood every 2 seconds'
        },
        {
            icon: Users,
            stat: '38%',
            label: 'Of population is eligible to donate'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-red-600 to-red-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="h-10 w-10 text-red-500 fill-current" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About BloodConnect</h1>
                        <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
                            Bridging the gap between those who need blood and those who can give.
                            Together, we're building a community that saves lives.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            BloodConnect exists to create a seamless, efficient, and life-saving network between blood donors
                            and recipients. We believe that no one should suffer due to blood shortage when there are willing
                            donors in the community ready to help.
                        </p>
                        <div className="bg-red-50 border-l-4 border-red-400 p-6 text-left">
                            <p className="text-red-700 font-medium">
                                "Our vision is a world where every blood request is met with compassion, speed, and reliability.
                                Through technology and community spirit, we're making this vision a reality, one donation at a time."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BloodConnect?</h2>
                        <p className="text-xl text-gray-600">We're committed to making blood donation easier, safer, and more effective</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="h-8 w-8 text-red-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Blood Facts Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Blood Donation Facts</h2>
                        <p className="text-xl text-gray-600">Understanding the importance of blood donation</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bloodFacts.map((fact, index) => {
                            const IconComponent = fact.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="text-3xl font-bold text-red-600 mb-2">{fact.stat}</div>
                                    <p className="text-gray-600">{fact.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How BloodConnect Works</h2>
                        <p className="text-xl text-gray-600">Simple steps to save lives</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Register</h3>
                            <p className="text-gray-600">
                                Donors register with their blood type, location, and contact information.
                                Recipients can request blood for patients in need.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect</h3>
                            <p className="text-gray-600">
                                Our platform matches donors with requests based on blood type, location,
                                and urgency, facilitating quick connections.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-red-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Save Lives</h3>
                            <p className="text-gray-600">
                                Donors and recipients coordinate directly to arrange donations at
                                nearby hospitals or blood banks, saving precious lives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-red-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                        <p className="text-xl text-red-100">We're here to help you save lives. Reach out to us anytime.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Emergency Helpline</h3>
                            <p className="text-red-100 mb-2">For urgent blood requests</p>
                            <p className="text-white font-semibold text-lg">1-800-DONATE</p>
                            <p className="text-red-100 text-sm">(Available 24/7)</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                            <p className="text-red-100 mb-2">For general inquiries</p>
                            <p className="text-white font-semibold">info@bloodconnect.org</p>
                            <p className="text-red-100 text-sm">Response within 24 hours</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Main Office</h3>
                            <p className="text-red-100 mb-2">Visit us at</p>
                            <p className="text-white font-semibold">123 Health Avenue</p>
                            <p className="text-red-100 text-sm">Medical District, City 12345</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of donors and recipients who are already part of our life-saving community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/become-donor"
                            className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-lg"
                        >
                            Become a Donor
                        </a>
                        <a
                            href="/request-blood"
                            className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                            Request Blood
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
