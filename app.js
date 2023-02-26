const express=require('express')
const path=require('path');
const ejsMAte=require('ejs-mate')
var bodyParser = require("body-parser");
const app= express();
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));
const client=require('./db');
app.engine('ejs',ejsMAte)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.get('/',(req, res)=>{
    res.render('home')
})
app.get('/share',(req,res)=>{
    res.render('share')
})
app.post('/share',async (req,res)=>{
    console.log(req.body)
    async function run() {
        try {
             await client.connect();
             console.log("Connected correctly to server");
             const db = client.db("WeCare");
             // Use the collection "people"
             const col = db.collection("petDetails");
             // Construct a document                                                                                                                                                              
             let petDocument = req.body
             // Insert a single document, wait for promise so we can read it back
             const p = await col.insertOne(petDocument);
             // Find one document
            } catch (err) {
             console.log(err.stack);
         }
     
         finally {
            await client.close();
        }
    }
    run().catch(console.dir);
    res.redirect("/")
    //mongodb connection
    //crud operation
})
app.get('/help',async (req,res)=>{
    async function run() {
        try {
             await client.connect();
             console.log("Connected correctly to server");
             const db = client.db("WeCare");
             // Use the collection "people"
             const col = db.collection("petDetails");
             // Construct a document                                                                                                                                                              
           
             // Insert a single document, wait for promise so we can read it back
             
             // Find one document
             const myDoc = await col.find({}).toArray();
             // Print to the console
             console.log(myDoc);
             res.render('help',{myDoc})
            } catch (err) {
             console.log(err.stack);
         }
     
         finally {
            await client.close();
        }
    }
    run().catch(console.dir);
    //retrive data from database
    //then I should share to help
   // res.redirect("/")
})
app.listen(3000,()=>{
    console.log("Serving on port 3000")
})
