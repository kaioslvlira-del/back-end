import Key from "../models/Key.js";

// 🔥 CRIAR KEYS
export const createKey = async (req, res) => {
  try {
    const { productId, type, quantity = 1 } = req.body;

    const keys = [];

    for (let i = 0; i < quantity; i++) {
      let expiresAt = null;
      const now = new Date();

      if (type === "monthly") {
        expiresAt = new Date(now.setMonth(now.getMonth() + 1));
      }

      if (type === "quarterly") {
        expiresAt = new Date(now.setMonth(now.getMonth() + 3));
      }

      const key = await Key.create({
        code: Math.random().toString(36).substring(2, 12).toUpperCase(),
        product: productId,
        type,
        expiresAt,
      });

      keys.push(key);
    }

    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar keys" });
  }
};

// 🔥 LISTAR
export const getKeys = async (req, res) => {
  try {
    const keys = await Key.find().populate("product").sort({ createdAt: -1 });

    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar keys" });
  }
};

// 🔥 ATIVAR/DESATIVAR
export const toggleKey = async (req, res) => {
  try {
    const { id } = req.params;

    const key = await Key.findById(id);
    if (!key) {
      return res.status(404).json({ error: "Key não encontrada" });
    }

    key.active = !key.active;
    await key.save();

    res.json(key);
  } catch (err) {
    res.status(500).json({ error: "Erro ao alterar key" });
  }
};

// 🔥 DELETAR
export const deleteKey = async (req, res) => {
  try {
    const { id } = req.params;

    await Key.findByIdAndDelete(id);

    res.json({ message: "Key deletada" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar key" });
  }
};
