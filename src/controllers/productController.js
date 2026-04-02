import Product from "../models/Product.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      category: req.body.category.toLowerCase(),
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);
  res.json({ message: "Deletado" });
};
