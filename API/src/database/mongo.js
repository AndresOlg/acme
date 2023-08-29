import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB conection successful"))
    .catch(error => console.error("Error to connected to MongoDB: ", error));

export default mongoose;