import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import useFavoritesStore from '../store/favoritesStore';
import ProductCard from '../components/ui/ProductCard';

const FavoritesPage = () => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 py-12"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-lg text-gray-600 mb-8">
              Start browsing and save items you love to see them here
            </p>
            <Link
              to="/shop"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Discover Products
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Favorites
              </h1>
              <p className="text-lg text-gray-600">
                {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <Heart className="h-8 w-8 text-red-500 fill-current" />
          </div>
        </div>

        {/* Favorites Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {favorites.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center"
        >
          <ShoppingBag className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to purchase?
          </h3>
          <p className="text-gray-600 mb-6">
            Add your favorite items to cart and support talented artisans
          </p>
          <Link
            to="/shop"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center transition-colors"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FavoritesPage;