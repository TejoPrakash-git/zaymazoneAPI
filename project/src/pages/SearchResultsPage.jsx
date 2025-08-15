import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Filter } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');

  // Mock products data - in a real app, this would come from an API
  const allProducts = [
    {
      id: '1',
      name: 'Hand-woven Ceramic Vase',
      price: 89.99,
      image: 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.8,
      reviews: 124,
      artisan: 'Maria Rodriguez',
      category: 'Home Decor'
    },
    {
      id: '2',
      name: 'Leather Messenger Bag',
      price: 156.00,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.9,
      reviews: 89,
      artisan: 'James Wilson',
      category: 'Fashion'
    },
    {
      id: '3',
      name: 'Handmade Wooden Bowl Set',
      price: 65.50,
      image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.7,
      reviews: 156,
      artisan: 'David Chen',
      category: 'Kitchen'
    },
    {
      id: '4',
      name: 'Silver Statement Necklace',
      price: 120.00,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 5.0,
      reviews: 67,
      artisan: 'Sarah Johnson',
      category: 'Jewelry'
    },
    {
      id: '5',
      name: 'Macrame Wall Hanging',
      price: 45.00,
      image: 'https://images.pexels.com/photos/6436544/pexels-photo-6436544.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.6,
      reviews: 203,
      artisan: 'Emma Thompson',
      category: 'Home Decor'
    },
    {
      id: '6',
      name: 'Ceramic Coffee Mugs',
      price: 32.99,
      image: 'https://images.pexels.com/photos/1751959/pexels-photo-1751959.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.5,
      reviews: 87,
      artisan: 'Lisa Park',
      category: 'Kitchen'
    }
  ];

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    let filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.artisan.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Relevance - keep original order
        break;
    }

    return filtered;
  }, [query, sortBy]);

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
            Back to Shop
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Search Results
              </h1>
              {query && (
                <p className="text-lg text-gray-600">
                  Results for "<span className="font-medium">{query}</span>"
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
            </p>
            
            {searchResults.length > 0 && (
              <div className="flex items-center space-x-4">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {!query.trim() ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Enter a search term
            </h3>
            <p className="text-gray-600">
              Search for products, artisans, or categories
            </p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600 mb-6">
              Try searching with different keywords or browse our categories
            </p>
            <Link
              to="/shop"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {searchResults.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Popular Searches */}
        {!query.trim() && (
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {['ceramic', 'leather', 'jewelry', 'wooden', 'handmade', 'artisan'].map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${term}`}
                  className="bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 px-3 py-2 rounded-full text-sm transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResultsPage;