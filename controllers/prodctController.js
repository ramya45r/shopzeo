// controllers/productController.js
const Product = require('../models/Product');



// CREATE product (admin)
exports.createProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, stock } = req.body;
    const images = (req.files || []).map(f => '/uploads/' + f.filename);

    const product = new Product({
      title,
      description,
      price,
      category,
      stock,
      images
    });

    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};
// GET all products with filters
exports.getProducts = async (req, res, next) => {
  try {
    const { q, category, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const filter = {};

    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(filter);
    const items = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};

// GET single product
exports.getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    next(err);
  }
};
// UPDATE product (admin)
exports.updateProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });

    if (req.files && req.files.length) {
      product.images = (req.files || []).map(f => '/uploads/' + f.filename);
    }

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;

    await product.save();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE product (admin)
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
