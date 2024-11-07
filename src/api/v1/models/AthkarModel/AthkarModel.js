import mongoose from "mongoose";

const athkarItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  count: { type: Number, required: true },
  audio: { type: String, required: true },
  filename: { type: String, required: true },
});

const athkarSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  category: { type: String, required: true },
  audio: { type: String, required: true },
  filename: { type: String, required: true },
  array: { type: [athkarItemSchema], required: true },
});

const Athkar = mongoose.model("Athkar", athkarSchema);

export default Athkar;
