const http = require('http');
const fs = require('fs');
const readall = require('./handlers/readall.js');
const read = require('./handlers/read');
const acreate = require('./handlers/acreate.js');
const update = require('./handlers/update.js');
const adelete = require('./handlers/adelete.js');
const ccreate = require('./handlers/ccreate.js');
const cdelete = require('./handlers/cdelete.js');
const logHandl = require('./handlers/logHandle.js');
const defualt = require('./handlers/defualt.js');
const form = require('./public/form.js');
const showINdex = require('./public/index.js');
const formjs = require('./handlers/formjs.js');
const site = require('./handlers/site.js');

const hostname = '127.0.0.1';
const port =3000;

const handlers = {
    '/api/articles/readall':readall.readall,
    '/api/articles/read':read.read,
    '/api/articles/create':acreate.acreate,
    '/api/articles/update':update.update,
    '/api/articles/delete':adelete.adelete,
    '/api/comments/create':ccreate.ccreate,
    '/api/comments/delete':cdelete.cdelete,
    '/api/logs':logHandl.log,
    '/':defualt.defualt,
    '/index.html':defualt.defualt,
    '/form.html':form.form,
    '/app.js':showINdex.index,
    '/form.js':formjs.formjs,
    '/site.css':site.site
};

let article;
        const server = http.createServer((req, res) =>{
            fs.readFile("./articles.json", "utf-8", function (err, copy) {
            article = JSON.parse(copy);
            const handler = getHandler(req.url);
            if(handler===undefined)
            {
                const vat = {
                    code:"400",
                    message:"Request invalid"
                };
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(vat));
                return;
            }
            else{
            parseBodyJson(req, (err, payload) => {
               if(!chekData(req.url,payload))
               {
                   const vat = {
                       code:"400",
                       message:"Request invalid"
                   };
                   res.statusCode = 400;
                   res.setHeader('Content-Type', 'application/json');
                   res.end(JSON.stringify(vat));
                   return;
               }
                log(req.url,payload,()=>{});

                handler(req,res,article, payload, (err, result) => {
                    if (err) {
                        res.statusCode = err.code;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(err));
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result));
                });
            });
            }
        });
});

        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });

function getHandler(url) {
    if(handlers[url]==undefined){
        return undefined
    }else{
        return handlers[url];
    }
}


function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        if(body=="")
            body = "{}";
            let params = JSON.parse(body);
            cb(null, params);
    });
}

function log(url, payload, cb) {
    setTimeout(()=>{
        const read = fs.createReadStream("./log.log");
        let logStr = "Date: "+(new Date().toString())+'\n';
        logStr = logStr+"URL: "+url+'\n';
        logStr = logStr+"body: "+JSON.stringify(payload)+'\n\n\n\n';
        read.read();
        read.on('data',(chunk)=>{
            const write = fs.createWriteStream("./log.log");
            write.write(chunk+logStr);
            write.close();
            read.close();
        });
        const readJSON = fs.createReadStream("./log.json");

        readJSON.on('data',(chunk)=>{
            let logObj = JSON.parse(chunk);
            logObj[logObj.length] = {"Date":(new Date().toString()),"URL":url,"Body":payload};
            const write = fs.createWriteStream("./log.json");
            write.write(JSON.stringify(logObj));
        });
    });
    cb();
}

function chekData(url, payload) {
    let key=true;
    switch (url){
        case    '/api/articles/readall':
        {
            if(payload.sortField===undefined){
                payload.sortField = "date";
            }
            if(payload.sortOrder===undefined){
                payload.sortOrder="desc";
            }
        }break;
        case   '/api/comments/delete': {
            if(payload.id===undefined || payload.articleId===undefined){
                key = false;
            }
        } break;
        case '/api/comments/create':
        {
            if(payload.id!==undefined||payload.articleId===undefined||payload.text===undefined||payload.date===undefined|| payload.author===undefined){
                key=false;
            }
        }break;
        case '/api/articles/update':
        {
            if(payload.id === undefined || payload.id<0 || (payload.title===undefined||payload.text===undefined||payload.date===undefined||payload.author===undefined||payload.comments===undefined)){
                key = false;
            }
        }break;
        case '/api/articles/read':
        case '/api/articles/delete':
        {
            if(payload.id===undefined || payload.id<0){
                key =false;
            }
        }break;
        case '/api/articles/create':{
            if(payload.id!==undefined || (payload.title===undefined||payload.text===undefined||payload.date===undefined||payload.author===undefined||payload.comments===undefined)){
                key = false;
            }
        }break;
    }
    return key;
}
