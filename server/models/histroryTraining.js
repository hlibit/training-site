const { Schema, model } = require("mongoose");

const historyTrainingSchema = new Schema(
  {
    status:{
      type: String,
      required: true,
      enum:[
        "Finished",
        "Canceled"
      ]
    },
    canceledBy:{
      type: String,
      required: true,
      enum:[,
        "None",
        "Sportsman",
        "Trainer"
      ]
    },
    trainings: [{ type: Schema.Types.ObjectId, ref: "Training" }],
    sportsmen: [{ type: Schema.Types.ObjectId, ref: "Sportsman" }],
    trainers: [{ type: Schema.Types.ObjectId, ref: "Trainer" }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

exports.trainingHistory = model("trainingHistory", historyTrainingSchema);