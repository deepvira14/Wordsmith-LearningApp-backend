const http = require("http");
const path = require("path");
const fs = require("fs");
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://deep:deep@cluster0.amyex8o.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);

const connectDb = async () => {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log(" connection happened here")
            
    
    } catch (e) {
        console.error(e);
    } 
    

}

connectDb();


const server = http.createServer (async (req, res) => {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    };

    if (req.url === '/') {
        
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
      
    }

    else if (req.url === '/api') {
        const cursor = client.db("bookdb").collection("bookcollection").find({});
        const results = await cursor.toArray();
        //console.log(results);
        
        const js= (JSON.stringify(results));
        console.log(js);
        res.writeHead(200, headers);
        res.end(js);
      

    }
    

    
});

const PORT = process.env.PORT || 6959;

server.listen(PORT, () => console.log(`Great our server is running on port ${PORT} `));