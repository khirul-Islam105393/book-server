const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();
const bodyParser = require("body-parser");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = 5000;

const app = express();

// geniusUser
//

// middleware
app.use(bodyParser.json({ limit: "1mb" }));


app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://geniusUser:svMhFqBSI5p9Kbtx@cluster0.m04bppn.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.twtll.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
    try {
      const bookCollection = client.db("book-store").collection("favoriteBook");

      //Making a get api
      app.get("/favoriteBook", async (req, res) => {
        const query = {};
        const result = await bookCollection.find(query).toArray();
        res.send(result);
      });


        //Making a posing request
      app.post('/favoriteBook', (req, res)=>{
        const newBook = req.body;
        console.log(newBook);
  
        bookCollection.insertOne(newBook).then((result) => {
          res.send(result.acknowledged);
        });

      })
  
    } finally {
    }
  }
  run().catch(console.log);
  
  app.get("/", async (req, res) => {
    res.send("Book-Store is running");
  });
  
  app.listen(port, () => console.log(`Book-store ${port}`));

