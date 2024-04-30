const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


// Middleware

app.use(cors());
app.use(express.json());


// rakib03201994
// RJIg7jYXwdKoxlJc




const uri = "mongodb+srv://rakib03201994:RJIg7jYXwdKoxlJc@cluster0.kzltcbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

const database = client.db("paintStore");
    const productCollection = database.collection("addProduct");
    
const subCategoryCollection = database.collection("subcategory");
    
  //  new category
    app.get("/subCategory", async (req, res) => {
      const cursor = subCategoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    app.post("/addProduct", async (req, res) => {
      console.log(req.body);
      const result = await productCollection.insertOne(req.body);
      console.log(result);
      res.send(result);
})

    // works 3
    
    app.get("/getProduct/:id", async (req, res) => {
      const product = req.params.id
      const query = { _id:new ObjectId(product)};
      const result = await productCollection.findOne(query);
      res.send(result);
    })

    app.get("/topBrand", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    
    
    app.get("/myArtAndCraft/:email", async (req, res) => {
      // console.log(req.params.email);
      const result = await productCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    })
    

    // update
       app.get("/singleProduct/:id", async (req, res) => {
      console.log(req.params.id);
         const result = await productCollection.findOne({
           _id: new ObjectId(req.params.id),
         });
console.log(result);
      res.send(result);
    })


    app.put('/updateProduct/:id', async (req, res) => {
  console.log(req.params.id);
      const id = req.params.id;
      const filter = { _id: new ObjectId (req.params.id) };
 
      const data = {
        $set: {
          productName: req.body.productName,
           category:req.body.category,
           price:req.body.price,
           time:req.body.time,
          image:req.body.image,
          customization:req.body.customization,
          rating:req.body.rating,
          stock:req.body.stock,
          description:req.body.description,
        },
      };
      const result = await addCollection.updateOne(filter, data, options);
      res.send(result);
      console.log(result);
      res.send(result)
    });



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);



app.get('/', (req, res) =>{
 res.send('SIMPLE PAINTING AND DRAWING RUNNING');
})

app.listen(port, () => {
  console.log(`SIMPLE PAINTING AND DRAWING RUNNING ON PORT, ${port}`);
})