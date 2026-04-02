import mongoose from "mongoose";

// database connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado"); 
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
