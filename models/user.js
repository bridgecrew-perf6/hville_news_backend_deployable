import mongoose from "mongoose";
const bcrypt = require("bcryptjs");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required"
    },
    email: {
        type: String,
        trim: true,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession:{}

},
{timestamps: true}
);

//"pre" middlewares
userSchema.pre("save", function(next){
    let user = this;
    if(user.isModified("password")){
        return bcrypt.hash(user.password, 12, function(err, hash){
            if(err){
                console.log("BCRYPT ERR===> " + err)
                return next(err);
            }
            else{
                user.password = hash;
                return next();
            }
        })
    }
    else{
        return next();
    } 

});
//checking the password
userSchema.methods.comparePassword = async function(password, next){
    try{
        const result = await bcrypt.compare(password, this.password);
        return result;
    }catch(err){
         console.log(`Error when comparing passwords: ${err.message}`)
    }

}


export default mongoose.model("User", userSchema);