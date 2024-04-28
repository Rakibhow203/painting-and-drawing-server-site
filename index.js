const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    
    

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    app.post("/addProduct", async (req, res) => {
      console.log(req.body);
      const result = await productCollection.insertOne(req.body);
      console.log(result);
      res.send(result);
})


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