import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, MapPin, Home, Building, Flag, Hash, ArrowRight, UserPlus, AlertCircle, Check } from 'lucide-react';
import { Link,useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const AnimatedSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  });
  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     // Handle success/error logic here
  //   }, 2000);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    clearError();

    const result = await register(
  formData.name,
  formData.email,
  formData.password,
  formData.phone,
  formData.address // includes street, city, state, zipCode, country
);

    setIsLoading(false);

    if (result.success) {
      navigate('/login');
    }
  };
  const getFieldIcon = (fieldName) => {
    const iconMap = {
      name: User,
      email: Mail,
      password: Lock,
      confirmPassword: Lock,
      phone: Phone,
      'address.street': Home,
      'address.city': Building,
      'address.state': MapPin,
      'address.zipCode': Hash,
      'address.country': Flag
    };
    return iconMap[fieldName] || User;
  };

  const formSections = [
    {
      title: "Personal Information",
      fields: ['name', 'email', 'phone']
    },
    {
      title: "Security",
      fields: ['password', 'confirmPassword']
    },
    {
      title: "Address Details",
      fields: ['address.street', 'address.city', 'address.state', 'address.zipCode', 'address.country']
    }
  ];

  const renderField = (fieldName, placeholder, type = 'text') => {
    const IconComponent = getFieldIcon(fieldName);
    const value = fieldName.includes('address.') 
      ? formData.address[fieldName.split('.')[1]]
      : formData[fieldName];
    
    const isPasswordField = fieldName === 'password' || fieldName === 'confirmPassword';
    const showPasswordState = fieldName === 'password' ? showPassword : showConfirmPassword;
    const setShowPasswordState = fieldName === 'password' ? setShowPassword : setShowConfirmPassword;

    return (
      <div className="space-y-2">
        <label htmlFor={fieldName} className="block text-sm font-semibold text-gray-700 capitalize">
          {fieldName.includes('address.') ? fieldName.split('.')[1] : fieldName.replace('confirmPassword', 'Confirm Password')}
        </label>
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === fieldName ? 'text-yellow-500' : 'text-gray-400'}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <input
            type={isPasswordField ? (showPasswordState ? 'text' : 'password') : type}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleChange}
            onFocus={() => handleFocus(fieldName)}
            onBlur={handleBlur}
            className={`w-full pl-12 ${isPasswordField ? 'pr-12' : 'pr-4'} py-4 border-2 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
              errors[fieldName] 
                ? 'border-red-300 focus:border-red-500' 
                : focusedField === fieldName
                ? 'border-yellow-400 focus:border-yellow-500 bg-yellow-50/50'
                : 'border-gray-200 focus:border-yellow-400 hover:border-yellow-300'
            }`}
            placeholder={placeholder}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPasswordState(!showPasswordState)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-yellow-500 transition-colors duration-200"
            >
              {showPasswordState ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          {focusedField === fieldName && (
            <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl animate-pulse pointer-events-none"></div>
          )}
        </div>
        {errors[fieldName] && (
          <div className="flex items-center gap-2 text-red-500 text-sm animate-shake">
            <AlertCircle className="w-4 h-4" />
            {errors[fieldName]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 right-16 w-16 h-16 bg-yellow-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-1/3 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-500 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-20 right-1/3 w-14 h-14 bg-yellow-300 rounded-full opacity-35 animate-ping"></div>
      </div>

      {/* Signup Card */}
      <div className={`w-full max-w-2xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 to-yellow-500/80"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce">
                <UserPlus className="w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">Create Account</h2>
              <p className="text-yellow-100 animate-slide-up">Join EcomStore and start shopping today</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-6 bg-gradient-to-r from-yellow-50 to-white border-b border-yellow-100">
            <div className="flex justify-between items-center">
              {formSections.map((section, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-semibold ${index <= currentStep ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {section.title}
                    </div>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
                      index < currentStep ? 'bg-yellow-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Personal Information */}
              {currentStep === 0 && (
                <div className="space-y-6 animate-slide-in">
                  {renderField('name', 'Enter your full name')}
                  {renderField('email', 'Enter your email address', 'email')}
                  {renderField('phone', 'Enter your phone number', 'tel')}
                </div>
              )}

              {/* Security */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-slide-in">
                  {renderField('password', 'Create a strong password', 'password')}
                  {renderField('confirmPassword', 'Confirm your password', 'password')}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-yellow-800 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className={`w-4 h-4 ${formData.password.length >= 6 ? 'text-green-500' : 'text-gray-300'}`} />
                        At least 6 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className={`w-4 h-4 ${formData.password === formData.confirmPassword && formData.password ? 'text-green-500' : 'text-gray-300'}`} />
                        Passwords match
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Address Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-slide-in">
                  {renderField('address.street', 'Street address')}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('address.city', 'City')}
                    {renderField('address.state', 'State')}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderField('address.zipCode', 'ZIP code')}
                    {renderField('address.country', 'Country')}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-200"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < formSections.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <span className="flex items-center gap-2">
                      Next
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`ml-auto group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isLoading ? 'animate-pulse' : ''}`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        </>
                      )}
                    </div>
                    {!isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to ="/login" className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200">
                  Sign in here
                </Link>
              </p>
              <div className="text-xs text-gray-500 leading-relaxed">
                By creating an account, you agree to our{' '}
                <button className="text-yellow-600 hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button className="text-yellow-600 hover:underline">Privacy Policy</button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 -left-2 w-4 h-4 bg-yellow-300 rounded-full opacity-50 animate-ping"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSignupForm;