const express = require('express');
const { 
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require('./data/products');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    socketIp: req.socket.remoteAddress,
    forwardedFor: req.headers['x-forwarded-for'],
    userAgent: req.get('user-agent')
  }));
  next();
});


app.get('/', (req, res) => {
  res.json({
    message: 'Hello from simple backend!',
    status: 'ok'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: getProducts()
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  return res.json({
    success: true,
    data: product
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, stock, description } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: 'name, price, stock are required'
    });
  }

  const product = addProduct({ name, price, stock, description });

  return res.status(201).json({
    success: true,
    data: product
  });
});

app.put('/api/products/:id', (req, res) => {
  const updatedProduct = updateProduct(req.params.id, req.body);

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  return res.json({
    success: true,
    data: updatedProduct
  });
});

app.delete('/api/products/:id', (req, res) => {
  const deletedProduct = deleteProduct(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  return res.json({
    success: true,
    data: deletedProduct,
    message: 'Product deleted successfully'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
