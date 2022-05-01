import mongoose from "mongoose";
const {Schema} = mongoose;


const menuItemSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    ingredients:{
        type: String
        
    },
    price:{
        type: String,
        trim: true,
        required: true
    },
    food_type:{
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    img_source: {
        type: String
    }

},
{timestamps: true}
);


export default mongoose.model("MenuItem", menuItemSchema);