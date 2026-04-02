import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import productRoutes from "./routes/productRoutes.js";

// 🔥 IMPORTS QUE FALTAVAM
import session from "express-session";
import passport from "passport";
import "./config/passport.js"; // ⚠️ ESSENCIAL

const app = express();

app.use(
  cors({
    origin: "https://front-end-auxv.vercel.app/",
    credentials: true,
  }),
);

app.use(express.json());

// 🔐 SESSION (ANTES DO PASSPORT)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // obrigatório em produção
      sameSite: "none",
    },
  }),
);

// 🔐 PASSPORT (DEPOIS DA SESSION)
app.use(passport.initialize());
app.use(passport.session());

// ROTAS
app.use("/api", routes);
app.use("/api/products", productRoutes);

export default app;
