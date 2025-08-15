import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price cannot be negative']
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image']
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0
    },
    artisan: {
      name: {
        type: String,
        required: [true, 'Please provide artisan name']
      },
      location: {
        type: String,
        required: [true, 'Please provide artisan location']
      },
      avatar: {
        type: String
      },
      totalSales: {
        type: Number,
        default: 0
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      }
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      enum: {
        values: [
          'Jewelry',
          'Clothing',
          'Home Decor',
          'Art',
          'Accessories',
          'Kitchen',
          'Furniture',
          'Beauty',
          'Toys',
          'Other'
        ],
        message: '{VALUE} is not a valid category'
      }
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    features: {
      type: [String]
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    artisanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide artisan ID']
    }
  },
  {
    timestamps: true
  }
);

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;