import React, { useState, useEffect } from 'react';
import { ShoppingBag, Truck, Shield, Star, Phone, Shirt, Smartphone, Home, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
const AnimatedLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate hero images
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const heroImages = [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&h=500&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 animate-fade-in">
                Welcome to
                <span className="block text-yellow-500 animate-bounce">EcomStore</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed animate-slide-up">
                Discover amazing products at unbeatable prices. Shop the latest trends and find everything you need in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up">
                <button className="group bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    Get Started
                    <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                  </span>
                </button>
                <Link to ="/signup" className="bg-white hover:bg-yellow-50 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-spin-slow shadow-2xl">
                  <div className="absolute inset-4 bg-white rounded-full overflow-hidden shadow-inner">
                    <img 
                      src={heroImages[currentImage]}
                      alt="Product showcase"
                      className="w-full h-full object-cover transition-all duration-1000 transform hover:scale-110"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-full animate-bounce shadow-lg flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
              Why Choose <span className="text-yellow-500">EcomStore?</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "Free shipping on orders over $50. Fast and reliable delivery to your doorstep.", delay: "0s" },
              { icon: Shield, title: "Secure Shopping", desc: "Your data is protected with advanced encryption and secure payment processing.", delay: "0.2s" },
              { icon: Star, title: "Quality Products", desc: "Carefully curated products from trusted brands and verified sellers.", delay: "0.4s" },
              { icon: Phone, title: "24/7 Support", desc: "Our customer service team is here to help you anytime, anywhere.", delay: "0.6s" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-yellow-300"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:animate-pulse">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Shop by <span className="text-yellow-600">Category</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shirt, title: "Fashion", desc: "Latest trends in clothing and accessories", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop" },
              { icon: Smartphone, title: "Electronics", desc: "Cutting-edge technology and gadgets", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop" },
              { icon: Home, title: "Home & Garden", desc: "Everything for your home and outdoor space", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" },
              { icon: Zap, title: "Sports", desc: "Equipment and gear for all sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop" }
            ].map((category, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 group-hover:animate-spin">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{category.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-pulse">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-yellow-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers and discover your next favorite product today.
          </p>
          <button className="group bg-white hover:bg-yellow-50 text-yellow-600 px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl">
            <span className="flex items-center justify-center gap-3">
              Create Your Account
              <ShoppingBag className="w-6 h-6 group-hover:animate-bounce" />
            </span>
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLandingPage;