import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Plus, Users, Clock, TrendingUp, Shield, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';

import Blogs_1 from '../assets/Blogs_1.jpg';
import Blogs_2 from '../assets/Blogs_2.webp';
import Blogs_3 from '../assets/Blogs_3.avif';
import Blogs_4 from '../assets/Blogs_4.jpg';
import Blogs_5 from '../assets/Blogs_5.webp';
import Blogs_6 from '../assets/Blogs_6.jpg';

import hero1 from '../assets/blog_1.jpg';
import hero2 from '../assets/blog_2.webp';
import hero3 from '../assets/blog_3.jpg';
import hero4 from '../assets/Blogs_1.jpg';
import hero5 from '../assets/Blogs_5.webp';




function HomePage() {
  // hero images
  const heroImages = [hero1, hero2, hero3, hero4, hero5];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(nextSlide, 7000); // every 7s
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  // Statistics
  const { getStatistics } = useData();

  const [stats, setStats] = useState({
    totalDonors: 0,
    availableDonors: 0,
    totalRequests: 0,
    recentRequests: 0
  });

  const [animatedStats, setAnimatedStats] = useState({
    totalDonors: 0,
    availableDonors: 0,
    totalRequests: 0,
    recentRequests: 0
  });

  useEffect(() => {
    const statistics = getStatistics();
    setStats(statistics);

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        totalDonors: Math.floor(statistics.totalDonors * progress),
        availableDonors: Math.floor(statistics.availableDonors * progress),
        totalRequests: Math.floor(statistics.totalRequests * progress),
        recentRequests: Math.floor(statistics.recentRequests * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(statistics);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [getStatistics]);

  const features = [
    {
      icon: Search,
      title: 'Find Donors',
      description: 'Search for blood donors by blood group, location, and availability',
      link: '/donors',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Plus,
      title: 'Request Blood',
      description: 'Submit urgent blood requests for patients in need',
      link: '/request-blood',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Heart,
      title: 'Become a Donor',
      description: 'Register as a blood donor and save lives in your community',
      link: '/become-donor',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Emily Rivera',
      role: 'Blood Recipient',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 5,
      message: `After a major car accident, I needed multiple units of blood to survive - it was one of the scariest moments of my 
      life. I wouldn't be here today without the kindness of anonymous donors who stepped up when I needed it most.
       Blood donation isn't just a generous act; it's truly life-saving. I've seen firsthand how a single pint can mean the 
       difference between life and death. I urge everyone to consider donating - you never know whose life you might 
       save. To those who donate regularly, thank you for giving families like mine a second chance.`,
    },
    {
      name: 'David Kim',
      role: 'Regular Donor',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4,
      message: `I started donating blood in college, and what began as a one-time gesture quickly became a part of my routine. 
      Each time I donate, I'm reminded that I'm helping someone I may never meet — and that's a powerful feeling. The 
      process is quick, safe, and incredibly fulfilling. The staff always makes me feel comfortable, and the post-donation 
      snacks are a nice bonus. More people need to realize how easy it is to make a lasting impact. I encourage everyone 
      to try it once - it might just become a lifelong habit like it did for me.`,
    },
    {
      name: 'Aisha Thompson',
      role: 'Nurse & Volunteer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      message: `Working in the ER, I've witnessed countless emergencies where every second counts - and often, blood is the 
      deciding factor. I can't emphasize enough how vital donors are in these critical moments. They're unsung heroes,
       often unseen, yet their impact is enormous. Through this platform, connecting donors with hospitals and patients 
       has become more efficient than ever. It's been a game-changer for both medical staff and patients alike. I
        encourage everyone to see blood donation not just as a medical act, but as a humanitarian one.`,
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  // FAQ
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // scroll to top
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };




  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500ms ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            Save Lives Through <span className="text-red-500">Blood Donation</span>
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-gray-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Connect with donors and recipients — every donation can save up to three lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donors"
              className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-50 transition shadow-lg"
            >
              Find Donors
            </Link>
            <Link
              to="/request-blood"
              className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-500 transition shadow-lg"
            >
              Request Blood
            </Link>
          </div>
        </div>

        <button
          onClick={() => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
          }}
          className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full transition z-20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
          }}
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full transition z-20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                stopAutoSlide();
                setCurrentSlide(index);
                startAutoSlide();
              }}
              className={`w-3 h-3 cursor-pointer rounded-full transition-all ${currentSlide === index
                ? "bg-red-500 scale-125"
                : "bg-white bg-opacity-70"
                }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in our community, one donation at a time</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.totalDonors}</h3>
              <p className="text-gray-600">Registered Donors</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600 fill-current" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.availableDonors}</h3>
              <p className="text-gray-600">Available Now</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.totalRequests}</h3>
              <p className="text-gray-600">Total Requests</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.recentRequests}</h3>
              <p className="text-gray-600">Today's Requests</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Help</h2>
            <p className="text-xl text-gray-600">Simple steps to connect donors with those in need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (

                <Link
                  key={index}
                  to={feature.link}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center group"
                >
                  <div className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <span className={`${feature.color} font-semibold group-hover:underline`}>
                    Get Started →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Blood Donation Matters</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Every 2 seconds, someone in the United States needs blood. One donation can save up to three lives.
              Join our community of heroes making a difference every day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">1 in 7</h3>
                <p className="text-gray-700">people entering hospitals need blood</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">3 Lives</h3>
                <p className="text-gray-700">can be saved with one donation</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">30 Minutes</h3>
                <p className="text-gray-700">is all it takes to donate</p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/become-donor"
                className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-lg"
              >
                Start Saving Lives Today
              </Link>


            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Blood Donation Works</h2>
            <p className="text-xl text-gray-600">A quick and easy process designed with your safety in mind</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { step: '1', title: 'Register', description: 'Provide your details and health history.' },
              { step: '2', title: 'Screening', description: 'Quick checkup to ensure eligibility.' },
              { step: '3', title: 'Donate', description: 'The process only takes about 10 minutes.' },
              { step: '4', title: 'Recover', description: 'Enjoy refreshments and rest after donating.' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:bg-red-100 transition duration-300"
              >
                <div className="text-4xl font-bold text-red-600 mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-red-500 mb-2">{item.title}</h3>
                <p className="text-zinc-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-lg text-gray-600">Insights, awareness, and stories from the world of blood donation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "The Lifesaving Power of a Single Donation",
                image: Blogs_1,
                excerpt: `One single blood donation can save up to three lives.
From the donor chair to the recipient's bedside - the journey is profound.
Every unit counts in hospitals, trauma care, and chronic treatments.
Your act of kindness ripples far beyond.
Join the effort to save lives today.`,
              },
              {
                id: 2,
                title: "Hosting a Community Blood Drive",
                image: Blogs_2,
                excerpt: `Organizing a community blood drive makes a big impact.
Gather volunteers, set up a friendly venue and spread awareness.
Local drives boost availability and foster solidarity.
It's practical, meaningful and life-changing for someone in need.
Become the catalyst your community needs.`,
              },
              {
                id: 3,
                title: "Why Young Donors Matter More Than Ever",
                image: Blogs_3,
                excerpt: `Younger donors are vital for maintaining a steady blood supply.
As older donor populations decline, the role of new donors grows.
Your contribution today sets the tone for tomorrow's safety.
It's safe, simple and deeply rewarding.
Get involved and inspire your peer group.`,
              },
              {
                id: 4,
                title: "My First Time Donating Blood - What to Expect",
                image: Blogs_4,
                excerpt: `Donating for the first time? Here's what you'll experience.
Registration → Screening → Donation → Refreshments and rest.
It usually takes less than an hour and the staff walk you through it.
You'll walk away feeling empowered.
Thank you for stepping up.`,
              },
              {
                id: 5,
                title: "Behind the Scenes at a Blood Bank",
                image: Blogs_5,
                excerpt: `Ever wondered what happens after you donate?
Testing, processing, storage and distribution happen behind the scenes.
Blood banks ensure safety, quality and reliability.
Your gift becomes part of a life-saving system.
Respect and trust the process.`,
              },
              {
                id: 6,
                title: "How Blood Donation Supports Cancer Patients",
                image: Blogs_6,
                excerpt: `Cancer patients often need transfusions during treatment.
Your donation can be the difference in recovery and hope.
It's not just about emergencies—it's about ongoing care.
Be the reason someone smiles again.
Donate with purpose.`,
              },
            ].map((blog, index) => (
              <div
                key={index}
                className="bg-white cursor-pointer rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="w-full h-64 overflow-hidden rounded">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{blog.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Are Saying</h2>
            <p className="text-lg text-gray-600">Real stories from donors, recipients, and healthcare heroes</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className="min-w-full px-4"
                    aria-hidden={activeIndex !== i}
                    role="tabpanel"
                  >
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-30 h-30 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-xl text-gray-900">{testimonial.name}</h4>
                          <p className="text-md text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, idx) => (
                          <span key={idx} role="img" aria-label="star">
                            ⭐
                          </span>
                        ))}
                        {[...Array(5 - testimonial.rating)].map((_, idx) => (
                          <span key={idx} role="img" aria-label="empty-star" className="opacity-30">
                            ⭐
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700 whitespace-pre-line text-md leading-relaxed">
                        "{testimonial.message}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
              className="absolute cursor-pointer top-1/2 -left-12 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
              className="absolute cursor-pointer top-1/2 -right-12 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
            >
              <ChevronRight />
            </button>

            <div className="flex justify-center mt-6 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 cursor-pointer rounded-full focus:outline-none ${activeIndex === index ? 'bg-red-600' : 'bg-gray-300'}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-red-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Answers to common questions about blood donation</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Is it safe to donate blood?',
                answer:
                  'Yes, donating blood is very safe. All donation equipment is sterile and used only once to eliminate any risk of infection. Blood donation centers follow strict health protocols and guidelines to protect donors and recipients. If you have any concerns, the staff will provide a thorough health screening before donation. Your well-being is always the top priority.'
              },
              {
                question: 'How often can I donate blood?',
                answer:
                  'You can donate whole blood approximately every 56 days (about 8 weeks). This allows your body enough time to replenish the lost blood cells. For platelet donation, the frequency can be higher, sometimes every 7 days, depending on the centers rules.Regular donations help maintain a stable blood supply for those in need.Always follow the advice of the medical staff regarding donation frequency.'
              },
              {
                question: 'Who can donate blood?',
                answer:
                  'Generally, healthy individuals aged 17 years and older who weigh at least 110 pounds (50 kg) are eligible to donate blood. You should feel well and not be under the influence of any medications that could affect donation. Some medical conditions or recent travel may temporarily defer you from donating. A quick health checkup at the donation center will determine your eligibility.'
              },
              {
                question: 'Can I donate blood if I have a tattoo?',
                answer:
                  'Yes, you can donate blood if you have a tattoo, but there are guidelines. Typically, you must wait for 3 months after getting a tattoo before donating, to reduce the risk of infections like hepatitis. This applies if your tattoo was done at a licensed facility with sterile equipment. Always disclose recent tattoos during your screening to ensure safe donation for you and recipients.'
              },
              {
                question: 'What should I eat and drink before donating blood?',
                answer:
                  'Its important to stay hydrated before donating blood, so drink plenty of water.Eating a healthy meal rich in iron, like spinach, red meat, or beans, helps maintain your iron levels.Avoid fatty foods before donation as they can affect blood test results.A balanced diet ensures you feel energized and ready for the donation process.'
              },
            ].map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-6 w-6 text-red-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-500" />
                    )}
                  </button>

                  <div className={`mt-2 text-gray-700 text-sm overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed cursor-pointer bottom-6 right-6 z-50 p-3 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-300"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}


    </div>
  );
}

export default HomePage;
