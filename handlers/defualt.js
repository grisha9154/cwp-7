const fs = require('fs');

exports.defualt = function (req,res) {
    const read = fs.createReadStream("E:\\Univer\\5 семестр\\ПСКП\\PSKP\\Лабы\\lab7\\cwp-7\\public\\index.html");
    read.on('data',(chunk)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(chunk);
    });
};