const { Schema, model } = require("mongoose");

const historyTrainingSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["Finished", "Canceled"],
    },
    canceledBy: {
      type: String,
      required: true,
      enum: [, "None", "Sportsman", "Trainer"],
    },
    trainings: [
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
        level: {
          type: String,
          required: true,
          enum: ["Light", "Medium", "Hard"],
        },
        energy: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: ["Pending", "Finished", "Canceled"],
        },
      },
    ],
    sportsmen: [{ type: Schema.Types.ObjectId, ref: "Sportsman" }],
    trainers: [{ type: Schema.Types.ObjectId, ref: "Trainer" }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

exports.trainingHistory = model("trainingHistory", historyTrainingSchema);
