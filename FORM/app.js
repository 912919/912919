const express = require('express');
const app = express();
app.use(express.json());

const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'cart';
const client = new MongoClient(url);
app.use(express.urlencoded({ extended: true }));

async function dbConnect() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection('users');
};


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/process_registration', async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirm_password = req.body.confirm_password;

    let data = await dbConnect();
    let result = await data.insertOne({
        username: username,
        email: email,
        password: password,
        confirm_password: confirm_password
    });
    console.log(username, email, password, confirm_password)
    res.send(result);
});

app.delete('/dt' ,async (req, resp) =>{
    let data = await dbConnect();
    let dt =  await data.deleteMany();
    resp.send(dt)
})


app.listen(5000);
