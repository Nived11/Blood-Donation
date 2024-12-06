const http=require("http")
const fs=require("fs")
const url=require("url")
const PORT=3001
const path=require("path")
const queryString=require("querystring")
const {MongoClient}=require("mongodb")
const client=new MongoClient("mongodb://127.0.0.1:27017/")

const app=http.createServer((req,res)=>{
    const db=client.db("projects");
    const collection=db.collection("donors");

    const {pathname}=url.parse(req.url);
    console.log(pathname);
    
    if(pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../Frontent/index.html"))
    }
    else if(pathname=="/css/index.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../Frontent/css/index.css"))
    }
    else if(pathname=="/js/index.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../Frontent/js/index.js"))
    }
    else if(pathname=="/assets/logo.png"){
        res.writeHead(200,{"Content-Type":"text/assets"});
        res.end(fs.readFileSync("../Frontent/assets/logo.png"))
    }
    else if(pathname=="/pages/reg.html"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../Frontent/pages/reg.html"))
    }
    else if(pathname=="/css/reg.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../Frontent/css/reg.css"))
    }
    else if(pathname=="/js/reg.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../Frontent/js/reg.js"))
    }
    
    if(pathname=="/submit"&&req.method=="POST"){
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        })
        req.on("end",async()=>{
            const formData=queryString.parse(body);
            console.log(formData);
            collection.insertOne(formData).then(()=>{
                console.log("successfully inserted..");
                
            }).catch((error)=>{
                console.log(error);
            })
            
        })
    }
})
client.connect().then((msg)=>{
    console.log("database connected");

    app.listen(PORT,()=>{
        console.log("server created");
        
    })
    
}).catch((error)=>{
    console.log(error);
    
})