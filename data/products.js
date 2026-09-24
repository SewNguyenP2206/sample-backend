const products = [
  {
    id: 1,
    name: 'Áo thun nam',
    price: 199000,
    stock: 25,
    description: 'Áo thun cotton thoáng mát.'
  },
  {
    id: 2,
    name: 'Giày sneaker',
    price: 450000,
    stock: 12,
    description: 'Giày sneaker thoải mái cho ngày dài.'
  },
  {
    id: 3,
    name: 'Túi xách nữ',
    price: 320000,
    stock: 8,
    description: 'Túi xách phong cách tối giản.'
  }
];

const getProducts = () => products.map((product) => ({ ...product }));

const getProductById = (id) => {
  const productId = Number(id);
  return products.find((product) => product.id === productId);
};

const addProduct = (productData) => {
  const nextId = products.length ? Math.max(...products.map((product) => product.id)) + 1 : 1;

  const newProduct = {
    id: nextId,
    name: productData.name,
    price: Number(productData.price),
    stock: Number(productData.stock),
    description: productData.description || ''
  };

  products.push(newProduct);
  return { ...newProduct };
};

const updateProduct = (id, productData) => {
  const product = getProductById(id);

  if (!product) {
    return null;
  }

  Object.assign(product, {
    name: productData.name ?? product.name,
    price: productData.price !== undefined ? Number(productData.price) : product.price,
    stock: productData.stock !== undefined ? Number(productData.stock) : product.stock,
    description: productData.description ?? product.description
  });

  return { ...product };
};

const deleteProduct = (id) => {
  const productId = Number(id);
  const index = products.findIndex((product) => product.id === productId);

  if (index === -1) {
    return null;
  }

  const [deletedProduct] = products.splice(index, 1);
  return { ...deletedProduct };
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
