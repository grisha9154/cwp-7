const fs = require('fs');
exports.site = function (req, res) {
    const read = fs.createReadStream("E:\\Univer\\5 семестр\\ПСКП\\PSKP\\Лабы\\lab7\\cwp-7\\public\\site.css");
    read.on('data', (chunk) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(chunk);
    });
};