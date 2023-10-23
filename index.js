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

const SliderData = client.db('carDB').collection('SliderData')
const AddCart = client.db('carDB').collection('AddCart')
const mycart = client.db('carDB').collection('mycart')
// const User =client.db('carDB').collection('user')



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
  const result = await Data.toArray()
  res.send(result);
});

app.post('/cart', async (req, res) => {
  const carts = req.body
  const result = await AddCart.insertOne(carts)
  res.send(result)
})

app.get('/cart', async (req, res) => {
  const cursor = AddCart.find();
  const result = await cursor.toArray();
  res.send(result)
})


app.get('/cart/:id', async (req, res) => {
  const id = req.params.id
  const query = { _id: new ObjectId(id) }
  const result = await AddCart.findOne(query)
  res.send(result)
})




app.put('/cart/:id', async (req, res) => {
  const id = req.params.id
  const filter = { _id: new ObjectId(id) }
  // const options = { upsert: true }
  const updatedCart = req.body
  const Cart = {
    $set: {
      name: updatedCart.name,
      brandName: updatedCart.brandName,
      rating: updatedCart.rating,
      price: updatedCart.price,
      description: updatedCart.description,
      type: updatedCart.type,
      photo: updatedCart.photo
    }
  }
  const result = await brandcart.updateOne(filter, Cart);
  res.send(result);
})
// app.get('/user', async(req,res) =>{
// const cursor =userColloction.find();
// const users= await cursor.toArray();
// res.send(users);
// })

// user api
// app.post('/user',async(req,res) => {
//   const user =req.body ;
//   console.log(user);
//   const result = await userColloction.insertOne(user);
//   res.send(result);
// });
app.post('/addcard', async (req, res) => {
  const card = req.body
  const result = await mycart.insertOne(card)
  res.send(result)
})
app.get('/addcard', async (req, res) => {
  const cursor = mycart.find()
  const result = await cursor.toArray()
  res.send(result)
})
app.delete('/mycart/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await mycart.deleteOne(query);
  res.send(result);
})

app.listen(port, () => {
  console.log(`car shop port: ${port}`)
})