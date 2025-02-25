const mongoose = require("mongoose");

const athkarItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  count: { type: Number, required: true },
  audio: { type: String, required: true },
  filename: { type: String, required: true },
});

const athkarSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  category: {
    ar: { type: String, required: true, default: "" },
    en: { type: String, default: "" },
  },
  audio: { type: String, required: true },
  filename: { type: String, required: true },
  array: { type: [athkarItemSchema], required: true },
});

const Athkar = mongoose.model("Athkar", athkarSchema);

module.exports = Athkar;
