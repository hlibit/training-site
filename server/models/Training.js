const { Schema, model } = require("mongoose");

const TrainingSchema = new Schema(
  {
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
    level:{
      type: String,
      required: true,
      enum: [
        "Light",
        "Medium",
        "Hard",
      ],
    },
    energy: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status:{
      type: String,
      required: true,
      enum:[
        "Pending",
        "Finished"
      ]
    },

    sportsmen: [{ type: Schema.Types.ObjectId, ref: "Sportsman" }],
    trainers: [{ type: Schema.Types.ObjectId, ref: "Trainer" }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

exports.Training = model("Training", TrainingSchema);
