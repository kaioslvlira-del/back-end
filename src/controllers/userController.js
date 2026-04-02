import User from "../models/User.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const updateData = {};
    const { fullName, birthDate, email, cpf } = req.body;

    if (email && !email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (fullName) updateData.fullName = fullName;
    if (birthDate) updateData.birthDate = birthDate;
    if (email) updateData.email = email;
    if (cpf) updateData.cpf = cpf;
    if (typeof req.body.isPrivate === "boolean")
      updateData.isPrivate = req.body.isPrivate;
    if (typeof req.body.useDiscordAvatar === "boolean")
      updateData.useDiscordAvatar = req.body.useDiscordAvatar;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar" });
  }
};

export const getUsers = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { search = "", page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;

    const query = {
      username: {
        $regex: search,
        $options: "i",
      },
    };

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// TOGGLE ADMIN
export const toggleAdmin = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { id } = req.params;
    const { isAdmin } = req.body;

    if (req.user._id.toString() === id) {
      return res.status(400).json({
        error: "Você não pode alterar seu próprio acesso",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao alterar admin" });
  }
};
