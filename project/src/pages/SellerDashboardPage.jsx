import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Edit3, 
  Eye, 
  Trash2,
  Star,
  Calendar,
  Users,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const SellerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthStore();

  // Mock seller data - in a real app, this would come from an API
  const sellerStats = {
    totalProducts: 24,
    totalSales: 1250,
    totalRevenue: 45680.50,
    monthlyGrowth: 15.2,
    averageRating: 4.8,
    totalReviews: 892
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      product: 'Hand-woven Ceramic Vase',
      amount: 89.99,
      status: 'shipped',
      date: '2025-01-15'
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      product: 'Leather Messenger Bag',
      amount: 156.00,
      status: 'processing',
      date: '2025-01-14'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Chen',
      product: 'Wooden Bowl Set',
      amount: 65.50,
      status: 'delivered',
      date: '2025-01-13'
    }
  ];

  const products = [
    {
      id: '1',
      name: 'Hand-woven Ceramic Vase',
      price: 89.99,
      stock: 12,
      image: 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'active',
      sales: 124
    },
    {
      id: '2',
      name: 'Leather Messenger Bag',
      price: 156.00,
      stock: 8,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'active',
      sales: 89
    },
    {
      id: '3',
      name: 'Handmade Wooden Bowl Set',
      price: 65.50,
      stock: 0,
      image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'out_of_stock',
      sales: 156
    },
    {
      id: '4',
      name: 'Silver Statement Necklace',
      price: 120.00,
      stock: 5,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      status: 'active',
      sales: 67
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteProduct = (productId) => {
    toast.success('Product deleted successfully');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome back, {user?.name}! Manage your products and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">Artisan Seller</p>
                <div className="flex items-center justify-center mt-2">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{sellerStats.averageRating}</span>
                  <span className="ml-1 text-sm text-gray-600">
                    ({sellerStats.totalReviews} reviews)
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Actions */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Actions</h3>
                <button className="w-full flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-amber-600" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Products</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {sellerStats.totalProducts}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <ShoppingBag className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Sales</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {sellerStats.totalSales}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <DollarSign className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          ${sellerStats.totalRevenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Monthly Growth</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          +{sellerStats.monthlyGrowth}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{order.product}</h4>
                          <p className="text-sm text-gray-600">
                            Customer: {order.customerName} • Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.amount}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">My Products</h2>
                  <button className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-lg font-bold text-gray-900 mb-2">
                            ${product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-600">
                              Stock: {product.stock}
                            </span>
                            <span className="text-sm text-gray-600">
                              Sales: {product.sales}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              {product.status.replace('_', ' ')}
                            </span>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-700">
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Management</h2>
                
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-gray-600">Customer: {order.customerName}</p>
                          <p className="text-gray-600">Product: {order.product}</p>
                          <p className="text-gray-500 text-sm">
                            Order Date: {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-semibold text-gray-900">
                            ${order.amount.toFixed(2)}
                          </p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Details
                          </button>
                          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                            Contact Customer
                          </button>
                        </div>
                        {order.status === 'processing' && (
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                            Mark as Shipped
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SellerDashboardPage;