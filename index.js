const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middle wire

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.egywk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const taskCollection = client.db("taskManager").collection("tasks");
        console.log('DB Connected');


        //get requests

        //get unfinished tasks
        app.get('/task', async (req, res) => {
            res.send(result)
        });

        //get finished tasks
        app.get('/task/completed', async (req, res) => {
            res.send(result)
        });
        //post requests
        app.post('/task', async (req, res) => {
            const task = { ...req.body, isCompleted: false };
            console.log(req.body);
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        //edit completed by id
        app.post('/task/:id', async (req, res) => {
            const { id } = req?.params;
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: { isCompleted: true }
            }
            const result = await taskCollection.updateOne(filter, updateDoc);
            res.send(result)
        });

        //Delete requests
        app.delete('/task/:id', async (req, res) => {
            const { id } = req?.params;
            const filter = { _id: ObjectId(id) }
            const result = await taskCollection.deleteOne(filter);
            res.send(result);
        });


    } catch (error) {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    console.log("working");
    res.send("Server Running")
});

app.listen(port, async (req, res) => {
    console.log("Listening to ", port);
})