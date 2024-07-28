const { Schema, model } = require("mongoose");

//hashedPassword later
const SportsmanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 10,
    },
    sports: {
      type: String,
      required: true,
      enum: [
        "Power-Lifting",
        "Swimming",
        "Fitness",
        "Running",
        "Boxing",
        "Cross-Fit",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    typeUser: {
      type: String,
      required: true,
      enum: ["Trainer", "Sportsman"],
    },
    token: { type: String, default: null },
    trainers: [{ type: Schema.Types.ObjectId, ref: "Trainer" }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

exports.Sportsman = model("Sportsman", SportsmanSchema);
