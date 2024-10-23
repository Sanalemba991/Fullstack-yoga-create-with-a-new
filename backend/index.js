require('dotenv').config(); // Ensure this is at the top

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://laitonjamsanalembameitei99:${process.env.DB_PASSWORD}@yoga-master.mc6jh.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    const database = client.db("yoga-master"); // Replace with your database name
    const userCollection = database.collection("users");
    const classesCollection = database.collection("classes"); // Replace with your collection name
    const cartCollection = database.collection("cart");
    const paymentCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolled");
    const appliedCollection = database.collection("applied");

    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.close();
  }
}

run();

app.get('/', (req, res) => {
  res.send('MONGo');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
