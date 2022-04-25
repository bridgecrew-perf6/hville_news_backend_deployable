import User from "../models/user";
const jwt = require("jsonwebtoken")


export const createUser= async (req, res)=>{
    console.log(req.body);
    const {name, email, password} = req.body;
    //validation
    if(!name) return res.status(400).send("Name feild is required");
    if(!password || password.length < 6 || password.length > 20){
         return res.status(400)
         .send("Password feild is required, being between 6 and 20 characters long.");
    }
    let userExist = await User.findOne({email: email}).exec();
    if (userExist) return res.status(400).send("Email already exists");
    const user = new User(req.body);
    try{
        await user.save();
        console.log(`USER CREATED SUCCESSFULLY ==> ${user}`);
        return res.json({user: user});
    }
    catch(err){
        console.log(`COULD NOT CREATE USER ===> ${err}`);
        return res.status(400).send("Error, try again.")
    }

}

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email: email}).exec();
        if(!user){
           return res.status(400).send("user with that email does not exist.")
        }
        else{
            console.log(user)
            const result = await user.comparePassword(password)
            if (result === true){
                const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                })
               res.json({token: token, user: {
                   id: user._id,
                   name: user.name,
                   email: user.email
               }})
               
            }
        }

    }
    catch(err){
        console.log(`login error ${err}`);
        res.status(400).send("Login has failed.")
    }
}