const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://dbsana:mindmerge123@cluster0.nkbnau2.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB Connected Successfully!");
  } finally {
    await client.close();
  }
}

run().catch(console.error);