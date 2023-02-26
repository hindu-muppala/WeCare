const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
//console.log(process.env)
const uri = process.env.url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 // The database to use
 module.exports=client
 