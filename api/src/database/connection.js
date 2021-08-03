import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = `mongodb+srv://omnistack:${process.env.DB_PASS}@hotel.dkvf4.mongodb.net/hotel?retryWrites=true&w=majority`;

export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) {
        console.error(`Conexão falhou: ${err}`);
    } else {
        console.log('Conexão realizada com banco de dados.');
        export const db = client.db('hotel');
    }
});