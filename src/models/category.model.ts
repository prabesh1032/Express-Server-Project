import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      minLength: 3,
      trim: true,
    },
    description: {
      type: String,
      minLength: [10, "description must be at least 10 character long"],
    },
    image: { type: String, required: false },
    image_public_id: { type: String, required: false },
  },
  { timestamps: true },
);

const Category = mongoose.model("category", categorySchema);
export default Category;
