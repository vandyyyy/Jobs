const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
    firstName:{type: String, required:true },
    familyName:{type: String, required:true },
    Id:{type: String, required:true },
    password:{type: String, required:true },
})
userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token
};
const User = mongoose.model("User",userSchema);
const validate=(data)=>{
    const schema = Joi.object({
        firstName:Joi.string().required().label("First Name"),
        familyName:Joi.string().required().label("Family Name"),
        Id:Joi.string().required().label("email"),
        password: passwordComplexity().required().label("Password ")
    });
    return schema.validate(data)
};
module.exports = {User,validate};