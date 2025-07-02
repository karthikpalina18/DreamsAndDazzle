// import React, { useEffect } from 'react';
// import { useProducts } from '../context/ProductContext';
// import { Link } from 'react-router-dom';

// const Products = () => {
//   const {
//     products,
//     loading,
//     error,
//     fetchProducts,
//     currentPage,
//     totalPages,
//     setFilters,
//     filters
//   } = useProducts();

//   useEffect(() => {
//     fetchProducts();
//     // eslint-disable-next-line
//   }, []);

//   const handlePageChange = (page) => {
//     setFilters({ ...filters, page });
//     fetchProducts({ ...filters, page });
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">All Products</h1>

//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {loading ? (
//         <div className="text-gray-600">Loading products...</div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <Link
//                   to={`/product/${product._id}`}
//                   key={product._id}
//                   className="border rounded-lg shadow hover:shadow-md transition overflow-hidden"
//                 >
//                   <img
//                     src={product.images?.[0]?.url || '/no-image.png'}
//                     alt={product.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold truncate">{product.name}</h3>
//                     <p className="text-gray-600 mt-1">₹{product.price}</p>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p>No products found.</p>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-6 space-x-2">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-3 py-1 rounded ${
//                     page === currentPage
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Products;
import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Filter, Grid, List, Star, Heart, Eye } from 'lucide-react';

const Products = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    currentPage,
    totalPages,
    setFilters,
    filters
  } = useProducts();

  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    setIsVisible(true);
    // eslint-disable-next-line
  }, []);

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    fetchProducts({ ...filters, page });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Add debounced search logic here if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-16 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute bottom-1/3 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-yellow-500 rounded-full opacity-50 animate-bounce"></div>
      </div>

      <div className={`relative z-10 p-6 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 to-yellow-500/80"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce">
                <ShoppingBag className="w-10 h-10 text-yellow-500" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">All Products</h1>
              <p className="text-yellow-100 animate-slide-up">Discover amazing products just for you</p>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 focus:border-yellow-400 hover:border-yellow-300"
                  placeholder="Search products..."
                />
              </div>

              {/* View Toggle and Filter */}
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-yellow-500 text-white shadow-lg' : 'text-gray-500 hover:text-yellow-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-yellow-500 text-white shadow-lg' : 'text-gray-500 hover:text-yellow-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all duration-200 hover:scale-105">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl animate-shake">
            <div className="flex items-center">
              <div className="text-red-500 font-medium">{error}</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading amazing products...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'} gap-6 mb-8`}>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={product._id}
                    className={`group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-yellow-200/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in ${viewMode === 'list' ? 'flex items-center' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Link to={`/product/${product._id}`} className={`block ${viewMode === 'list' ? 'flex items-center w-full' : ''}`}>
                      {/* Product Image */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'w-full h-56'}`}>
                        <img
                          src={product.images?.[0]?.url || '/no-image.png'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${viewMode === 'list' ? 'hidden' : ''}`}>
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div className="flex gap-2">
                              <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-red-500 transition-colors duration-200">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-yellow-500 transition-colors duration-200">
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                            New
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-yellow-600 transition-colors duration-200">
                              {product.name}
                            </h3>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                            </div>
                          </div>

                          <div className={`${viewMode === 'list' ? '' : 'mt-3'}`}>
                            <p className="text-2xl font-bold text-yellow-600">₹{product.price}</p>
                            {viewMode === 'list' && (
                              <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200">
                                View Details
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Hover effect for grid view */}
                        {viewMode === 'grid' && hoveredProduct === product._id && (
                          <div className="mt-3 transform translate-y-0 opacity-100 transition-all duration-300">
                            <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-yellow-500" />
                  </div>
                  <p className="text-xl text-gray-600 mb-2">No products found</p>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-yellow-200/50 p-6">
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-gray-600 mr-4">Page {currentPage} of {totalPages}</span>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
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
          animation: fade-in 0.6s ease-out both;
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

export default Products;