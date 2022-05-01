import res from "express/lib/response";
import MenuItem from "../models/menu_item";

export const createMenuItem= async(req, res)=>{
    const {title} = req.body;
    let itemExists = await MenuItem.findOne({title: title}).exec();
    if(itemExists){
     return res.status(400).send("Item already exists");
    }
    else{
        newItem(req.body);
    }

}
export const newItem = async (data)=>{
    const {title} = data;
    let itemExists = await MenuItem.findOne({title: title}).exec();
    if(itemExists){
        console.log("already exists")
    }
    else{
        const newItem = new MenuItem(data);
    
        try{
            await newItem.save();
            console.log("ITEM CREATED SUCCESSFULLY ===>", newItem.title)
            res.status(200).send("successful creation")
        }
        catch(err){
            console.log(`error creating item`, err)
        }
    }

    
}
export const updateItem=async (req, res)=>{
    console.log(req.body);
    const itemId = req.params.id
    MenuItem.findByIdAndUpdate(itemId, req.body,
    function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Item : ", docs);
    }
    res.status(200).send("successfully updated item")
});
}



export const show = async(req, res)=>{
    const item = await MenuItem.find({_id: req.params.id})
    console.log(item)
    res.status(200).send(item[0])
}

export const show_all = async (req, res)=>{
    const items = await MenuItem.find()
    res.status(200).send(items)
    
}

export const show_deals=async (req,res)=>{
    const items = await MenuItem.find({food_type: "meal_deal"})
    res.status(200).send(items)
}



