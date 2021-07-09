import { MongoClient } from 'mongodb';

const uri = "";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) {
        console.error(`Conexão falhou: ${err}`);
    }
    const collection = client.db("test").collection("devices");
});

export default client;