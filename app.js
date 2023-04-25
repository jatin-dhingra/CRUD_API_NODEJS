const express=require('express')
const mongoose=require('mongoose');
const Product=require('./models/product');
const app=express()
app.use(express.json());



app.post('/pro',async(req,res)=>{
    try{
        const product=await Product.create(req.body);
        res.status(200).json(product);
    }
    catch(e){
        console.log(e.message);
    }
})

app.get('/pro',async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    }
    catch(e)
    {
        res.status(500).json({message:e.message});
    }
})

app.get('/pro/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product);
    }
    catch(e)
    {
        res.status(500).json({message:e.message});
    }
})

app.put('/pro/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product)
        {
            return res.status(404).json({message:'cannot find product'})
        }
        const updatedpro=await Product.findById(id);
        res.status(200).json(updatedpro);
    }
    catch(e)
    {
        res.status(500).json({message:e.message});
    }
})

app.delete('/pro/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product)
        {
            return res.status(404).json({message:`cannot find product with id ${id}`})
        }
        res.status(200).json(product);
    }
    catch(e)
    {
        res.status(500).json({message:e.message});
    }
})

mongoose
.connect('mongodb+srv://admin:admin@crud.cswvoku.mongodb.net/Node-api?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to mongodb")
    app.listen(3000,()=>{
        console.log("node app is running");
    })
    
   
})
.catch((e)=>{
    console.log(e);
})