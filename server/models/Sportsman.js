const Joi = require("joi");
const {Schema,model, default: mongoose}= require("mongoose");

//hashedPassword later
const SportsmanSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        default: 10,
    },
    sports:{
        type:String,
        required: true,
        enum: ['Power-Lifting','Swimming','Fitness','Running','Boxing','Cross-Fit']
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
    token:{type:String, default: null},
    trainers:[{type: Schema.Types.ObjectId,ref:"Trainer"}]
},
{
    timestamps: false,
    versionKey:false,
})

const sportsmanValidationSchema = Joi.object({
    name: Joi.string().required().min(4).max(30).messages({
        "string.base": `"name" should be a string`,
        "string.empty": `"name" must not be empty`,
        "string.min": `"name" must contain at least {#limit} characters`,
        "string.max": `"name" must contain at most {#limit} characters`,
        "any.required": `"name" is required`
    }),
    surname: Joi.string().required().min(4).max(30).messages({
        "string.base": `"surname" should be a string`,
        "string.empty": `"surname" must not be empty`,
        "string.min": `"surname" must contain at least {#limit} characters`,
        "string.max": `"surname" must contain at most {#limit} characters`,
        "any.required": `"surname" is required`
    }),
    age: Joi.number().required().min(10).max(99).messages({
        "number.base": `"age" should be a number`,
        "number.min": `"age" must be at least {#limit}`,
        "number.max": `"age" must be at most {#limit}`,
        "any.required": `"age" is required`
    }),
    sports: Joi.string().required().valid('Power-Lifting', 'Swimming', 'Fitness', 'Running', 'Boxing', 'Cross-Fit').messages({
        "string.base": `"sports" should be a string`,
        "string.empty": `"sports" must not be empty`,
        "any.only": `"sports" must be one of [Power-Lifting, Swimming, Fitness, Running, Boxing, Cross-Fit]`,
        "any.required": `"sports" is required`
    }),
    email: Joi.string().required().min(6).max(255).email().messages({
        "string.base": `"email" should be a string`,
        "string.empty": `"email" must not be empty`,
        "string.min": `"email" must contain at least {#limit} characters`,
        "string.max": `"email" must contain at most {#limit} characters`,
        "string.email": `"email" must be a valid email address`,
        "any.required": `"email" is required`
    }),
    password: Joi.string().required().min(6).max(255).messages({
        "string.base": `"password" should be a string`,
        "string.empty": `"password" must not be empty`,
        "string.min": `"password" must contain at least {#limit} characters`,
        "string.max": `"password" must contain at most {#limit} characters`,
        "any.required": `"password" is required`
    })
});

exports.validate = (user) =>{
    const result = sportsmanValidationSchema.validate(user);
    if(result.error) return result.error.details.map((detail)=> detail.message);
    return null;
}

exports.Sportsman = model("Sportsman",SportsmanSchema);