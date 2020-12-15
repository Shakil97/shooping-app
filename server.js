const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const shortid = require("shortid");
const { Router } = require("express");
const router = express.Router();

const app = express();
app.use(bodyparser.json());
//mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});

mongoose.connect("mongodb://127.0.0.1:27017/react-shopping-cart-db", {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const Product = mongoose.model("products",
new mongoose.Schema({
    _id: {type: String,  default: shortid.generate},
    title:String,
    description: String,
    image:String,
    price:Number,
    availableSizes:[String],

})
);

router.get("/api/products", async (req, res) =>{
    const products = await Product.find({});
    res.send(products);

});

router.post("/api/products", async (req, res)=>{
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
});
router.delete("/api/products/:id", async (req,res) =>{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProduct);
});


const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log("server at http://localhost:4000"));