// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useProducts } from '../context/ProductContext';
// import { useCart } from '../context/CartContext';
// import {Link , useNavigate} from 'react-router-dom';
// const ProductDetails = () => {
//   const { id } = useParams();
//   const {
//     currentProduct,
//     fetchProduct,
//     loading,
//     error,
//     clearError
//   } = useProducts();

//   const {
//     addToCart,
//     getCartItemsCount
//   } = useCart();

//   const [quantity, setQuantity] = useState(1);
//   const [color, setColor] = useState('');
//   const [size, setSize] = useState('');
//   const [added, setAdded] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProduct(id);
//     return () => clearError();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!currentProduct) return;

//     const result = addToCart(currentProduct, quantity, color, size);
//     if (result.success) {
//       setAdded(true);
//       setTimeout(() => setAdded(false), 2000);
//     }
//   };
// const handleBuyNow = () => {
//   const buyItem = {
//     product: currentProduct,
//     quantity: 1,
//     price: currentProduct.price * (1 - (currentProduct.discount || 0) / 100),
//     color: '', // if you're using color/size
//     size: ''
//   };

//   navigate('/checkout', { state: { buyNowItem: buyItem } });
// };
//   if (loading) return <div className="p-6">Loading product...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!currentProduct) return <div className="p-6">Product not found.</div>;

//   const {
//     name,
//     description,
//     price,
//     category,
//     stock,
//     images,
//     rating,
//     reviews,
//     colors = [],
//     sizes = []
//   } = currentProduct;

//   return (
//     <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Product Image */}
//       <div className="w-full">
//         <img
//           src={images?.[0]?.url || '/no-image.png'}
//           alt={name}
//           className="w-full h-96 object-cover rounded shadow"
//         />
//       </div>

//       {/* Product Info */}
//       <div className="space-y-4">
//         <h2 className="text-3xl font-bold">{name}</h2>
//         <p className="text-gray-700">{description}</p>
//         <p className="text-xl font-semibold text-blue-600">₹{price}</p>
//         <p><span className="font-medium">Category:</span> {category}</p>
//         <p>
//           <span className="font-medium">Stock:</span>{' '}
//           <span className={stock > 0 ? 'text-green-600' : 'text-red-600'}>
//             {stock > 0 ? `${stock} Available` : 'Out of Stock'}
//           </span>
//         </p>

//         {/* Rating */}
//         <div>
//           <p className="font-medium">Rating:</p>
//           <p className="text-yellow-500">⭐ {rating || 0}</p>
//         </div>

//         {/* Color selector */}
//         {colors.length > 0 && (
//           <div>
//             <label className="font-medium">Select Color:</label>
//             <select
//               className="block border p-2 rounded mt-1"
//               value={color}
//               onChange={e => setColor(e.target.value)}
//             >
//               <option value="">Choose</option>
//               {colors.map(c => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Size selector */}
//         {sizes.length > 0 && (
//           <div>
//             <label className="font-medium">Select Size:</label>
//             <select
//               className="block border p-2 rounded mt-1"
//               value={size}
//               onChange={e => setSize(e.target.value)}
//             >
//               <option value="">Choose</option>
//               {sizes.map(s => (
//                 <option key={s} value={s}>{s}</option>
//               ))}
//             </select>
//           </div>
//         )}
//        <button
//   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//   onClick={handleBuyNow}
// >
//   Buy Now
// </button>


//         {/* Quantity selector */}
//         <div>
//           <label className="font-medium">Quantity:</label>
//           <input
//             type="number"
//             min="1"
//             max={stock}
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="border p-2 rounded w-20 ml-2"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex space-x-4">
//           <button
//             className={`px-4 py-2 rounded ${stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} text-white`}
//             onClick={handleAddToCart}
//             disabled={stock === 0}
//           >
//             {added ? 'Added!' : 'Add to Cart'}
//           </button>

//           <button className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100">
//             ❤️ Wishlist
//           </button>
//         </div>
//       </div>

//       {/* Reviews */}
//       <div className="col-span-2 mt-8">
//         <h3 className="text-2xl font-bold mb-4">Reviews</h3>
//         {reviews?.length > 0 ? (
//           <div className="space-y-4">
//             {reviews.map((review, idx) => (
//               <div key={idx} className="border rounded p-4 shadow-sm">
//                 <p className="font-semibold">{review.user?.name || 'User'}</p>
//                 <p className="text-yellow-500">⭐ {review.rating}</p>
//                 <p className="text-gray-700">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No reviews yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  Package, 
  Truck, 
  Shield, 
  ArrowLeft,
  Share2,
  Check,
  AlertCircle,
  Zap
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const {
    currentProduct,
    fetchProduct,
    loading,
    error,
    clearError
  } = useProducts();

  const {
    addToCart,
    getCartItemsCount
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id);
    setIsVisible(true);
    return () => clearError();
  }, [id]);

  const handleAddToCart = () => {
    if (!currentProduct) return;

    const result = addToCart(currentProduct, quantity, color, size);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    const buyItem = {
      product: currentProduct,
      quantity: 1,
      price: currentProduct.price * (1 - (currentProduct.discount || 0) / 100),
      color: '',
      size: ''
    };

    navigate('/checkout', { state: { buyNowItem: buyItem } });
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl animate-shake max-w-md">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
            <div className="text-red-700 font-medium">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    price,
    category,
    stock,
    images,
    rating,
    reviews,
    colors = [],
    sizes = []
  } = currentProduct;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-16 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute bottom-1/3 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto p-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-yellow-200/50 text-gray-700 hover:text-yellow-600 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>

        {/* Main Product Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={images?.[selectedImageIndex]?.url || images?.[0]?.url || '/no-image.png'}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              {/* Image Thumbnails */}
              {images && images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index 
                          ? 'border-yellow-500 shadow-lg' 
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Title and Category */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                    {category}
                  </span>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isWishlisted 
                        ? 'bg-red-100 text-red-500' 
                        : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${
                        star <= (rating || 0) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({rating || 0}) • {reviews?.length || 0} reviews</span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">₹{price}</p>
                    <p className="text-yellow-100 text-sm">Inclusive of all taxes</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${stock > 0 ? 'text-green-200' : 'text-red-200'}`}>
                      {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              {colors.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Select Color:</label>
                  <div className="flex gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                          color === c
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Select Size:</label>
                  <div className="flex gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                          size === s
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-100 rounded-xl">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="p-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold text-gray-800">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="p-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
                      disabled={quantity >= stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Max: {stock} items</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={stock === 0}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5" />
                    Buy Now
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  className={`flex-1 group relative overflow-hidden font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    added
                      ? 'bg-green-500 text-white'
                      : stock > 0
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </div>
                  {!added && stock > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Package className="w-4 h-4 text-purple-600" />
                  </div>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
            <h3 className="text-2xl font-bold text-white">Customer Reviews</h3>
            <p className="text-yellow-100">See what our customers are saying</p>
          </div>

          <div className="p-8">
            {reviews?.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                          {(review.user?.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{review.user?.name || 'Anonymous User'}</p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${
                                  star <= review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">No reviews yet</p>
                <p className="text-gray-500">Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;