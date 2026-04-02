import connectDB from "./src/config/database.js";
import app from "./src/app.js";
import env from "dotenv";

// env config
env.config();

// db connect
await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
