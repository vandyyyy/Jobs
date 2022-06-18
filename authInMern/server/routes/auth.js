const router = require("express").Router();
const {User}= require("../model/user");
const Joi = require("joi");

router.post("/",async(req, res)=>{
    try{
        const{error}= validate(req.body);
        if(error)
         return res.status(400).send({message:error.details[0].message});
        
        const user = await User.findOne({email:req.body.email});
        if(!user)
        return res.status(401).send({message:"invalkid"});

        const validPassword = await bcrypt.compare(
            req.body.password,user.password
        );
        if (!validPassword)
        return res.status(401).send({message:"Invalid"});

        const token = user.generateAuthToken();
        res.statusMessage(200).send({data:token,message:"logged in successfully"})
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
})

const validate = (data)=>{
    const schema= Joi.object({
        Id:Joi.string().email().required().label("email"),
        password:Joi.string().required().label("Password")
    });
    return schema.validate(data);
}