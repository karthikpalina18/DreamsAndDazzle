// import React, { useState, useEffect } from 'react';
// import { useProducts } from '../context/ProductContext';
// import { useNavigate } from 'react-router-dom';

// const AddProduct = () => {
//   const {
//     createProduct,
//     fetchCategories,
//     categories,
//     loading,
//     error,
//     clearError,
//   } = useProducts();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     images: [],
//   });

//   useEffect(() => {
//   fetchCategories();
//   return () => clearError();
// }, []); // ✅ Only runs once when component mounts


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: Array.from(e.target.files),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await createProduct(formData);
//     if (result.success) {
//       alert('Product created successfully!');
//       navigate('/admin/products');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Product Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           rows="4"
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           min="0"
//           required
//         />

//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock Quantity"
//           value={formData.stock}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           min="0"
//           required
//         />

//         <select
//   name="category"
//   value={formData.category}
//   onChange={handleChange}
//   className="w-full p-2 border rounded"
//   required
// >
//   <option value="">Select Category</option>
//   {Array.isArray(categories) &&
//   categories.map((cat) => (
//     <option key={cat} value={cat}>
//       {cat}
//     </option>
//   ))}

// </select>


//         <input
//           type="file"
//           name="images"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full p-2 border rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? 'Adding...' : 'Add Product'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { Package, FileText, DollarSign, Tag, Archive, Image, Plus, AlertCircle } from 'lucide-react';

const AddProduct = () => {
  const {
    createProduct,
    fetchCategories,
    categories,
    loading,
    error,
    clearError,
  } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
  });

  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    setIsVisible(true);
    fetchCategories();
    return () => clearError();
  }, []); // ✅ Only runs once when component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct(formData);
    if (result.success) {
      alert('Product created successfully!');
      navigate('/admin/products');
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 right-16 w-16 h-16 bg-yellow-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute bottom-1/3 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-500 rounded-full opacity-60 animate-bounce"></div>
      </div>

      {/* Form Container */}
      <div className={`max-w-2xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 to-yellow-500/80"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce">
                <Package className="w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">Add New Product</h2>
              <p className="text-yellow-100 animate-slide-up">Create and manage your inventory</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Product Name
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'name' ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
                      focusedField === 'name'
                      ? 'border-yellow-400 focus:border-yellow-500 bg-yellow-50/50'
                      : 'border-gray-200 focus:border-yellow-400 hover:border-yellow-300'
                    }`}
                    required
                  />
                  {focusedField === 'name' && (
                    <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl animate-pulse pointer-events-none"></div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <div className="relative">
                  <div className={`absolute top-4 left-0 pl-4 flex items-start pointer-events-none transition-all duration-300 ${focusedField === 'description' ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <textarea
                    name="description"
                    placeholder="Describe your product..."
                    value={formData.description}
                    onChange={handleChange}
                    onFocus={() => handleFocus('description')}
                    onBlur={handleBlur}
                    rows="4"
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 resize-none ${
                      focusedField === 'description'
                      ? 'border-yellow-400 focus:border-yellow-500 bg-yellow-50/50'
                      : 'border-gray-200 focus:border-yellow-400 hover:border-yellow-300'
                    }`}
                    required
                  />
                  {focusedField === 'description' && (
                    <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl animate-pulse pointer-events-none"></div>
                  )}
                </div>
              </div>

              {/* Price and Stock Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                    Price
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'price' ? 'text-yellow-500' : 'text-gray-400'}`}>
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      onFocus={() => handleFocus('price')}
                      onBlur={handleBlur}
                      min="0"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
                        focusedField === 'price'
                        ? 'border-yellow-400 focus:border-yellow-500 bg-yellow-50/50'
                        : 'border-gray-200 focus:border-yellow-400 hover:border-yellow-300'
                      }`}
                      required
                    />
                    {focusedField === 'price' && (
                      <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <label htmlFor="stock" className="block text-sm font-semibold text-gray-700">
                    Stock Quantity
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'stock' ? 'text-yellow-500' : 'text-gray-400'}`}>
                      <Archive className="w-5 h-5" />
                    </div>
                    <input
                      type="number"
                      name="stock"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleChange}
                      onFocus={() => handleFocus('stock')}
                      onBlur={handleBlur}
                      min="0"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
                        focusedField === 'stock'
                        ? 'border-yellow-400 focus:border-yellow-500 bg-yellow-50/50'
                        : 'border-gray-200 focus:border-yellow-400 hover:border-yellow-300'
                      }`}
                      required
                    />
                    {focusedField === 'stock' && (
                      <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                  Category
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'category' ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <Tag className="w-5 h-5" />
                  </div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onFocus={() => handleFocus('category')}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 appearance-none ${
                      focusedField === 'category'
                      ? 'border-yellow-400 focus:border-yellow-500 bg-yellow-50/50'
                      : 'border-gray-200 focus:border-yellow-400 hover:border-yellow-300'
                    }`}
                    required
                  >
                    <option value="">Select Category</option>
                    {Array.isArray(categories) &&
                    categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {focusedField === 'category' && (
                    <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl animate-pulse pointer-events-none"></div>
                  )}
                </div>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <label htmlFor="images" className="block text-sm font-semibold text-gray-700">
                  Product Images
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${focusedField === 'images' ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <Image className="w-5 h-5" />
                  </div>
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    onFocus={() => handleFocus('images')}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 ${
                      focusedField === 'images'
                      ? 'border-yellow-400 focus:border-yellow-500 bg-yellow-50/50'
                      : 'border-gray-200 focus:border-yellow-400 hover:border-yellow-300'
                    }`}
                  />
                  {focusedField === 'images' && (
                    <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl animate-pulse pointer-events-none"></div>
                  )}
                </div>
                <p className="text-sm text-gray-500">Upload multiple images for your product</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${loading ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                      Add Product
                    </>
                  )}
                </div>
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full opacity-70 animate-pulse"></div>
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
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;