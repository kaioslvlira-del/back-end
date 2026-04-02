import connectDB from "./src/config/database.js";
import app from "./src/app.js";
import env from "dotenv";

// env config
env.config();

// listen port
const PORT = process.env.PORT || 3000;

// db connect
await connectDB();

// PORT listening
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
