import { MongoClient } from 'mongodb'

const uri = '';

MongoClient.connect(uri, (error, client) => {
    if (error) {
        console.error(error);
    }
    client.db(process.env.DB_NAME);
})

export default MongoClient;