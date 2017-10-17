const fs = require('fs');
exports.formjs = function (req, res) {
    const read = fs.createReadStream("E:\\Univer\\5 семестр\\ПСКП\\PSKP\\Лабы\\lab7\\cwp-7\\public\\form.js");
    read.on('data', (chunk) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/js');
        res.end(chunk);
    });
};