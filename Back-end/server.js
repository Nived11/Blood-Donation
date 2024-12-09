const http=require("http")
const fs=require("fs")
const url=require("url")
const PORT=3001
const path=require("path")
const queryString=require("querystring")
const {MongoClient, ObjectId}=require("mongodb")
const { error } = require("console")
const client=new MongoClient("mongodb://127.0.0.1:27017/")

const app=http.createServer(async (req,res)=>{
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
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../Frontent/index.html"))
    }
    if(pathname=="/getdonors"&&req.method=="GET"){
        const data=await collection.find().toArray();
        console.log(data);
        const jsonData=JSON.stringify(data);
        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsonData)
    }
    if(pathname=="/delete"&&req.method=="DELETE"){
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
        })
        req.on("end",async()=>{
            let _id=new ObjectId(body);
            console.log(_id);
            await collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("Succesfully Deleted..")
            }).catch((error)=>{
                res.writeHead(400,{"Content-Type":"text/plain"});
                res.end("failed!")
            })
            
        })
    }
    if(pathname=="/update"&&req.method=="PUT"){
        console.log("hii");

        let body=""
        req.on("data",(chunks)=>{
            body+=chunks.toString();
        })
        req.on("end",async()=>{
            let data=JSON.parse(body)
            let _id=new ObjectId(data._id)
            let updateData={name:data.name,gender:data.gender,
                group:data.group,address:data.address,phone:data.phone}
            await collection.updateOne({_id},{$set:updateData}).then((msg)=>{
                res.writeHead(201,{"Content-Type":"text/json"});
                res.end("successfully updated..")
            }).catch(()=>{
                res.writeHead(400,{"Content-Type":"text/json"});
                res.end("failed!")
            })
        })
    }

})
client.connect().then((msg)=>{
    console.log("database connected!");

    app.listen(PORT,()=>{
        console.log("server created....");
        
    })
    
}).catch((error)=>{
    console.log(error);
    
})