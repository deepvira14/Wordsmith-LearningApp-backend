const {MongoClient} = require('mongodb');


async function main(){

    const uri = "mongodb+srv://deep:deep@cluster0.amyex8o.mongodb.net/?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log(" connection happened here")

        await findsomedata(client);
 
        
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log( "We closed the connection ")
    }


}

main().catch(console.error);

async function findsomedata(client ){
    const cursor = client.db("bookdb").collection("bookcollection").find({});
    const results = await cursor.toArray();
    //console.log(results);
    const js= (JSON.stringify(results));
    console.log(js);

};