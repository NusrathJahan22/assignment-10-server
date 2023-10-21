const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

// carbrand
// YF4KJgTkC7aTLrg9




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dinkriz.mongodb.net/?retryWrites=true&w=majority`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
  try {
    await client.connect()
    console.log('Database Connected!')
  } catch (error) {
    console.log(error.name, error.message)
  }
}
dbConnect()

const SliderData =client.db('carDB').collection('SliderData')
const AddCart =client.db('carDB').collection('AddCart')
const User =client.db('carDB').collection('user')



app.get('/', (req, res) => {
  res.send('car shop here')
})

app.get("/brand", async (req, res) => {
  const cursor = SliderData.find({});
  const result = await cursor.toArray();
  res.send(result)
});



app.get("/cardetails/:Brand", async (req, res) => {
  const Brand = req.params.Brand;
  const query = { Brand: Brand };
  const Data = SliderData.find(query);
const result =await Data.toArray()
  res.send(result);
});





app.get('/user', async(req,res) =>{
const cursor =userColloction.find();
const users= await cursor.toArray();
res.send(users);
})

// user api
app.post('/user',async(req,res) => {
  const user =req.body ;
  console.log(user);
  const result = await userColloction.insertOne(user);
  res.send(result);
});


app.listen(port, () => {
  console.log(`car shop port: ${port}`)
})