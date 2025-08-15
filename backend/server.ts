import * as express from "express";
import mongoose from "mongoose";
import * as cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Routes
app.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ success: true, message: "Feedback saved successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/feedback", async (req, res) => {
  const data = await Feedback.find();
  res.json(data);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
