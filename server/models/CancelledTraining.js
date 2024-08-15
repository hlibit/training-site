const { Schema, model } = require("mongoose");

const CanceledTrainingSchema = new Schema(
  {
    cancelledBy:{
      type: String,
      required: true,
    },
    trainings: [{ type: Schema.Types.ObjectId, ref: "Training" }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

exports.CanceledTraining = model("CanceledTraining", CanceledTrainingSchema);